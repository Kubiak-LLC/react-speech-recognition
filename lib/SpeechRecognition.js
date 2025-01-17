"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useSpeechRecognition = void 0;

var _react = require("react");

var _utils = require("./utils");

var _actions = require("./actions");

var _reducers = require("./reducers");

var _RecognitionManager = _interopRequireDefault(require("./RecognitionManager"));

var _isAndroid = _interopRequireDefault(require("./isAndroid"));

var _NativeSpeechRecognition = _interopRequireDefault(require("./NativeSpeechRecognition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _browserSupportsSpeechRecognition = !!_NativeSpeechRecognition["default"];

var _browserSupportsContinuousListening = _browserSupportsSpeechRecognition && !(0, _isAndroid["default"])();

var recognitionManager;

var useSpeechRecognition = function useSpeechRecognition() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$transcribing = _ref.transcribing,
      transcribing = _ref$transcribing === void 0 ? true : _ref$transcribing,
      _ref$clearTranscriptO = _ref.clearTranscriptOnListen,
      clearTranscriptOnListen = _ref$clearTranscriptO === void 0 ? true : _ref$clearTranscriptO,
      _ref$commands = _ref.commands,
      commands = _ref$commands === void 0 ? [] : _ref$commands;

  var _useState = (0, _react.useState)(SpeechRecognition.getRecognitionManager()),
      _useState2 = _slicedToArray(_useState, 1),
      recognitionManager = _useState2[0];

  var _useState3 = (0, _react.useState)(_browserSupportsSpeechRecognition),
      _useState4 = _slicedToArray(_useState3, 2),
      browserSupportsSpeechRecognition = _useState4[0],
      setBrowserSupportsSpeechRecognition = _useState4[1];

  var _useState5 = (0, _react.useState)(_browserSupportsContinuousListening),
      _useState6 = _slicedToArray(_useState5, 2),
      browserSupportsContinuousListening = _useState6[0],
      setBrowserSupportsContinuousListening = _useState6[1];

  var _useReducer = (0, _react.useReducer)(_reducers.transcriptReducer, {
    interimTranscript: recognitionManager.interimTranscript,
    finalTranscript: ''
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      interimTranscript = _useReducer2$.interimTranscript,
      finalTranscript = _useReducer2$.finalTranscript,
      dispatch = _useReducer2[1];

  var _useState7 = (0, _react.useState)(recognitionManager.listening),
      _useState8 = _slicedToArray(_useState7, 2),
      listening = _useState8[0],
      setListening = _useState8[1];

  var _useState9 = (0, _react.useState)(recognitionManager.fullResults),
      _useState10 = _slicedToArray(_useState9, 2),
      fullResults = _useState10[0],
      setFullResults = _useState10[1];

  var commandsRef = (0, _react.useRef)(commands);
  commandsRef.current = commands;

  var clearTranscript = function clearTranscript() {
    dispatch((0, _actions.clearTrancript)());
  };

  var resetTranscript = (0, _react.useCallback)(function () {
    recognitionManager.resetTranscript();
    clearTranscript();
  }, [recognitionManager]);

  var testFuzzyMatch = function testFuzzyMatch(command, input, fuzzyMatchingThreshold) {
    var commandToString = _typeof(command) === 'object' ? command.toString() : command;
    var commandWithoutSpecials = commandToString.replace(/[&/\\#,+()!$~%.'":*?<>{}]/g, '').replace(/  +/g, ' ').trim();
    var howSimilar = (0, _utils.compareTwoStringsUsingDiceCoefficient)(commandWithoutSpecials, input);

    if (howSimilar >= fuzzyMatchingThreshold) {
      return {
        command: command,
        commandWithoutSpecials: commandWithoutSpecials,
        howSimilar: howSimilar,
        isFuzzyMatch: true
      };
    }

    return null;
  };

  var testMatch = function testMatch(command, input) {
    var pattern = (0, _utils.commandToRegExp)(command);
    var result = pattern.exec(input);

    if (result) {
      return {
        command: command,
        parameters: result.slice(1)
      };
    }

    return null;
  };

  var matchCommands = (0, _react.useCallback)(function (newInterimTranscript, newFinalTranscript) {
    commandsRef.current.forEach(function (_ref2) {
      var command = _ref2.command,
          callback = _ref2.callback,
          _ref2$matchInterim = _ref2.matchInterim,
          matchInterim = _ref2$matchInterim === void 0 ? false : _ref2$matchInterim,
          _ref2$isFuzzyMatch = _ref2.isFuzzyMatch,
          isFuzzyMatch = _ref2$isFuzzyMatch === void 0 ? false : _ref2$isFuzzyMatch,
          _ref2$fuzzyMatchingTh = _ref2.fuzzyMatchingThreshold,
          fuzzyMatchingThreshold = _ref2$fuzzyMatchingTh === void 0 ? 0.8 : _ref2$fuzzyMatchingTh,
          _ref2$bestMatchOnly = _ref2.bestMatchOnly,
          bestMatchOnly = _ref2$bestMatchOnly === void 0 ? false : _ref2$bestMatchOnly;
      var input = !newFinalTranscript && matchInterim ? newInterimTranscript.trim() : newFinalTranscript.trim();
      var subcommands = Array.isArray(command) ? command : [command];
      var results = subcommands.map(function (subcommand) {
        if (isFuzzyMatch) {
          return testFuzzyMatch(subcommand, input, fuzzyMatchingThreshold);
        }

        return testMatch(subcommand, input);
      }).filter(function (x) {
        return x;
      });

      if (isFuzzyMatch && bestMatchOnly && results.length >= 2) {
        results.sort(function (a, b) {
          return b.howSimilar - a.howSimilar;
        });
        var _results$ = results[0],
            _command = _results$.command,
            commandWithoutSpecials = _results$.commandWithoutSpecials,
            howSimilar = _results$.howSimilar;
        callback(commandWithoutSpecials, input, howSimilar, {
          command: _command,
          resetTranscript: resetTranscript
        });
      } else {
        results.forEach(function (result) {
          if (result.isFuzzyMatch) {
            var _command2 = result.command,
                _commandWithoutSpecials = result.commandWithoutSpecials,
                _howSimilar = result.howSimilar;
            callback(_commandWithoutSpecials, input, _howSimilar, {
              command: _command2,
              resetTranscript: resetTranscript
            });
          } else {
            var _command3 = result.command,
                parameters = result.parameters;
            callback.apply(void 0, _toConsumableArray(parameters).concat([{
              command: _command3,
              resetTranscript: resetTranscript
            }]));
          }
        });
      }
    });
  }, [resetTranscript]);
  var handleTranscriptChange = (0, _react.useCallback)(function (newInterimTranscript, newFinalTranscript) {
    if (transcribing) {
      dispatch((0, _actions.appendTrancript)(newInterimTranscript, newFinalTranscript));
    }

    matchCommands(newInterimTranscript, newFinalTranscript);
  }, [matchCommands, transcribing]); // const handleResultsChange = useCallback(
  //   (newResults) => {
  //     dispatch(newResults)
  //   }, [fullResults]
  // )

  var handleClearTranscript = (0, _react.useCallback)(function () {
    if (clearTranscriptOnListen) {
      clearTranscript();
    }
  }, [clearTranscriptOnListen]);
  (0, _react.useEffect)(function () {
    var id = SpeechRecognition.counter;
    SpeechRecognition.counter += 1;
    var callbacks = {
      onListeningChange: setListening,
      onTranscriptChange: handleTranscriptChange,
      onResultsChange: setFullResults,
      onClearTranscript: handleClearTranscript,
      onBrowserSupportsSpeechRecognitionChange: setBrowserSupportsSpeechRecognition,
      onBrowserSupportsContinuousListeningChange: setBrowserSupportsContinuousListening
    };
    recognitionManager.subscribe(id, callbacks);
    return function () {
      recognitionManager.unsubscribe(id);
    };
  }, [transcribing, clearTranscriptOnListen, recognitionManager, handleTranscriptChange, handleClearTranscript]);
  var transcript = (0, _utils.concatTranscripts)(finalTranscript, interimTranscript);
  return {
    transcript: transcript,
    interimTranscript: interimTranscript,
    finalTranscript: finalTranscript,
    fullResults: fullResults,
    listening: listening,
    resetTranscript: resetTranscript,
    browserSupportsSpeechRecognition: browserSupportsSpeechRecognition,
    browserSupportsContinuousListening: browserSupportsContinuousListening
  };
};

exports.useSpeechRecognition = useSpeechRecognition;
var SpeechRecognition = {
  counter: 0,
  applyPolyfill: function applyPolyfill(PolyfillSpeechRecognition) {
    if (recognitionManager) {
      recognitionManager.setSpeechRecognition(PolyfillSpeechRecognition);
    } else {
      recognitionManager = new _RecognitionManager["default"](PolyfillSpeechRecognition);
    }

    var browserSupportsPolyfill = !!PolyfillSpeechRecognition && (0, _utils.browserSupportsPolyfills)();
    _browserSupportsSpeechRecognition = browserSupportsPolyfill;
    _browserSupportsContinuousListening = browserSupportsPolyfill;
  },
  getRecognitionManager: function getRecognitionManager() {
    if (!recognitionManager) {
      recognitionManager = new _RecognitionManager["default"](_NativeSpeechRecognition["default"]);
    }

    return recognitionManager;
  },
  getRecognition: function getRecognition() {
    var recognitionManager = SpeechRecognition.getRecognitionManager();
    return recognitionManager.getRecognition();
  },
  startListening: function () {
    var _startListening = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _ref3,
          continuous,
          language,
          recognitionManager,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref3 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, continuous = _ref3.continuous, language = _ref3.language;
              recognitionManager = SpeechRecognition.getRecognitionManager();
              _context.next = 4;
              return recognitionManager.startListening({
                continuous: continuous,
                language: language
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function startListening() {
      return _startListening.apply(this, arguments);
    }

    return startListening;
  }(),
  stopListening: function () {
    var _stopListening = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var recognitionManager;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              recognitionManager = SpeechRecognition.getRecognitionManager();
              _context2.next = 3;
              return recognitionManager.stopListening();

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function stopListening() {
      return _stopListening.apply(this, arguments);
    }

    return stopListening;
  }(),
  abortListening: function () {
    var _abortListening = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var recognitionManager;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              recognitionManager = SpeechRecognition.getRecognitionManager();
              _context3.next = 3;
              return recognitionManager.abortListening();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function abortListening() {
      return _abortListening.apply(this, arguments);
    }

    return abortListening;
  }(),
  browserSupportsSpeechRecognition: function browserSupportsSpeechRecognition() {
    return _browserSupportsSpeechRecognition;
  },
  browserSupportsContinuousListening: function browserSupportsContinuousListening() {
    return _browserSupportsContinuousListening;
  }
};
var _default = SpeechRecognition;
exports["default"] = _default;