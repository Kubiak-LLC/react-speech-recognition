"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _reactHooks = require("@testing-library/react-hooks");

var _corti = require("../tests/vendor/corti");

var _SpeechRecognition = _interopRequireWildcard(require("./SpeechRecognition"));

var _isAndroid = _interopRequireDefault(require("./isAndroid"));

var _RecognitionManager = _interopRequireDefault(require("./RecognitionManager"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('./isAndroid');
jest.mock('./utils', function () {
  return _objectSpread(_objectSpread({}, jest.requireActual('./utils')), {}, {
    browserSupportsPolyfills: jest.fn()
  });
});

var mockRecognitionManager = function mockRecognitionManager() {
  var recognitionManager = new _RecognitionManager["default"](window.SpeechRecognition);

  _SpeechRecognition["default"].getRecognitionManager = function () {
    return recognitionManager;
  };

  return recognitionManager;
};

describe('SpeechRecognition', function () {
  beforeEach(function () {
    _isAndroid["default"].mockClear();

    _utils.browserSupportsPolyfills.mockImplementation(function () {
      return true;
    });

    _SpeechRecognition["default"].applyPolyfill(_corti.CortiSpeechRecognition);
  });
  test('sets applyPolyfill correctly', function () {
    var MockSpeechRecognition = function MockSpeechRecognition() {
      _classCallCheck(this, MockSpeechRecognition);
    };

    expect(_SpeechRecognition["default"].getRecognition() instanceof _corti.CortiSpeechRecognition).toEqual(true);

    _SpeechRecognition["default"].applyPolyfill(MockSpeechRecognition);

    expect(_SpeechRecognition["default"].browserSupportsSpeechRecognition()).toEqual(true);
    expect(_SpeechRecognition["default"].getRecognition() instanceof MockSpeechRecognition).toEqual(true);
  });
  test('does not collect transcripts from previous speech recognition after polyfill applied', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var cortiSpeechRecognition, _renderHook, result, speech, _result$current, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cortiSpeechRecognition = _SpeechRecognition["default"].getRecognition();
            _renderHook = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook.result;
            speech = 'This is a test';
            _context2.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].applyPolyfill( /*#__PURE__*/function () {
                function _class() {
                  _classCallCheck(this, _class);
                }

                return _class;
              }());
            });
            (0, _reactHooks.act)(function () {
              cortiSpeechRecognition.say(speech);
            });
            _result$current = result.current, transcript = _result$current.transcript, interimTranscript = _result$current.interimTranscript, finalTranscript = _result$current.finalTranscript;
            expect(transcript).toEqual('');
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual('');

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('stops listening after polyfill applied', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _renderHook2, result, listening;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _renderHook2 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook2.result;
            _context4.next = 3;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));

          case 3:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].applyPolyfill( /*#__PURE__*/function () {
                function _class2() {
                  _classCallCheck(this, _class2);
                }

                return _class2;
              }());
            });
            listening = result.current.listening;
            expect(listening).toEqual(false);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('sets browserSupportsContinuousListening to false when using polyfill on unsupported browser', function () {
    _utils.browserSupportsPolyfills.mockImplementation(function () {
      return false;
    });

    var MockSpeechRecognition = function MockSpeechRecognition() {
      _classCallCheck(this, MockSpeechRecognition);
    };

    _SpeechRecognition["default"].applyPolyfill(MockSpeechRecognition);

    var _renderHook3 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook3.result;

    var browserSupportsContinuousListening = result.current.browserSupportsContinuousListening;
    expect(browserSupportsContinuousListening).toEqual(false);
    expect(_SpeechRecognition["default"].browserSupportsContinuousListening()).toEqual(false);
  });
  test('sets browserSupportsSpeechRecognition to false when using polyfill on unsupported browser', function () {
    _utils.browserSupportsPolyfills.mockImplementation(function () {
      return false;
    });

    var MockSpeechRecognition = function MockSpeechRecognition() {
      _classCallCheck(this, MockSpeechRecognition);
    };

    _SpeechRecognition["default"].applyPolyfill(MockSpeechRecognition);

    var _renderHook4 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook4.result;

    var browserSupportsSpeechRecognition = result.current.browserSupportsSpeechRecognition;
    expect(browserSupportsSpeechRecognition).toEqual(false);
    expect(_SpeechRecognition["default"].browserSupportsSpeechRecognition()).toEqual(false);
  });
  test('sets browserSupportsContinuousListening to false when given falsey SpeechRecognition', function () {
    _SpeechRecognition["default"].applyPolyfill();

    var _renderHook5 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook5.result;

    var browserSupportsContinuousListening = result.current.browserSupportsContinuousListening;
    expect(browserSupportsContinuousListening).toEqual(false);
    expect(_SpeechRecognition["default"].browserSupportsContinuousListening()).toEqual(false);
  });
  test('sets browserSupportsSpeechRecognition to false when given falsey SpeechRecognition', function () {
    _SpeechRecognition["default"].applyPolyfill();

    var _renderHook6 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook6.result;

    var browserSupportsSpeechRecognition = result.current.browserSupportsSpeechRecognition;
    expect(browserSupportsSpeechRecognition).toEqual(false);
    expect(_SpeechRecognition["default"].browserSupportsSpeechRecognition()).toEqual(false);
  });
  test('sets default transcripts correctly', function () {
    var _renderHook7 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook7.result;

    var _result$current2 = result.current,
        transcript = _result$current2.transcript,
        interimTranscript = _result$current2.interimTranscript,
        finalTranscript = _result$current2.finalTranscript;
    expect(transcript).toEqual('');
    expect(interimTranscript).toEqual('');
    expect(finalTranscript).toEqual('');
  });
  test('updates transcripts correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var _renderHook8, result, speech, _result$current3, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            mockRecognitionManager();
            _renderHook8 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook8.result;
            speech = 'This is a test';
            _context6.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            _result$current3 = result.current, transcript = _result$current3.transcript, interimTranscript = _result$current3.interimTranscript, finalTranscript = _result$current3.finalTranscript;
            expect(transcript).toEqual(speech);
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual(speech);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  test('resets transcripts correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _renderHook9, result, speech, _result$current4, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            mockRecognitionManager();
            _renderHook9 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook9.result;
            speech = 'This is a test';
            _context8.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            (0, _reactHooks.act)(function () {
              result.current.resetTranscript();
            });
            _result$current4 = result.current, transcript = _result$current4.transcript, interimTranscript = _result$current4.interimTranscript, finalTranscript = _result$current4.finalTranscript;
            expect(transcript).toEqual('');
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual('');

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  test('is listening when Speech Recognition is listening', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var _renderHook10, result;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            mockRecognitionManager();
            _renderHook10 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook10.result;
            _context10.next = 4;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9);
            })));

          case 4:
            expect(result.current.listening).toEqual(true);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  test('is not listening when Speech Recognition is not listening', function () {
    mockRecognitionManager();

    var _renderHook11 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook11.result;

    expect(result.current.listening).toEqual(false);
  });
  test('exposes Speech Recognition object', function () {
    var recognitionManager = mockRecognitionManager();
    expect(_SpeechRecognition["default"].getRecognition()).toEqual(recognitionManager.recognition);
  });
  test('ignores speech when listening is stopped', function () {
    mockRecognitionManager();

    var _renderHook12 = (0, _reactHooks.renderHook)(function () {
      return (0, _SpeechRecognition.useSpeechRecognition)();
    }),
        result = _renderHook12.result;

    var speech = 'This is a test';
    (0, _reactHooks.act)(function () {
      _SpeechRecognition["default"].getRecognition().say(speech);
    });
    var _result$current5 = result.current,
        transcript = _result$current5.transcript,
        interimTranscript = _result$current5.interimTranscript,
        finalTranscript = _result$current5.finalTranscript;
    expect(transcript).toEqual('');
    expect(interimTranscript).toEqual('');
    expect(finalTranscript).toEqual('');
  });
  test('ignores speech when listening is aborted', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var _renderHook13, result, speech, _result$current6, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            mockRecognitionManager();
            _renderHook13 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook13.result;
            speech = 'This is a test';
            _context12.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].abortListening();
            });
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            _result$current6 = result.current, transcript = _result$current6.transcript, interimTranscript = _result$current6.interimTranscript, finalTranscript = _result$current6.finalTranscript;
            expect(transcript).toEqual('');
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual('');

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  test('transcibes when listening is started', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var _renderHook14, result, speech, _result$current7, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            mockRecognitionManager();
            _renderHook14 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook14.result;
            speech = 'This is a test';
            _context14.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            _result$current7 = result.current, transcript = _result$current7.transcript, interimTranscript = _result$current7.interimTranscript, finalTranscript = _result$current7.finalTranscript;
            expect(transcript).toEqual(speech);
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual(speech);

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  test('does not transcibe when listening is started but not transcribing', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
    var _renderHook15, result, speech, _result$current8, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            mockRecognitionManager();
            _renderHook15 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                transcribing: false
              });
            }), result = _renderHook15.result;
            speech = 'This is a test';
            _context16.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
              return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context15.stop();
                  }
                }
              }, _callee15);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            _result$current8 = result.current, transcript = _result$current8.transcript, interimTranscript = _result$current8.interimTranscript, finalTranscript = _result$current8.finalTranscript;
            expect(transcript).toEqual('');
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual('');

          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
  test('listens discontinuously by default', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    var speech;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            mockRecognitionManager();
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            });
            speech = 'This is a test';
            _context18.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
              return regeneratorRuntime.wrap(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context17.stop();
                  }
                }
              }, _callee17);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });

          case 7:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  test('can turn continuous listening on', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
    var _renderHook16, result, speech, expectedTranscript, _result$current9, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            mockRecognitionManager();
            _renderHook16 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook16.result;
            speech = 'This is a test';
            expectedTranscript = [speech, speech].join(' ');
            _context20.next = 6;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
              return regeneratorRuntime.wrap(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      _context19.next = 2;
                      return _SpeechRecognition["default"].startListening({
                        continuous: true
                      });

                    case 2:
                    case "end":
                      return _context19.stop();
                  }
                }
              }, _callee19);
            })));

          case 6:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            _result$current9 = result.current, transcript = _result$current9.transcript, interimTranscript = _result$current9.interimTranscript, finalTranscript = _result$current9.finalTranscript;
            expect(transcript).toEqual(expectedTranscript);
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual(expectedTranscript);

          case 12:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  test('can reset transcript from command callback', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
    var commands, _renderHook17, result, _result$current10, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            mockRecognitionManager();
            commands = [{
              command: 'clear',
              callback: function callback(_ref22) {
                var resetTranscript = _ref22.resetTranscript;
                return resetTranscript();
              }
            }];
            _renderHook17 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook17.result;
            _context22.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
              return regeneratorRuntime.wrap(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      _context21.next = 2;
                      return _SpeechRecognition["default"].startListening({
                        continuous: true
                      });

                    case 2:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, _callee21);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say('test');
            });
            expect(result.current.transcript).toBe('test');
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say('clear');
            });
            _result$current10 = result.current, transcript = _result$current10.transcript, interimTranscript = _result$current10.interimTranscript, finalTranscript = _result$current10.finalTranscript;
            expect(transcript).toEqual('');
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual('');

          case 12:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
  test('can set language', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            mockRecognitionManager();
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            });
            _context24.next = 4;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
              return regeneratorRuntime.wrap(function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.next = 2;
                      return _SpeechRecognition["default"].startListening({
                        language: 'zh-CN'
                      });

                    case 2:
                    case "end":
                      return _context23.stop();
                  }
                }
              }, _callee23);
            })));

          case 4:
            expect(_SpeechRecognition["default"].getRecognition().lang).toEqual('zh-CN');

          case 5:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  })));
  test('does not collect transcript after listening is stopped', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
    var _renderHook18, result, speech, _result$current11, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            mockRecognitionManager();
            _renderHook18 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook18.result;
            speech = 'This is a test';
            _context26.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
              return regeneratorRuntime.wrap(function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _context25.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context25.stop();
                  }
                }
              }, _callee25);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].stopListening();
            });
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            _result$current11 = result.current, transcript = _result$current11.transcript, interimTranscript = _result$current11.interimTranscript, finalTranscript = _result$current11.finalTranscript;
            expect(transcript).toEqual('');
            expect(interimTranscript).toEqual('');
            expect(finalTranscript).toEqual('');

          case 11:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));
  test('sets interim transcript correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
    var _renderHook19, result, speech, _result$current12, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            mockRecognitionManager();
            _renderHook19 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook19.result;
            speech = 'This is a test';
            _context28.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
              return regeneratorRuntime.wrap(function _callee27$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      _context27.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, _callee27);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech, {
                onlyFirstResult: true
              });
            });
            _result$current12 = result.current, transcript = _result$current12.transcript, interimTranscript = _result$current12.interimTranscript, finalTranscript = _result$current12.finalTranscript;
            expect(transcript).toEqual('This');
            expect(interimTranscript).toEqual('This');
            expect(finalTranscript).toEqual('');

          case 10:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  })));
  test('appends interim transcript correctly', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
    var _renderHook20, result, speech, _result$current13, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            mockRecognitionManager();
            _renderHook20 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook20.result;
            speech = 'This is a test';
            _context30.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
              return regeneratorRuntime.wrap(function _callee29$(_context29) {
                while (1) {
                  switch (_context29.prev = _context29.next) {
                    case 0:
                      _context29.next = 2;
                      return _SpeechRecognition["default"].startListening({
                        continuous: true
                      });

                    case 2:
                    case "end":
                      return _context29.stop();
                  }
                }
              }, _callee29);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech, {
                onlyFirstResult: true
              });
            });
            _result$current13 = result.current, transcript = _result$current13.transcript, interimTranscript = _result$current13.interimTranscript, finalTranscript = _result$current13.finalTranscript;
            expect(transcript).toEqual('This is a test This');
            expect(interimTranscript).toEqual('This');
            expect(finalTranscript).toEqual(speech);

          case 11:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  })));
  test('appends interim transcript correctly on Android', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
    var _renderHook21, result, speech, _result$current14, transcript, interimTranscript, finalTranscript;

    return regeneratorRuntime.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            _isAndroid["default"].mockReturnValue(true);

            mockRecognitionManager();
            _renderHook21 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook21.result;
            speech = 'This is a test';
            _context32.next = 6;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
              return regeneratorRuntime.wrap(function _callee31$(_context31) {
                while (1) {
                  switch (_context31.prev = _context31.next) {
                    case 0:
                      _context31.next = 2;
                      return _SpeechRecognition["default"].startListening({
                        continuous: true
                      });

                    case 2:
                    case "end":
                      return _context31.stop();
                  }
                }
              }, _callee31);
            })));

          case 6:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech, {
                isAndroid: true
              });
            });
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech, {
                onlyFirstResult: true,
                isAndroid: true
              });
            });
            _result$current14 = result.current, transcript = _result$current14.transcript, interimTranscript = _result$current14.interimTranscript, finalTranscript = _result$current14.finalTranscript;
            expect(transcript).toEqual('This is a test This');
            expect(interimTranscript).toEqual('This');
            expect(finalTranscript).toEqual(speech);

          case 12:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32);
  })));
  test('resets transcript on subsequent discontinuous speech when clearTranscriptOnListen set', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35() {
    var _renderHook22, result, speech;

    return regeneratorRuntime.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            mockRecognitionManager();
            _renderHook22 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            }), result = _renderHook22.result;
            speech = 'This is a test';
            _context35.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33() {
              return regeneratorRuntime.wrap(function _callee33$(_context33) {
                while (1) {
                  switch (_context33.prev = _context33.next) {
                    case 0:
                      _context33.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context33.stop();
                  }
                }
              }, _callee33);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(result.current.transcript).toEqual(speech);
            expect(result.current.interimTranscript).toEqual('');
            expect(result.current.finalTranscript).toEqual(speech);
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].stopListening();
            });
            expect(result.current.transcript).toEqual(speech);
            expect(result.current.interimTranscript).toEqual('');
            expect(result.current.finalTranscript).toEqual(speech);
            _context35.next = 15;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34() {
              return regeneratorRuntime.wrap(function _callee34$(_context34) {
                while (1) {
                  switch (_context34.prev = _context34.next) {
                    case 0:
                      _context34.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context34.stop();
                  }
                }
              }, _callee34);
            })));

          case 15:
            expect(result.current.transcript).toEqual('');
            expect(result.current.interimTranscript).toEqual('');
            expect(result.current.finalTranscript).toEqual('');

          case 18:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35);
  })));
  test('does not reset transcript on subsequent discontinuous speech when clearTranscriptOnListen not set', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38() {
    var _renderHook23, result, speech;

    return regeneratorRuntime.wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            mockRecognitionManager();
            _renderHook23 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                clearTranscriptOnListen: false
              });
            }), result = _renderHook23.result;
            speech = 'This is a test';
            _context38.next = 5;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36() {
              return regeneratorRuntime.wrap(function _callee36$(_context36) {
                while (1) {
                  switch (_context36.prev = _context36.next) {
                    case 0:
                      _context36.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context36.stop();
                  }
                }
              }, _callee36);
            })));

          case 5:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(result.current.transcript).toEqual(speech);
            expect(result.current.interimTranscript).toEqual('');
            expect(result.current.finalTranscript).toEqual(speech);
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].stopListening();
            });
            expect(result.current.transcript).toEqual(speech);
            expect(result.current.interimTranscript).toEqual('');
            expect(result.current.finalTranscript).toEqual(speech);
            _context38.next = 15;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37() {
              return regeneratorRuntime.wrap(function _callee37$(_context37) {
                while (1) {
                  switch (_context37.prev = _context37.next) {
                    case 0:
                      _context37.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context37.stop();
                  }
                }
              }, _callee37);
            })));

          case 15:
            expect(result.current.transcript).toEqual(speech);
            expect(result.current.interimTranscript).toEqual('');
            expect(result.current.finalTranscript).toEqual(speech);

          case 18:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38);
  })));
  test('does not call command callback when no command matched', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'hello world',
              callback: mockCommandCallback,
              matchInterim: false
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'This is a test';
            _context40.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39() {
              return regeneratorRuntime.wrap(function _callee39$(_context39) {
                while (1) {
                  switch (_context39.prev = _context39.next) {
                    case 0:
                      _context39.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context39.stop();
                  }
                }
              }, _callee39);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(0);

          case 9:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40);
  })));
  test('matches simple command', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee42() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'hello world',
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'hello world';
            _context42.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee41() {
              return regeneratorRuntime.wrap(function _callee41$(_context41) {
                while (1) {
                  switch (_context41.prev = _context41.next) {
                    case 0:
                      _context41.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context41.stop();
                  }
                }
              }, _callee41);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context42.stop();
        }
      }
    }, _callee42);
  })));
  test('matches one splat', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee44() {
    var mockCommandCallback, command, commands, _renderHook24, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee44$(_context44) {
      while (1) {
        switch (_context44.prev = _context44.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = 'I want to eat * and fries';
            commands = [{
              command: command,
              callback: mockCommandCallback
            }];
            _renderHook24 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook24.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to eat pizza and fries';
            _context44.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee43() {
              return regeneratorRuntime.wrap(function _callee43$(_context43) {
                while (1) {
                  switch (_context43.prev = _context43.next) {
                    case 0:
                      _context43.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context43.stop();
                  }
                }
              }, _callee43);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('pizza', {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context44.stop();
        }
      }
    }, _callee44);
  })));
  test('matches one splat at the end of the sentence', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee46() {
    var mockCommandCallback, command, commands, _renderHook25, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee46$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = 'I want to eat *';
            commands = [{
              command: command,
              callback: mockCommandCallback
            }];
            _renderHook25 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook25.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to eat pizza and fries';
            _context46.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee45() {
              return regeneratorRuntime.wrap(function _callee45$(_context45) {
                while (1) {
                  switch (_context45.prev = _context45.next) {
                    case 0:
                      _context45.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context45.stop();
                  }
                }
              }, _callee45);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('pizza and fries', {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context46.stop();
        }
      }
    }, _callee46);
  })));
  test('matches two splats', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee48() {
    var mockCommandCallback, command, commands, _renderHook26, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee48$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = 'I want to eat * and *';
            commands = [{
              command: command,
              callback: mockCommandCallback
            }];
            _renderHook26 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook26.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to eat pizza and fries';
            _context48.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee47() {
              return regeneratorRuntime.wrap(function _callee47$(_context47) {
                while (1) {
                  switch (_context47.prev = _context47.next) {
                    case 0:
                      _context47.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context47.stop();
                  }
                }
              }, _callee47);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('pizza', 'fries', {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context48.stop();
        }
      }
    }, _callee48);
  })));
  test('matches optional words when optional word spoken', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee50() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee50$(_context50) {
      while (1) {
        switch (_context50.prev = _context50.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'Hello (to) you',
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'Hello to you';
            _context50.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee49() {
              return regeneratorRuntime.wrap(function _callee49$(_context49) {
                while (1) {
                  switch (_context49.prev = _context49.next) {
                    case 0:
                      _context49.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context49.stop();
                  }
                }
              }, _callee49);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context50.stop();
        }
      }
    }, _callee50);
  })));
  test('matches optional words when optional word not spoken', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee52() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee52$(_context52) {
      while (1) {
        switch (_context52.prev = _context52.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'Hello (to) you',
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'Hello you';
            _context52.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee51() {
              return regeneratorRuntime.wrap(function _callee51$(_context51) {
                while (1) {
                  switch (_context51.prev = _context51.next) {
                    case 0:
                      _context51.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context51.stop();
                  }
                }
              }, _callee51);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context52.stop();
        }
      }
    }, _callee52);
  })));
  test('matches named variable', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee54() {
    var mockCommandCallback, command, commands, _renderHook27, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee54$(_context54) {
      while (1) {
        switch (_context54.prev = _context54.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = 'I :action with my little eye';
            commands = [{
              command: command,
              callback: mockCommandCallback
            }];
            _renderHook27 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook27.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I spy with my little eye';
            _context54.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee53() {
              return regeneratorRuntime.wrap(function _callee53$(_context53) {
                while (1) {
                  switch (_context53.prev = _context53.next) {
                    case 0:
                      _context53.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context53.stop();
                  }
                }
              }, _callee53);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('spy', {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context54.stop();
        }
      }
    }, _callee54);
  })));
  test('matches regex', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee56() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee56$(_context56) {
      while (1) {
        switch (_context56.prev = _context56.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: new RegExp('This is a \\s+ test\\.+'),
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'This is a      test.......';
            _context56.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee55() {
              return regeneratorRuntime.wrap(function _callee55$(_context55) {
                while (1) {
                  switch (_context55.prev = _context55.next) {
                    case 0:
                      _context55.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context55.stop();
                  }
                }
              }, _callee55);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context56.stop();
        }
      }
    }, _callee56);
  })));
  test('matches regex case-insensitively', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee58() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee58$(_context58) {
      while (1) {
        switch (_context58.prev = _context58.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: new RegExp('This is a \\s+ test\\.+'),
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'this is a      TEST.......';
            _context58.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee57() {
              return regeneratorRuntime.wrap(function _callee57$(_context57) {
                while (1) {
                  switch (_context57.prev = _context57.next) {
                    case 0:
                      _context57.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context57.stop();
                  }
                }
              }, _callee57);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context58.stop();
        }
      }
    }, _callee58);
  })));
  test('matches multiple commands', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee60() {
    var mockCommandCallback1, mockCommandCallback2, mockCommandCallback3, command1, command2, commands, _renderHook28, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee60$(_context60) {
      while (1) {
        switch (_context60.prev = _context60.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback1 = jest.fn();
            mockCommandCallback2 = jest.fn();
            mockCommandCallback3 = jest.fn();
            command1 = 'I want to eat * and *';
            command2 = '* and fries are great';
            commands = [{
              command: command1,
              callback: mockCommandCallback1
            }, {
              command: command2,
              callback: mockCommandCallback2
            }, {
              command: 'flibble',
              callback: mockCommandCallback3
            }];
            _renderHook28 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook28.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to eat pizza and fries are great';
            _context60.next = 12;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee59() {
              return regeneratorRuntime.wrap(function _callee59$(_context59) {
                while (1) {
                  switch (_context59.prev = _context59.next) {
                    case 0:
                      _context59.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context59.stop();
                  }
                }
              }, _callee59);
            })));

          case 12:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback1.mock.calls.length).toBe(1);
            expect(mockCommandCallback1).toBeCalledWith('pizza', 'fries are great', {
              command: command1,
              resetTranscript: resetTranscript
            });
            expect(mockCommandCallback2.mock.calls.length).toBe(1);
            expect(mockCommandCallback2).toBeCalledWith('I want to eat pizza', {
              command: command2,
              resetTranscript: resetTranscript
            });
            expect(mockCommandCallback3.mock.calls.length).toBe(0);

          case 18:
          case "end":
            return _context60.stop();
        }
      }
    }, _callee60);
  })));
  test('matches arrays of commands', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee62() {
    var mockCommandCallback1, mockCommandCallback2, command1, command2, command3, commands, _renderHook29, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee62$(_context62) {
      while (1) {
        switch (_context62.prev = _context62.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback1 = jest.fn();
            mockCommandCallback2 = jest.fn();
            command1 = 'I want to eat * and *';
            command2 = '* and fries are great';
            command3 = '* and * are great';
            commands = [{
              command: [command1, command2],
              callback: mockCommandCallback1
            }, {
              command: command3,
              callback: mockCommandCallback2
            }];
            _renderHook29 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook29.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to eat pizza and fries are great';
            _context62.next = 12;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee61() {
              return regeneratorRuntime.wrap(function _callee61$(_context61) {
                while (1) {
                  switch (_context61.prev = _context61.next) {
                    case 0:
                      _context61.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context61.stop();
                  }
                }
              }, _callee61);
            })));

          case 12:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback1.mock.calls.length).toBe(2);
            expect(mockCommandCallback1).nthCalledWith(1, 'pizza', 'fries are great', {
              command: command1,
              resetTranscript: resetTranscript
            });
            expect(mockCommandCallback1).nthCalledWith(2, 'I want to eat pizza', {
              command: command2,
              resetTranscript: resetTranscript
            });
            expect(mockCommandCallback2.mock.calls.length).toBe(1);
            expect(mockCommandCallback2).toBeCalledWith('I want to eat pizza', 'fries', {
              command: command3,
              resetTranscript: resetTranscript
            });

          case 18:
          case "end":
            return _context62.stop();
        }
      }
    }, _callee62);
  })));
  test('does not match interim results by default', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee64() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee64$(_context64) {
      while (1) {
        switch (_context64.prev = _context64.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'This is',
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'This is a test';
            _context64.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee63() {
              return regeneratorRuntime.wrap(function _callee63$(_context63) {
                while (1) {
                  switch (_context63.prev = _context63.next) {
                    case 0:
                      _context63.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context63.stop();
                  }
                }
              }, _callee63);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(0);

          case 9:
          case "end":
            return _context64.stop();
        }
      }
    }, _callee64);
  })));
  test('matches interim results when configured', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee66() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee66$(_context66) {
      while (1) {
        switch (_context66.prev = _context66.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'This is',
              callback: mockCommandCallback,
              matchInterim: true
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'This is a test';
            _context66.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee65() {
              return regeneratorRuntime.wrap(function _callee65$(_context65) {
                while (1) {
                  switch (_context65.prev = _context65.next) {
                    case 0:
                      _context65.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context65.stop();
                  }
                }
              }, _callee65);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context66.stop();
        }
      }
    }, _callee66);
  })));
  test('transcript resets should be per instance, not global', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee68() {
    var hook1, hook2, speech;
    return regeneratorRuntime.wrap(function _callee68$(_context68) {
      while (1) {
        switch (_context68.prev = _context68.next) {
          case 0:
            mockRecognitionManager();
            hook1 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            });
            hook2 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)();
            });
            speech = 'This is a test';
            _context68.next = 6;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee67() {
              return regeneratorRuntime.wrap(function _callee67$(_context67) {
                while (1) {
                  switch (_context67.prev = _context67.next) {
                    case 0:
                      _context67.next = 2;
                      return _SpeechRecognition["default"].startListening({
                        continuous: true
                      });

                    case 2:
                    case "end":
                      return _context67.stop();
                  }
                }
              }, _callee67);
            })));

          case 6:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            (0, _reactHooks.act)(function () {
              hook2.result.current.resetTranscript();
            });
            expect(hook2.result.current.transcript).toEqual('');
            expect(hook2.result.current.interimTranscript).toEqual('');
            expect(hook2.result.current.finalTranscript).toEqual('');
            expect(hook1.result.current.transcript).toEqual(speech);
            expect(hook1.result.current.interimTranscript).toEqual('');
            expect(hook1.result.current.finalTranscript).toEqual(speech);

          case 14:
          case "end":
            return _context68.stop();
        }
      }
    }, _callee68);
  })));
  test('does not call command callback when isFuzzyMatch is not true', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee70() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee70$(_context70) {
      while (1) {
        switch (_context70.prev = _context70.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'hello world',
              callback: mockCommandCallback
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'This is a test';
            _context70.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee69() {
              return regeneratorRuntime.wrap(function _callee69$(_context69) {
                while (1) {
                  switch (_context69.prev = _context69.next) {
                    case 0:
                      _context69.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context69.stop();
                  }
                }
              }, _callee69);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(0);

          case 9:
          case "end":
            return _context70.stop();
        }
      }
    }, _callee70);
  })));
  test('does not call command callback when isFuzzyMatch is true and similarity is less than fuzzyMatchingThreshold', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee72() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee72$(_context72) {
      while (1) {
        switch (_context72.prev = _context72.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'hello world',
              callback: mockCommandCallback,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 0.7
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'Hello';
            _context72.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee71() {
              return regeneratorRuntime.wrap(function _callee71$(_context71) {
                while (1) {
                  switch (_context71.prev = _context71.next) {
                    case 0:
                      _context71.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context71.stop();
                  }
                }
              }, _callee71);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(0);

          case 9:
          case "end":
            return _context72.stop();
        }
      }
    }, _callee72);
  })));
  test('does call command callback when isFuzzyMatch is true and similarity is equal or greater than fuzzyMatchingThreshold', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee74() {
    var mockCommandCallback, commands, speech;
    return regeneratorRuntime.wrap(function _callee74$(_context74) {
      while (1) {
        switch (_context74.prev = _context74.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            commands = [{
              command: 'hello world',
              callback: mockCommandCallback,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 0.5
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'Hello';
            _context74.next = 7;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee73() {
              return regeneratorRuntime.wrap(function _callee73$(_context73) {
                while (1) {
                  switch (_context73.prev = _context73.next) {
                    case 0:
                      _context73.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context73.stop();
                  }
                }
              }, _callee73);
            })));

          case 7:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);

          case 9:
          case "end":
            return _context74.stop();
        }
      }
    }, _callee74);
  })));
  test('callback is called with command, transcript and similarity ratio between those', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee76() {
    var mockCommandCallback, command, commands, _renderHook30, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee76$(_context76) {
      while (1) {
        switch (_context76.prev = _context76.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = 'I want to eat';
            commands = [{
              command: command,
              callback: mockCommandCallback,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 0.5
            }];
            _renderHook30 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook30.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to drink';
            _context76.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee75() {
              return regeneratorRuntime.wrap(function _callee75$(_context75) {
                while (1) {
                  switch (_context75.prev = _context75.next) {
                    case 0:
                      _context75.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context75.stop();
                  }
                }
              }, _callee75);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('I want to eat', 'I want to drink', 0.6, {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context76.stop();
        }
      }
    }, _callee76);
  })));
  test('different callbacks can be called for the same speech and with fuzzyMatchingThreshold', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee78() {
    var mockCommandCallback1, mockCommandCallback2, commands, speech;
    return regeneratorRuntime.wrap(function _callee78$(_context78) {
      while (1) {
        switch (_context78.prev = _context78.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback1 = jest.fn();
            mockCommandCallback2 = jest.fn();
            commands = [{
              command: 'I want to eat',
              callback: mockCommandCallback1,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 1
            }, {
              command: 'I want to sleep',
              callback: mockCommandCallback2,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 0.2
            }];
            (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            });
            speech = 'I want to eat';
            _context78.next = 8;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee77() {
              return regeneratorRuntime.wrap(function _callee77$(_context77) {
                while (1) {
                  switch (_context77.prev = _context77.next) {
                    case 0:
                      _context77.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context77.stop();
                  }
                }
              }, _callee77);
            })));

          case 8:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback1.mock.calls.length).toBe(1);
            expect(mockCommandCallback2.mock.calls.length).toBe(1);

          case 11:
          case "end":
            return _context78.stop();
        }
      }
    }, _callee78);
  })));
  test('fuzzy callback called for each matching command in array by default', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee80() {
    var mockCommandCallback, command1, command2, commands, _renderHook31, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee80$(_context80) {
      while (1) {
        switch (_context80.prev = _context80.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command1 = 'I want to eat';
            command2 = 'I want to sleep';
            commands = [{
              command: [command1, command2],
              callback: mockCommandCallback,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 0.2
            }];
            _renderHook31 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook31.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to leap';
            _context80.next = 10;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee79() {
              return regeneratorRuntime.wrap(function _callee79$(_context79) {
                while (1) {
                  switch (_context79.prev = _context79.next) {
                    case 0:
                      _context79.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context79.stop();
                  }
                }
              }, _callee79);
            })));

          case 10:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(2);
            expect(mockCommandCallback).nthCalledWith(1, command1, 'I want to leap', 0.7368421052631579, {
              command: command1,
              resetTranscript: resetTranscript
            });
            expect(mockCommandCallback).nthCalledWith(2, command2, 'I want to leap', 0.6666666666666666, {
              command: command2,
              resetTranscript: resetTranscript
            });

          case 14:
          case "end":
            return _context80.stop();
        }
      }
    }, _callee80);
  })));
  test('fuzzy callback called only for best matching command in array when bestMatchOnly is true', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee82() {
    var mockCommandCallback, command1, command2, commands, _renderHook32, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee82$(_context82) {
      while (1) {
        switch (_context82.prev = _context82.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command1 = 'I want to eat';
            command2 = 'I want to sleep';
            commands = [{
              command: [command1, command2],
              callback: mockCommandCallback,
              isFuzzyMatch: true,
              fuzzyMatchingThreshold: 0.2,
              bestMatchOnly: true
            }];
            _renderHook32 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook32.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I want to leap';
            _context82.next = 10;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee81() {
              return regeneratorRuntime.wrap(function _callee81$(_context81) {
                while (1) {
                  switch (_context81.prev = _context81.next) {
                    case 0:
                      _context81.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context81.stop();
                  }
                }
              }, _callee81);
            })));

          case 10:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).nthCalledWith(1, command1, 'I want to leap', 0.7368421052631579, {
              command: command1,
              resetTranscript: resetTranscript
            });

          case 13:
          case "end":
            return _context82.stop();
        }
      }
    }, _callee82);
  })));
  test('when command is regex with fuzzy match true runs similarity check with regex converted to string', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee84() {
    var mockCommandCallback, command, commands, _renderHook33, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee84$(_context84) {
      while (1) {
        switch (_context84.prev = _context84.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = new RegExp('This is a \\s+ test\\.+');
            commands = [{
              command: command,
              callback: mockCommandCallback,
              isFuzzyMatch: true
            }];
            _renderHook33 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook33.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'This is a test';
            _context84.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee83() {
              return regeneratorRuntime.wrap(function _callee83$(_context83) {
                while (1) {
                  switch (_context83.prev = _context83.next) {
                    case 0:
                      _context83.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context83.stop();
                  }
                }
              }, _callee83);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('This is a s test', 'This is a test', 0.8571428571428571, {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context84.stop();
        }
      }
    }, _callee84);
  })));
  test('when command is string special characters with fuzzy match true, special characters are removed from string and then we test similarity', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee86() {
    var mockCommandCallback, command, commands, _renderHook34, result, resetTranscript, speech;

    return regeneratorRuntime.wrap(function _callee86$(_context86) {
      while (1) {
        switch (_context86.prev = _context86.next) {
          case 0:
            mockRecognitionManager();
            mockCommandCallback = jest.fn();
            command = '! (I would :like) : * a :pizza ';
            commands = [{
              command: command,
              callback: mockCommandCallback,
              isFuzzyMatch: true
            }];
            _renderHook34 = (0, _reactHooks.renderHook)(function () {
              return (0, _SpeechRecognition.useSpeechRecognition)({
                commands: commands
              });
            }), result = _renderHook34.result;
            resetTranscript = result.current.resetTranscript;
            speech = 'I would like a pizza';
            _context86.next = 9;
            return (0, _reactHooks.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee85() {
              return regeneratorRuntime.wrap(function _callee85$(_context85) {
                while (1) {
                  switch (_context85.prev = _context85.next) {
                    case 0:
                      _context85.next = 2;
                      return _SpeechRecognition["default"].startListening();

                    case 2:
                    case "end":
                      return _context85.stop();
                  }
                }
              }, _callee85);
            })));

          case 9:
            (0, _reactHooks.act)(function () {
              _SpeechRecognition["default"].getRecognition().say(speech);
            });
            expect(mockCommandCallback.mock.calls.length).toBe(1);
            expect(mockCommandCallback).toBeCalledWith('I would like a pizza', 'I would like a pizza', 1, {
              command: command,
              resetTranscript: resetTranscript
            });

          case 12:
          case "end":
            return _context86.stop();
        }
      }
    }, _callee86);
  })));
});