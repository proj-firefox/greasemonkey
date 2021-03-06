const EXPORTED_SYMBOLS = ['SyntaxError', 'parseMetaLine'];

/*
 * Generated by PEG.js 0.8.0.
 *
 * http://pegjs.majda.cz/
 */

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function SyntaxError(message, expected, found, offset, line, column) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.offset   = offset;
  this.line     = line;
  this.column   = column;

  this.name     = "SyntaxError";
}

peg$subclass(SyntaxError, Error);

function parseMetaLine(input) {
  var options = arguments.length > 1 ? arguments[1] : {},

      peg$FAILED = {},

      peg$startRuleFunctions = { line: peg$parseline },
      peg$startRuleFunction  = peg$parseline,

      peg$c0 = peg$FAILED,
      peg$c1 = "// @",
      peg$c2 = { type: "literal", value: "// @", description: "\"// @\"" },
      peg$c3 = null,
      peg$c4 = "\n",
      peg$c5 = { type: "literal", value: "\n", description: "\"\\n\"" },
      peg$c6 = function(meta) { return meta; },
      peg$c7 = [],
      peg$c8 = /^[ \t\n]/,
      peg$c9 = { type: "class", value: "[ \\t\\n]", description: "[ \\t\\n]" },
      peg$c10 = /^[^ \t\n]/,
      peg$c11 = { type: "class", value: "[^ \\t\\n]", description: "[^ \\t\\n]" },
      peg$c12 = /^[^\n]/,
      peg$c13 = { type: "class", value: "[^\\n]", description: "[^\\n]" },
      peg$c14 = "noframes",
      peg$c15 = { type: "literal", value: "noframes", description: "\"noframes\"" },
      peg$c16 = function(keyword) { return {keyword:keyword}; },
      peg$c17 = "downloadURL",
      peg$c18 = { type: "literal", value: "downloadURL", description: "\"downloadURL\"" },
      peg$c19 = "exclude",
      peg$c20 = { type: "literal", value: "exclude", description: "\"exclude\"" },
      peg$c21 = "grant",
      peg$c22 = { type: "literal", value: "grant", description: "\"grant\"" },
      peg$c23 = "icon",
      peg$c24 = { type: "literal", value: "icon", description: "\"icon\"" },
      peg$c25 = "include",
      peg$c26 = { type: "literal", value: "include", description: "\"include\"" },
      peg$c27 = "installURL",
      peg$c28 = { type: "literal", value: "installURL", description: "\"installURL\"" },
      peg$c29 = "match",
      peg$c30 = { type: "literal", value: "match", description: "\"match\"" },
      peg$c31 = "namespace",
      peg$c32 = { type: "literal", value: "namespace", description: "\"namespace\"" },
      peg$c33 = "require",
      peg$c34 = { type: "literal", value: "require", description: "\"require\"" },
      peg$c35 = "run-at",
      peg$c36 = { type: "literal", value: "run-at", description: "\"run-at\"" },
      peg$c37 = "updateURL",
      peg$c38 = { type: "literal", value: "updateURL", description: "\"updateURL\"" },
      peg$c39 = "version",
      peg$c40 = { type: "literal", value: "version", description: "\"version\"" },
      peg$c41 = function(keyword, value) { return {keyword:keyword, value:value}; },
      peg$c42 = "resource",
      peg$c43 = { type: "literal", value: "resource", description: "\"resource\"" },
      peg$c44 = function(keyword, value1, value2) { return {keyword:keyword, value1:value1, value2:value2}; },
      peg$c45 = "description",
      peg$c46 = { type: "literal", value: "description", description: "\"description\"" },
      peg$c47 = "name",
      peg$c48 = { type: "literal", value: "name", description: "\"name\"" },
      peg$c49 = ":",
      peg$c50 = { type: "literal", value: ":", description: "\":\"" },
      peg$c51 = /^[a-zA-Z\-]/,
      peg$c52 = { type: "class", value: "[a-zA-Z\\-]", description: "[a-zA-Z\\-]" },
      peg$c53 = function(localeValue) { return localeValue },
      peg$c54 = function(keyword, locale, value) { return {keyword:keyword, locale:locale, value:value}; },

      peg$currPos          = 0,
      peg$reportedPos      = 0,
      peg$cachedPos        = 0,
      peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$reportedPos, peg$currPos);
  }

  function offset() {
    return peg$reportedPos;
  }

  function line() {
    return peg$computePosDetails(peg$reportedPos).line;
  }

  function column() {
    return peg$computePosDetails(peg$reportedPos).column;
  }

  function expected(description) {
    throw peg$buildException(
      null,
      [{ type: "other", description: description }],
      peg$reportedPos
    );
  }

  function error(message) {
    throw peg$buildException(message, null, peg$reportedPos);
  }

  function peg$computePosDetails(pos) {
    function advance(details, startPos, endPos) {
      var p, ch;

      for (p = startPos; p < endPos; p++) {
        ch = input.charAt(p);
        if (ch === "\n") {
          if (!details.seenCR) { details.line++; }
          details.column = 1;
          details.seenCR = false;
        } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
          details.line++;
          details.column = 1;
          details.seenCR = true;
        } else {
          details.column++;
          details.seenCR = false;
        }
      }
    }

    if (peg$cachedPos !== pos) {
      if (peg$cachedPos > pos) {
        peg$cachedPos = 0;
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
      }
      advance(peg$cachedPosDetails, peg$cachedPos, pos);
      peg$cachedPos = pos;
    }

    return peg$cachedPosDetails;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildException(message, expected, pos) {
    function cleanupExpected(expected) {
      var i = 1;

      expected.sort(function(a, b) {
        if (a.description < b.description) {
          return -1;
        } else if (a.description > b.description) {
          return 1;
        } else {
          return 0;
        }
      });

      while (i < expected.length) {
        if (expected[i - 1] === expected[i]) {
          expected.splice(i, 1);
        } else {
          i++;
        }
      }
    }

    function buildMessage(expected, found) {
      function stringEscape(s) {
        function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

        return s
          .replace(/\\/g,   '\\\\')
          .replace(/"/g,    '\\"')
          .replace(/\x08/g, '\\b')
          .replace(/\t/g,   '\\t')
          .replace(/\n/g,   '\\n')
          .replace(/\f/g,   '\\f')
          .replace(/\r/g,   '\\r')
          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
          .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
          .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
          .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
      }

      var expectedDescs = new Array(expected.length),
          expectedDesc, foundDesc, i;

      for (i = 0; i < expected.length; i++) {
        expectedDescs[i] = expected[i].description;
      }

      expectedDesc = expected.length > 1
        ? expectedDescs.slice(0, -1).join(", ")
            + " or "
            + expectedDescs[expected.length - 1]
        : expectedDescs[0];

      foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

      return "Expected " + expectedDesc + " but " + foundDesc + " found.";
    }

    var posDetails = peg$computePosDetails(pos),
        found      = pos < input.length ? input.charAt(pos) : null;

    if (expected !== null) {
      cleanupExpected(expected);
    }

    return new SyntaxError(
      message !== null ? message : buildMessage(expected, found),
      expected,
      found,
      pos,
      posDetails.line,
      posDetails.column
    );
  }

  function peg$parseline() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c1) {
      s1 = peg$c1;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsekeyword0();
      if (s2 === peg$FAILED) {
        s2 = peg$parsekeyword1();
        if (s2 === peg$FAILED) {
          s2 = peg$parsekeyword2();
          if (s2 === peg$FAILED) {
            s2 = peg$parsekeywordLocale();
          }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s3 = peg$c4;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c5); }
        }
        if (s3 === peg$FAILED) {
          s3 = peg$c3;
        }
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c6(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$c0;
    }

    return s0;
  }

  function peg$parsewhitespace() {
    var s0, s1;

    s0 = [];
    if (peg$c8.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c9); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c8.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c9); }
        }
      }
    } else {
      s0 = peg$c0;
    }

    return s0;
  }

  function peg$parsenon_whitespace() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c10.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c11); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c10.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c11); }
        }
      }
    } else {
      s1 = peg$c0;
    }
    if (s1 !== peg$FAILED) {
      s1 = input.substring(s0, peg$currPos);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenon_newline() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c12.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c12.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c13); }
        }
      }
    } else {
      s1 = peg$c0;
    }
    if (s1 !== peg$FAILED) {
      s1 = input.substring(s0, peg$currPos);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsekeyword0() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }
    if (s1 !== peg$FAILED) {
      peg$reportedPos = s0;
      s1 = peg$c16(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsekeyword1() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 11) === peg$c17) {
      s1 = peg$c17;
      peg$currPos += 11;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c18); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 7) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c21) {
          s1 = peg$c21;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c22); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c23) {
            s1 = peg$c23;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c25) {
              s1 = peg$c25;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c26); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 10) === peg$c27) {
                s1 = peg$c27;
                peg$currPos += 10;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c28); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c29) {
                  s1 = peg$c29;
                  peg$currPos += 5;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c30); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 9) === peg$c31) {
                    s1 = peg$c31;
                    peg$currPos += 9;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c32); }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c33) {
                      s1 = peg$c33;
                      peg$currPos += 7;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c34); }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 6) === peg$c35) {
                        s1 = peg$c35;
                        peg$currPos += 6;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c36); }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 9) === peg$c37) {
                          s1 = peg$c37;
                          peg$currPos += 9;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c38); }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.substr(peg$currPos, 7) === peg$c39) {
                            s1 = peg$c39;
                            peg$currPos += 7;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c40); }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenon_newline();
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c41(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$c0;
    }

    return s0;
  }

  function peg$parsekeyword2() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8) === peg$c42) {
      s1 = peg$c42;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenon_whitespace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsewhitespace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenon_newline();
            if (s5 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c44(s1, s3, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$c0;
    }

    return s0;
  }

  function peg$parsekeywordLocale() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 11) === peg$c45) {
      s1 = peg$c45;
      peg$currPos += 11;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c46); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c47) {
        s1 = peg$c47;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c48); }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c49;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c50); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$currPos;
        s5 = [];
        if (peg$c51.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c52); }
        }
        if (s6 !== peg$FAILED) {
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            if (peg$c51.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c52); }
            }
          }
        } else {
          s5 = peg$c0;
        }
        if (s5 !== peg$FAILED) {
          s5 = input.substring(s4, peg$currPos);
        }
        s4 = s5;
        if (s4 !== peg$FAILED) {
          peg$reportedPos = s2;
          s3 = peg$c53(s4);
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 === peg$FAILED) {
        s2 = peg$c3;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhitespace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenon_newline();
          if (s4 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c54(s1, s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$c0;
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail({ type: "end", description: "end of input" });
    }

    throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
  }
}
