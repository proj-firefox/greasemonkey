// The frame script for Electrolysis (e10s) compatible injection.
//   See: https://developer.mozilla.org/en-US/Firefox/Multiprocess_Firefox

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import('resource://gre/modules/Services.jsm');
Cu.import('resource://gre/modules/XPCOMUtils.jsm');

Cu.import('resource://greasemonkey/GM_setClipboard.js');
Cu.import('resource://greasemonkey/installPolicy.js');
Cu.import('resource://greasemonkey/ipcscript.js');
Cu.import('resource://greasemonkey/miscapis.js');
Cu.import('resource://greasemonkey/sandbox.js');
Cu.import('resource://greasemonkey/scriptProtocol.js');
Cu.import('resource://greasemonkey/util.js');

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

var gScope = this;
var gScriptRunners = {};
var gStripUserPassRegexp = new RegExp('(://)([^:/]+)(:[^@/]+)?@');

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function isTempScript(uri) {
  // RAGE FACE can't do files in frames!!!
//  if (uri.scheme != "file") return false;
//  var file = gFileProtocolHandler.getFileFromURLSpec(uri.spec);
//  return gTmpDir.contains(file, true);
  return false;
}

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function ScriptRunner(aWindow, aUrl) {
  this.menuCommands = [];
  this.window = aWindow;
  this.windowId = GM_util.windowId(this.window);
  this.url = aUrl;
}

ScriptRunner.prototype.injectScripts = function(aScripts) {
  try {
    this.window.QueryInterface(Ci.nsIDOMChromeWindow);
    // Never ever inject scripts into a chrome context window.
    return;
  } catch(e) {
    // Ignore, it's good if we can't QI to a chrome window.
  }

  var winIsTop = this.windowIsTop(this.window);

  for (var i = 0, script = null; script = aScripts[i]; i++) {
    if (script.noframes && !winIsTop) continue;
    var sandbox = createSandbox(script, this, gScope);
    runScriptInSandbox(script, sandbox);
  }
};

ScriptRunner.prototype.openInTab = function(aUrl, aInBackground) {
  var response = sendSyncMessage('greasemonkey:open-in-tab', {
    inBackground: aInBackground,
    url: aUrl
  });
  return response ? response[0] : null;
};


ScriptRunner.prototype.registeredMenuCommand = function(aCommand) {
  var length = this.menuCommands.push(aCommand);

  sendAsyncMessage('greasemonkey:menu-command-registered', {
    accessKey: aCommand.accessKey,
    frozen: aCommand.frozen,
    index: length - 1,
    name: aCommand.name,
    windowId: aCommand.contentWindowId
  });
};

ScriptRunner.prototype.windowIsTop = function(aContentWin) {
  try {
    aContentWin.QueryInterface(Ci.nsIDOMWindow);
    if (aContentWin.frameElement) return false;
  } catch (e) {
    var url = 'unknown';
    try {
      url = aContentWin.location.href;
    } catch (e) { }
    // Ignore non-DOM-windows.
    dump('Could not QI this.window to nsIDOMWindow at\n' + url + ' ?!\n');
  }
  return true;
};

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function ContentObserver() {
}


ContentObserver.prototype.QueryInterface = XPCOMUtils.generateQI([
    Ci.nsIObserver]);


ContentObserver.prototype.contentLoad = function(aEvent) {
  var contentWin = aEvent.target.defaultView;

  // Now that we've seen any first load event, stop listening for any more.
  contentWin.removeEventListener('DOMContentLoaded', gContentLoad, true);
  contentWin.removeEventListener('load', gContentLoad, true);

  this.runScripts('document-end', contentWin);
};


ContentObserver.prototype.createScriptFromObject = function(aObject) {
  var script = Object.create(IPCScript.prototype);
  // TODO: better way for this? Object.create needs property descriptors.
  for (var key in aObject) {
    script[key] = aObject[key];
  }
  return script;
};


ContentObserver.prototype.loadFailedScript = function(aMessage) {
  ignoreNextScript();
  docShell.loadURI(
      GM_util.uriFromUrl(aMessage.data.url),
      /* loadInfo */ null, /* aLoadFlags */ null, /* firstParty */ true);
};


ContentObserver.prototype.observe = function(aSubject, aTopic, aData) {
  if (!GM_util.getEnabled()) return;

  switch (aTopic) {
    case 'document-element-inserted':
      if (!GM_util.getEnabled()) return;

      var doc = aSubject;
      var win = doc && doc.defaultView;
      if (!doc || !win) return;
      if (win.top !== content) return;

      var url = doc.documentURI;
      if (!GM_util.isGreasemonkeyable(url)) return;

      // Listen for whichever kind of load event arrives first.
      win.addEventListener('DOMContentLoaded', gContentLoad, true);
      win.addEventListener('load', gContentLoad, true);

      this.runScripts('document-start', win);
      break;
    default:
      dump('Content frame observed unknown topic: ' + aTopic + '\n');
  }
};


ContentObserver.prototype.pagehide = function(aEvent) {
  var contentWin = aEvent.target.defaultView;
  var windowId = GM_util.windowId(contentWin);

  if (!windowId || !gScriptRunners[windowId]) return;

  // Small optimization: only send a notification if there's a menu command
  // for this window.
  if (!gScriptRunners[windowId].menuCommands.length) return;

  if (aEvent.persisted) {
    sendAsyncMessage('greasemonkey:toggle-menu-commands', {
      frozen: true,
      windowId: windowId
    });
  } else {
    sendAsyncMessage('greasemonkey:clear-menu-commands', {
      windowId: windowId
    });
  }
};


ContentObserver.prototype.pageshow = function(aEvent) {
  var contentWin = aEvent.target.defaultView;
  var windowId = GM_util.windowId(contentWin);

  if (!windowId || !gScriptRunners[windowId]) return;

  if (!gScriptRunners[windowId].menuCommands.length) return;

  sendAsyncMessage('greasemonkey:toggle-menu-commands', {
    frozen: false,
    windowId: windowId
  });
};


ContentObserver.prototype.runDelayedScript = function(aMessage) {
  var windowId = aMessage.data.windowId;
  var scriptRunner = gScriptRunners[windowId];
  if (!scriptRunner) return;

  var script = this.createScriptFromObject(aMessage.data.script);
  scriptRunner.injectScripts([script]);
};


ContentObserver.prototype.runMenuCommand = function(aMessage) {
  var windowId = aMessage.data.windowId;
  if (!gScriptRunners[windowId]) return;

  var index = aMessage.data.index;
  var command = gScriptRunners[windowId].menuCommands[index];
  if (!command || !command.commandFunc) return;

  // Ensure |this| is set to the sandbox object inside the command function.
  command.commandFunc.call(null);
};


ContentObserver.prototype.runScripts = function(aRunWhen, aContentWin) {
  // See #1970
  // When content does (e.g.) history.replacestate() in an inline script,
  // the location.href changes between document-start and document-end time.
  // But the content can call replacestate() much later, too.  The only way to
  // be consistent is to ignore it.  Luckily, the  document.documentURI does
  // _not_ change, so always use it when deciding whether to run scripts.
  var url = aContentWin.document.documentURI;
  // But ( #1631 ) ignore user/pass in the URL.
  url = url.replace(gStripUserPassRegexp, '$1');

  if (!GM_util.isGreasemonkeyable(url)) return;

  var scriptRunner = gScriptRunners[windowId];
  var windowId = GM_util.windowId(aContentWin);
  if (!scriptRunner) {
    scriptRunner = new ScriptRunner(aContentWin, url);
    gScriptRunners[windowId] = scriptRunner;
  } else if (scriptRunner.window !== aContentWin) {
    // Sanity check, shouldn't be necessary.
    // TODO: remove
    dump('Script runner window changed for ' + url + ' at ' + aRunWhen + '\n');
    scriptRunner.window = aContentWin;
  }

  var response = sendSyncMessage(
    'greasemonkey:scripts-for-url', {
      'url': url,
      'when': aRunWhen,
      'windowId': windowId
    });
  if (!response || !response[0]) return;

  var scripts = response[0].map(this.createScriptFromObject);
  scriptRunner.injectScripts(scripts);
};

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

var contentObserver = new ContentObserver();
var gContentLoad = contentObserver.contentLoad.bind(contentObserver);

addEventListener('pagehide', contentObserver.pagehide.bind(contentObserver));
addEventListener('pageshow', contentObserver.pageshow.bind(contentObserver));

addMessageListener('greasemonkey:inject-script',
    contentObserver.runDelayedScript.bind(contentObserver));
addMessageListener('greasemonkey:load-failed-script',
  contentObserver.loadFailedScript.bind(contentObserver));
addMessageListener('greasemonkey:menu-command-clicked',
    contentObserver.runMenuCommand.bind(contentObserver));

Services.obs.addObserver(contentObserver, 'document-element-inserted', false);
addEventListener('unload', function() {
  Services.obs.removeObserver(contentObserver, 'document-element-inserted');
}, false);

(function() {
  var tmpDir = sendSyncMessage('greasemonkey:temp-dir-path');
  initInstallPolicy(tmpDir[0]);
  initScriptProtocol();
})();
