'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRedux = require('react-redux');
var Draggable = require('react-draggable');
var antd = require('antd');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Draggable__default = /*#__PURE__*/_interopDefaultLegacy(Draggable);

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$7 = "#Container {\n  width: 100%;\n  height: 100%;\n}";
styleInject(css_248z$7);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function EventDispatcher() {}

Object.assign(EventDispatcher.prototype, {
  /**
  * ???????????????
  * @param type{string} ???????????????
  * @param listener{function} ??????
  * @param mutexStatus{boolean} ????????????
  */
  addEventListener: function addEventListener(type, listener) {
    var mutexStatus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (this._listeners === undefined) this._listeners = {};
    this._mutex = this._mutex || {};
    var mutex = this._mutex;
    var listeners = this._listeners;

    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    if (listeners[type].indexOf(listener) === -1) {
      // ????????????????????????
      if (mutexStatus) {
        mutex[type] = listener;
      }

      listeners[type].push(listener);
    }
  },
  hasEventListener: function hasEventListener(type, listener) {
    if (this._listeners === undefined) return false;
    var listeners = this._listeners;
    return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
  },
  removeEventListener: function removeEventListener(type, listener) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[type]; // ???????????????????????????

    if (this._mutex[type] === listener) {
      this._mutex[type] = null;
    }

    if (listenerArray !== undefined) {
      var index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  },

  /**
  * ????????????
  * @param event{{type: string, message?: *}}
  */
  dispatchEvent: function dispatchEvent(event) {
    var _this = this;

    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      event.target = this; // Make a copy, in case listeners are removed while iterating.

      var array = listenerArray.slice(0);

      if (this._mutex[event.type]) {
        var find = array.find(function (item) {
          return item === _this._mutex[event.type];
        });
        find.call(this, event); // console.log(' ?????????????????????')

        return;
      }

      for (var i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
    }
  },
  removeAllListener: function removeAllListener() {
    this._mutex = {};

    for (var key in this._listeners) {
      this._listeners[key] = [];
    }
  }
});

// ??????????????????
var EventConstant = {
  CLICK: 'CLICK',
  //???????????????????????? 
  LEFT_DOWN: 'LEFT_DOWN',
  //???????????????????????? 
  LEFT_UP: 'LEFT_UP',
  //???????????????????????? 
  MOUSE_MOVE: 'MOUSE_MOVE',
  //?????????????????? 
  RIGHT_CLICK: 'RIGHT_CLICK',
  //???????????????????????? 
  LEFT_DOWN_MOUSE_MOVE: 'LEFT_DOWN_MOUSE_MOVE',
  //????????????????????????????????? 
  RENDER: 'RENDER',
  //???????????? 
  KEYUP: 'KEYUP',
  //?????????????????? 
  KEYDOWN: 'KEYDOWN' //?????????????????? 

};

var EventManager = /*#__PURE__*/function (_EventDispatcher) {
  _inherits(EventManager, _EventDispatcher);

  var _super = _createSuper(EventManager);

  /**
   * ????????????
   * @type {Scene}
   */
  // scene = null

  /**
   * ???????????????
   * @type{ScreenSpaceEventHandler}
   */
  // handler = null

  /**
   * ????????????
   * @type {boolean}
   */
  // press = false

  /**
   * ????????????????????????
   * @param viewer
   */
  function EventManager(scene, ScreenSpaceEventHandler, ScreenSpaceEventType) {
    var _this;

    _classCallCheck(this, EventManager);

    _this = _super.call(this);
    _this.scene = scene; // ?????????????????????

    _this.handler = new ScreenSpaceEventHandler(scene.canvas); // ????????????????????????

    _this.handler.setInputAction(function (e) {
      _this.dispatchEvent({
        type: EventConstant.CLICK,
        message: e
      });
    }, ScreenSpaceEventType.LEFT_CLICK); // ??????????????????


    _this.handler.setInputAction(function (e) {
      _this.press = true;

      _this.dispatchEvent({
        type: EventConstant.LEFT_DOWN,
        message: e
      });
    }, ScreenSpaceEventType.LEFT_DOWN); // ??????????????????


    _this.handler.setInputAction(function (e) {
      _this.press = false;

      _this.dispatchEvent({
        type: EventConstant.LEFT_UP,
        message: e
      });
    }, ScreenSpaceEventType.LEFT_UP); // ????????????????????????


    _this.handler.setInputAction(function (e) {
      _this.dispatchEvent({
        type: EventConstant.RIGHT_CLICK,
        message: e
      });
    }, ScreenSpaceEventType.RIGHT_CLICK); // ??????????????????


    _this.handler.setInputAction(function (e) {
      // ????????????????????????
      if (_this.press) {
        _this.dispatchEvent({
          type: EventConstant.LEFT_DOWN_MOUSE_MOVE,
          message: e
        });
      }

      _this.dispatchEvent({
        type: EventConstant.MOUSE_MOVE,
        message: e
      });
    }, ScreenSpaceEventType.MOUSE_MOVE); // // ??????????????????
    // this.scene.postRender.addEventListener((e, time) => {
    //     TWEEN && TWEEN.update()
    //     this.scene.stats && this.scene.stats.update()
    //     this.dispatchEvent({
    //         type: EventConstant.RENDER,
    //         message: {
    //             scene: e,
    //             time: time
    //         }
    //     })
    // })
    // // ??????????????????
    // document.addEventListener(EventConstant.KEYUP, (e) => {
    //     this.dispatchEvent({
    //         type: EventConstant.KEYUP,
    //         message: {
    //             e: e
    //         }
    //     })
    // })
    // // ??????????????????
    // document.addEventListener(EventConstant.KEYDOWN, (e) => {
    //     this.dispatchEvent({
    //         type: EventConstant.KEYDOWN,
    //         message: {
    //             e: e
    //         }
    //     })
    // })


    return _this;
  }
  /**
   * ??????????????????????????????
   * @param fn{Function} ????????????
   */


  _createClass(EventManager, [{
    key: "addCameraMoveListener",
    value: function addCameraMoveListener(fn) {
      this.scene.camera.changed.addEventListener(fn);
    }
    /**
     * ????????????????????????
     * @param fn{Function} ????????????
     */

  }, {
    key: "removeCameraMoveListener",
    value: function removeCameraMoveListener(fn) {
      this.scene.camera.changed.removeEventListener(fn);
    }
  }]);

  return EventManager;
}(EventDispatcher);

function Sm3dViewer(props) {
  var dispatch = reactRedux.useDispatch();
  React.useEffect(function () {
    initGlobe(props);
    openingAnimation(); // ??????tooltip
    // if (!window.tooltip) {
    //   window.tooltip = createTooltip(scene._element);
    // }
    // ??????????????????
    // scene.open(
    //   "http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace"
    // );
    // ??????
    // scene.terrainProvider = new SuperMap3D.SuperMapTerrainProvider({
    //   url: "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
    //   requestWaterMask: true,
    //   requestVertexNormals: true,
    //   isSct: false,
    // });
    // // ??????????????????
    // scene.camera.setView({
    //   destination: SuperMap3D.Cartesian3.fromDegrees(88.3648, 29.0946, 90000),
    //   orientation: {
    //     heading: 6.10547067016156,
    //     pitch: -0.8475077031996778,
    //     roll: 6.2831853016686185,
    //   },
    // });
  }, []);
  /**
   * @description: ?????????
   * @param {*} props
   * @return {*}
   */

  var initGlobe = function initGlobe(props) {
    var viewer = new SuperMap3D.Viewer('Container');
    var scene = viewer.scene; // ????????????????????????

    scene.eventManager = new EventManager(scene, SuperMap3D.ScreenSpaceEventHandler, SuperMap3D.ScreenSpaceEventType); // ??????_element

    scene._element = document.body;
    window.scene = scene;
    dispatch({
      type: 'INVIEWER',
      isViewer: true
    });

    if (props && props.sceneUrl) {
      scene.open(props.sceneUrl);
    }
  };
  /**
   * @description: ?????????????????????
   * @return {*}
   */


  var openingAnimation = function openingAnimation() {
    scene.camera.flyTo({
      destination: new SuperMap3D.Cartesian3(6788287.844465209, -41980756.10214644, 29619220.04004376),
      duration: 0,
      complete: function complete() {
        scene.camera.flyTo({
          destination: new SuperMap3D.Cartesian3.fromDegrees(110.60396458865515, 34.54408834959379, 30644793.325518917),
          duration: 5
        });
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    id: "Container"
  });
}

Sm3dViewer.defaultProps = {
  sceneUrl: ''
}; // ??????????????????????????? propTypes ????????????????????????

/*
* ???????????????
*/
//axios??????????????????jsonp
var axiosJsonp = function axiosJsonp(url) {
  if (!url) {
    console.error('Axios.JSONP ??????????????????url??????!');
    return;
  }

  return new Promise(function (resolve, reject) {
    window.jsonCallBack = function (result) {
      resolve(result);
    };

    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = "".concat(url, "&callback=jsonCallBack");
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(function () {
      document.getElementsByTagName("head")[0].removeChild(JSONP);
    }, 500);
  });
}; //??????????????????????????????


var isEqualArr = function isEqualArr(arg1, arg2) {
  if (!arg1 || !arg2) return true;
  var bol = true;

  if (Object.keys(arg1).length != Object.keys(arg2).length) {
    return false;
  }

  for (var key in arg1) {
    if (_typeof(arg1[key]) == 'object') {
      bol = isSame(arg1[key], arg2[key]);

      if (!bol) {
        break;
      }
    } else if (arg1[key] != arg2[key]) {
      bol = false;
      break;
    }
  }

  return bol;
}; //????????????
//?????????????????????


var CartesiantoDegrees = function CartesiantoDegrees(Cartesians) {
  var array = [].concat(Cartesians);
  var positions = [];

  for (var i = 0, len = array.length; i < len; i++) {
    var cartographic = SuperMap3D.Cartographic.fromCartesian(array[i]);
    var longitude = SuperMap3D.Math.toDegrees(cartographic.longitude);
    var latitude = SuperMap3D.Math.toDegrees(cartographic.latitude);
    var h = cartographic.height;

    if (positions.indexOf(longitude) == -1 && positions.indexOf(latitude) == -1) {
      positions.push(longitude);
      positions.push(latitude);
      positions.push(h);
    }
  }

  return positions;
}; //?????????????????????(???????????????????????????)


var CartesiantoDegreesObjs = function CartesiantoDegreesObjs(Cartesians) {
  var array = [].concat(Cartesians);
  var positions = [];

  for (var i = 0, len = array.length; i < len; i++) {
    var cartographic = SuperMap3D.Cartographic.fromCartesian(array[i]);
    var obj = {
      longitude: SuperMap3D.Math.toDegrees(cartographic.longitude),
      latitude: SuperMap3D.Math.toDegrees(cartographic.latitude),
      height: cartographic.height
    };
    positions.push(obj);
  }

  return positions;
}; // ??????????????????


var CartographictoDegrees = function CartographictoDegrees(wgsPosition) {
  var longitude = SuperMap3D.Math.toDegrees(wgsPosition.longitude);
  var latitude = SuperMap3D.Math.toDegrees(wgsPosition.latitude);
  var height = wgsPosition.height;
  return [longitude, latitude, height];
}; //????????????  ??????


var unique = function unique(arr) {
  var res = [];
  var json = {};

  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }

  return res;
}; // ?????????????????????


function gradientColors(start, end, steps, gamma) {
  var i,
      j,
      ms,
      me,
      output = [],
      so = [];
  gamma = gamma || 1;

  var normalize = function normalize(channel) {
    return Math.pow(channel / 255, gamma);
  };

  start = parseColor(start).map(normalize);
  end = parseColor(end).map(normalize);

  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;

    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
    }

    output.push('#' + so.join(''));
  }

  return output;

  function parseColor(hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
      return 0x11 * parseInt(s, 16);
    }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
      return parseInt(s, 16);
    });
  }

  function pad(s) {
    return s.length === 1 ? '0' + s : s;
  }
}

function getAngleAndRadian(pointA, pointB) {
  //????????????A????????????X??????east,Y??????north,Z?????????????????????
  var transform = SuperMap3D.Transforms.eastNorthUpToFixedFrame(pointA); //??????AB

  var positionvector = SuperMap3D.Cartesian3.subtract(pointB, pointA, new SuperMap3D.Cartesian3()); //???transform??????A????????????eastNorthUp???????????????????????????????????????????????????
  //AB???????????????????????????
  //?????????AB???????????????A???????????????????????????????????????transform???????????????

  var vector = SuperMap3D.Matrix4.multiplyByPointAsVector(SuperMap3D.Matrix4.inverse(transform, new SuperMap3D.Matrix4()), positionvector, new SuperMap3D.Cartesian3()); //?????????

  var direction = SuperMap3D.Cartesian3.normalize(vector, new SuperMap3D.Cartesian3()); //heading

  var heading1 = Math.atan2(direction.y, direction.x) - SuperMap3D.Math.PI_OVER_TWO;
  var radian = SuperMap3D.Math.TWO_PI - SuperMap3D.Math.zeroToTwoPi(heading1);
  var angle = radian * (180 / Math.PI);

  if (angle < 0) {
    angle = angle + 360;
  }

  return {
    angle: angle,
    radian: radian
  };
}

function getPitch(pointA, pointB) {
  var transfrom = SuperMap3D.Transforms.eastNorthUpToFixedFrame(pointA);
  var vector = SuperMap3D.Cartesian3.subtract(pointB, pointA, new SuperMap3D.Cartesian3());
  var direction = SuperMap3D.Matrix4.multiplyByPointAsVector(SuperMap3D.Matrix4.inverse(transfrom, transfrom), vector, vector);
  SuperMap3D.Cartesian3.normalize(direction, direction); //??????direction?????????????????????????????????1???????????????????????????direction.z

  var radian = SuperMap3D.Math.PI_OVER_TWO - SuperMap3D.Math.acosClamped(direction.z);
  var angle = radian * (180 / Math.PI);

  if (angle < 0) {
    angle = angle + 360;
  }

  return {
    angle: angle,
    radian: radian
  };
}

var tool$1 = {
  axiosJsonp: axiosJsonp,
  isEqualArr: isEqualArr,
  CartesiantoDegrees: CartesiantoDegrees,
  CartesiantoDegreesObjs: CartesiantoDegreesObjs,
  unique: unique,
  gradientColors: gradientColors,
  getAngleAndRadian: getAngleAndRadian,
  CartographictoDegrees: CartographictoDegrees,
  getPitch: getPitch
};

var css_248z$6 = "@charset \"UTF-8\";\n/*\n* ?????????????????????\n*/\n.drawCur {\n  cursor: url(../assets/images/cur/draw.cur), auto;\n}\n\n.measureCur {\n  cursor: url(../assets/images/cur/measure.cur), auto;\n}\n\n/*--------tooltip----------------*/\n.twipsy {\n  display: block;\n  position: absolute;\n  visibility: visible;\n  max-width: 300px;\n  min-width: 100px;\n  padding: 5px;\n  font-size: 11px;\n  z-index: 1000;\n  opacity: 0.8;\n  -khtml-opacity: 0.8;\n  -moz-opacity: 0.8;\n  filter: alpha(opacity=80);\n}\n\n.twipsy.left .twipsy-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #000000;\n}\n\n.twipsy.right .twipsy-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-right: 5px solid #000000;\n}\n\n.twipsy-inner {\n  padding: 3px 8px;\n  background-color: #000000;\n  color: white;\n  text-align: center;\n  max-width: 300px;\n  text-decoration: none;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n}\n\n.twipsy-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n}\n\n/*--------tooltip end------------*/\ni {\n  cursor: pointer;\n}\n\n.sm-panel {\n  border-radius: 4px;\n  box-shadow: 2px 2px 6px rgba(26, 26, 26, 0.5);\n  background-color: rgb(249, 249, 249);\n  color: #000;\n  padding: 0 15px 15px;\n  box-sizing: border-box;\n  position: absolute;\n  right: 50%;\n  top: 10%;\n  /* font-size: 14px; */\n}\n\n.sm-global-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n}\n.sm-global-row span {\n  font-size: 14px;\n}\n\n.sm-global-input-number {\n  width: 120px;\n}\n\n.sm-global-slider {\n  width: 120px;\n}\n\n.sm-global-color {\n  width: 120px;\n}\n\n.sm-global-select {\n  width: 120px;\n}\n\n.sm-global-button {\n  margin-top: 15px;\n  display: flex;\n  justify-content: flex-end;\n}\n.sm-global-button .ant-btn:nth-child(1) {\n  margin-right: 10px;\n}\n\n.sm-drag-handler {\n  width: 100%;\n  height: 20px;\n  border-bottom: 1px solid #000;\n  margin-bottom: 10px;\n  cursor: move;\n}";
styleInject(css_248z$6);

var css_248z$5 = "button {\n  padding: 0;\n  border-radius: 4px;\n  box-sizing: border-box;\n  background: 0 0;\n  border: 1px solid rgba(153, 153, 153, 0.6);\n  border: none;\n  margin-top: 6px;\n}\n\n.sm-measure-disabled-color {\n  color: #d4d4d4;\n  cursor: none;\n}\n\n.sm-global-row i {\n  font-size: 26px;\n}";
styleInject(css_248z$5);

var Option$3 = antd.Select.Option;

function Sm3dMeasure() {
  // ?????????????????????
  var _useState = React.useState({
    measureMode: 'Space',
    //????????????
    clampMode: SuperMap3D.ClampMode.Space,
    Ellipsoid: null,
    //????????????
    contourColor: '#ff7d00',
    //???????????????
    isShowDVH: false,
    //?????????????????????
    isShowLine: true,
    //???????????????
    pickPointEnabled: true //??????????????????

  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  console.log('measure??????????????????'); // ???????????????

  var layers,
      lineHeight,
      setHypFlag,
      height_0 = 0; // ???

  var _useState3 = React.useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      handlerHeight = _useState4[0],
      setHandlerHeight = _useState4[1]; //  ??????


  var _useState5 = React.useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      handlerArea = _useState6[0],
      setHandlerArea = _useState6[1]; // ??????


  var _useState7 = React.useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      handlerDis = _useState8[0],
      setHandlerDis = _useState8[1]; // ?????????
  // let [isoline, setIsoline] = useState({})
  // ?????????


  var isoline = new SuperMap3D.HypsometricSetting();
  isoline.DisplayMode = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;
  var colorTable = new SuperMap3D.ColorTable();
  isoline._lineColor = SuperMap3D.Color.fromCssColorString(state.contourColor);
  isoline.ColorTable = colorTable;
  isoline.Opacity = 0.6;
  isoline.MaxVisibleValue = -100;
  isoline.MinVisibleValue = -100; // ??????????????????????????????

  var setHypsometricSetting = function setHypsometricSetting() {
    if (!layers) return;

    for (var i = 0; i < layers.length; i++) {
      layers[i].hypsometricSetting = {
        hypsometricSetting: isoline,
        analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
      };
    }

    setHypFlag = true;
  };

  var init = function init() {
    layers = scene.layers && scene.layers.layerQueue;
    scene.globe.HypsometricSetting = {
      hypsometricSetting: isoline,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
    };
    setHypsometricSetting();
    setHandlerDis(new SuperMap3D.MeasureHandler(scene, SuperMap3D.MeasureMode.Distance, state.clampMode));
    setHandlerArea(new SuperMap3D.MeasureHandler(scene, SuperMap3D.MeasureMode.Area, state.clampMode));
    setHandlerHeight(new SuperMap3D.MeasureHandler(scene, SuperMap3D.MeasureMode.DVH));
  };

  var _useState9 = React.useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      initEventTag = _useState10[0],
      setInitEventTag = _useState10[1]; // ?????????


  React.useEffect(function () {
    init();
    setInitEventTag(true);
  }, []);
  React.useEffect(function () {
    if (initEventTag) {
      initeEvent();
      setInitEventTag(false);
    }
  }, [handlerDis, handlerArea, handlerHeight]);

  var initeEvent = function initeEvent() {
    console.log('initEventTag', initEventTag); //?????????????????????

    handlerDis.activeEvt.addEventListener(function (isActive) {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    }); //????????????????????????

    handlerDis.measureEvt.addEventListener(function (result) {
      var dis = Number(result.distance);
      var mode = state.measureMode;

      if (mode == "CGCS2000" || mode == "XIAN80" || mode == "WGS84") {
        dis = Number(calcClampDistance(result.positions));
      }

      var distance = dis > 1000 ? (dis / 1000).toFixed(2) + "km" : dis.toFixed(2) + "m";
      handlerDis.disLabel.text = "??????:" + distance;
    }); //?????????????????????

    handlerArea.activeEvt.addEventListener(function (isActive) {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
    handlerArea.measureEvt.addEventListener(function (result) {
      var mj = Number(result.area);
      var mode = state.measureMode;

      if (mode == "CGCS2000" || mode == "XIAN80" || mode == "WGS84") {
        mj = Number(calcClampValue(result.positions));
      } else if (mode == "6") {
        mj = Number(calcAreaWithoutHeight(result.positions));
      }

      var area = mj > 1000000 ? (mj / 1000000).toFixed(2) + "km??" : mj.toFixed(2) + "???";
      handlerArea.areaLabel.text = "??????:" + area;
    });
    var point1, point2; //?????????????????????

    handlerHeight.measureEvt.addEventListener(function (result) {
      var distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + "km" : (result.distance / 1).toFixed(2) + "m";
      var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + "km" : (result.verticalHeight / 1).toFixed(2) + "m";
      var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + "km" : (result.horizontalDistance / 1).toFixed(2) + "m";
      handlerHeight.disLabel.text = "????????????:" + distance;
      handlerHeight.vLabel.text = "????????????:" + vHeight;
      handlerHeight.vLabel.horizontalOrigin = SuperMap3D.HorizontalOrigin.RIGHT;
      handlerHeight.hLabel.text = "????????????:" + hDistance;
      handlerHeight.hLabel.verticalOrigin = SuperMap3D.VerticalOrigin.BOTTOM; //?????????????????????

      point1 = SuperMap3D.Cartographic.fromCartesian(result.verticalPositions[0]);
      point2 = SuperMap3D.Cartographic.fromCartesian(result.verticalPositions[1]);
      if (point1.height > point2.height) lineHeight = Number(result.verticalHeight) + height_0;else lineHeight = -Number(result.verticalHeight) + height_0;
      if (state.isShowLine) updateContourLine(lineHeight);
    });
    handlerHeight.activeEvt.addEventListener(function (isActive) {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
  }; // ????????????????????????


  React.useEffect(function () {
    scene.pickPointEnabled = state.pickPointEnabled;
  }, [state.pickPointEnabled]);

  var handleChange = function handleChange(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      measureMode: value
    }));
  };

  React.useEffect(function () {
    var value = state.measureMode;

    if (value === "Space") {
      setState(_objectSpread2(_objectSpread2({}, state), {}, {
        clampMode: SuperMap3D.ClampMode.Space
      }));
      handlerArea.clampMode = SuperMap3D.ClampMode.Space;
      handlerDis.clampMode = SuperMap3D.ClampMode.Space;
    } else {
      setState(_objectSpread2(_objectSpread2({}, state), {}, {
        clampMode: SuperMap3D.ClampMode.Ground
      }));
      handlerArea.clampMode = SuperMap3D.ClampMode.Ground;
      handlerDis.clampMode = SuperMap3D.ClampMode.Ground;
    }

    if (value === "XIAN80") {
      setState(_objectSpread2(_objectSpread2({}, state), {}, {
        Ellipsoid: SuperMap3D.Ellipsoid.XIAN80
      }));
    } else if (value === "CGCS2000") {
      setState(_objectSpread2(_objectSpread2({}, state), {}, {
        Ellipsoid: SuperMap3D.Ellipsoid.CGCS2000
      }));
    } else if (value === "WGS84") {
      setState(_objectSpread2(_objectSpread2({}, state), {}, {
        Ellipsoid: SuperMap3D.Ellipsoid.WGS84
      }));
    } else {
      setState(_objectSpread2(_objectSpread2({}, state), {}, {
        Ellipsoid: null
      }));
    }

    console.log('state.measureMode???useEffect', state);
  }, [state.measureMode]); // ??????
  //??????????????????

  var calcClampDistance = function calcClampDistance(positions) {
    var lonlat = [];

    for (var i = 0; i < positions.length; i++) {
      var cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      var lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      var lat = SuperMap3D.Math.toDegrees(cartographic.latitude);
      lonlat.push(lon, lat);
    }

    var gemetry = new SuperMap3D.PolylineGeometry({
      positions: SuperMap3D.Cartesian3.fromDegreesArray(lonlat)
    });
    return scene.globe.computeSurfaceDistance(gemetry, state.Ellipsoid);
  }; //??????????????????


  var calcClampValue = function calcClampValue(positions) {
    var lonlat = [];

    for (var i = 0; i < positions.length; i++) {
      var cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      var lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      var lat = SuperMap3D.Math.toDegrees(cartographic.latitude);
      lonlat.push(lon, lat);
    }

    var gemetry = new SuperMap3D.PolygonGeometry.fromPositions({
      positions: SuperMap3D.Cartesian3.fromDegreesArray(lonlat)
    });
    return scene.globe.computeSurfaceArea(gemetry, state.Ellipsoid);
  }; //????????????


  var calcAreaWithoutHeight = function calcAreaWithoutHeight(positions) {
    var totalLon = 0;

    for (var i = 0; i < positions.length; i++) {
      var cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      var lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      totalLon += lon;
    }

    var dh = Math.round((totalLon / positions.length + 6) / 6); //??????

    var centralMeridian = dh * 6 - 3; //????????????

    var projection = new SuperMap3D.CustomProjection({
      name: "tmerc",
      centralMeridian: centralMeridian,
      primeMeridian: 0,
      standardParallel_1: 0,
      standardParallel_2: 0,
      eastFalse: 500000.0,
      northFalse: 0.0,
      semimajorAxis: 6378137,
      inverseFlattening: 298.257222101
    });
    var cartesians = [];

    for (var _i = 0; _i < positions.length; _i++) {
      var _cartographic = SuperMap3D.Cartographic.fromCartesian(positions[_i]);

      var cartesian = projection.project(_cartographic);
      cartesians.push(cartesian);
    }

    cartesians.push(cartesians[0]); //????????????

    var value = SuperMap3D.getPreciseArea(cartesians, "China2000", centralMeridian, dh, 1);
    return value;
  }; //   ???????????????


  var updateContourLine = function updateContourLine(height) {
    scene.globe.HypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
    scene.globe.HypsometricSetting.hypsometricSetting.MinVisibleValue = height;
    if (!setHypFlag) return;

    for (var i = 0; i < layers.length; i++) {
      if (layers[i].hypsometricSetting.hypsometricSetting) {
        layers[i].hypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
        layers[i].hypsometricSetting.hypsometricSetting.MinVisibleValue = height;
      } else {
        setHypsometricSetting();
      }
    }
  };

  var distanceClk = function distanceClk() {
    deactiveAll();
    handlerDis && handlerDis.activate();
  };

  var areaClk = function areaClk() {
    console.log('areaClk??????state', state);
    console.log('handlerArea', handlerArea);
    deactiveAll();
    handlerArea && handlerArea.activate();
  };

  var heightClk = function heightClk() {
    if (!setHypFlag) setHypsometricSetting();
    clearLine(); //????????????????????????

    scene.eventManager.addEventListener("CLICK", measureHeightClk, true);
    deactiveAll();
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      isShowDVH: true
    })); // state.isShowDVH = true;

    handlerHeight && handlerHeight.activate();
  };

  var measureHeightClk = function measureHeightClk(e) {
    var position = scene.pickPosition(e.message.position);
    var p = tool$1.CartesiantoDegrees(position); // ??????????????????????????????????????????

    height_0 = p[2];
  }; // ??????


  var clearAll = function clearAll() {
    deactiveAll();
    handlerDis && handlerDis.clear();
    handlerArea && handlerArea.clear();
    handlerHeight && handlerHeight.clear();
    clearLine();
  }; //   ???????????????


  var clearLine = function clearLine() {
    updateContourLine(-10000);
    scene.eventManager.removeEventListener("CLICK", measureHeightClk); //??????????????????????????????
  };

  var deactiveAll = function deactiveAll() {
    if (!handlerDis) init();
    handlerDis && handlerDis.deactivate();
    handlerArea && handlerArea.deactivate();
    handlerHeight && handlerHeight.deactivate();
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      isShowDVH: false,
      Ellipsoid: null
    })); // state.isShowDVH = false;
    // state.Ellipsoid = null;

    lineHeight = -10000;
  };

  var clear = function clear() {
    clearAll();
    scene.pickPointEnabled = false;
  };

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel",
    style: {
      width: '200px'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sm-global-row-title"
  }, "\u6A21\u5F0F"), /*#__PURE__*/React__default["default"].createElement(antd.Select, {
    className: "sm-global-select",
    defaultValue: "Space",
    onChange: handleChange
  }, /*#__PURE__*/React__default["default"].createElement(Option$3, {
    value: "Space"
  }, "\u7A7A\u95F4\u91CF\u7B97"), /*#__PURE__*/React__default["default"].createElement(Option$3, {
    value: "Ground"
  }, "\u8D34\u5730\u91CF\u7B97"), /*#__PURE__*/React__default["default"].createElement(Option$3, {
    value: "CGCS2000"
  }, "CGCS2000"), /*#__PURE__*/React__default["default"].createElement(Option$3, {
    value: "XIAN80"
  }, "XIAN80"), /*#__PURE__*/React__default["default"].createElement(Option$3, {
    value: "WGS84"
  }, "WGS84"), /*#__PURE__*/React__default["default"].createElement(Option$3, {
    value: "Plane"
  }, "\u5E73\u9762\u6295\u5F71"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: distanceClk,
    disabled: state.measureMode === 'Plane',
    className: state.measureMode === 'Plane' ? 'sm-measure-disabled-color' : ''
  }, /*#__PURE__*/React__default["default"].createElement("i", {
    className: "iconfont iconkongjianjuli",
    title: "\u6D4B\u8DDD"
  })), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: heightClk,
    disabled: state.measureMode != 'Space' && state.measureMode != 'Ground',
    className: state.measureMode != 'Space' && state.measureMode != 'Ground' ? 'sm-measure-disabled-color' : ''
  }, /*#__PURE__*/React__default["default"].createElement("i", {
    className: "iconfont icongaoduceliang",
    title: "\u6D4B\u9AD8"
  })), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: areaClk
  }, /*#__PURE__*/React__default["default"].createElement("i", {
    className: "iconfont iconkongjianmianji",
    title: "\u6D4B\u9762"
  }, " ")), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: clear
  }, /*#__PURE__*/React__default["default"].createElement("i", {
    className: "iconfont iconqingchu",
    title: "\u6E05\u9664"
  })))));
}

var css_248z$4 = "";
styleInject(css_248z$4);

function Sm3dSightline() {
  // ?????????????????????
  var _useState = React.useState({
    viewPosition: null,
    visibleColor: "#00C800",
    hiddenColor: "#C80000",
    barrierColor: "#FFBA01",
    highlightBarrier: false,
    lineWidth: 3,
    showBarrierPoints: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // 


  var _useState3 = React.useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      sightline = _useState4[0],
      setSightLine = _useState4[1]; // ???????????????


  var timer,
      clickFlag = false,
      ObjectIds = [];
  var point_index = 0,
      sightTargetPoints = [],
      sightBarrierPoints = [],
      sightBarrierPointsColor = [];
  var viewPointPosition;

  var init = function init() {
    var sightlineTem;
    sightlineTem = new SuperMap3D.Sightline(scene);
    sightlineTem.visibleColor = SuperMap3D.Color.fromCssColorString(state.visibleColor);
    sightlineTem.hiddenColor = SuperMap3D.Color.fromCssColorString(state.hiddenColor);
    sightlineTem.lineWidth = state.lineWidth;
    setSightLine(sightlineTem);
  }; //viewer ????????????????????????
  // useSelector(state => {
  //   if (state?.isViewer) {
  //     console.log('????????? init');
  //     init()
  //   }
  // })


  React.useEffect(function () {
    init();
  }, []);
  /*
   ***????????????***
  */
  //??????

  var analysis = function analysis() {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur"); //????????????????????????

    scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
    scene.eventManager.addEventListener("MOUSE_MOVE", MOUSE_MOVE);
    scene.eventManager.addEventListener("RIGHT_CLICK", RIGHT_CLICK, true);
  }; //   ??????????????????????????????????????????


  var LEFT_CLICK = function LEFT_CLICK(e) {
    clickFlag = true;
    clearTimeout(timer);
    timer = setTimeout(function () {
      clickFlag = false;
    }, 20); //???????????????????????????????????????

    var position = scene.pickPosition(e.message.position);
    var p = tool$1.CartesiantoDegrees(position); // ??????????????????????????????????????????

    if (p[2] < 0) {
      p[2] = 0;
      position = SuperMap3D.Cartesian3.fromDegrees(p[0], p[1], p[2]);
    }

    if (state.viewPosition) {
      sightline.addTargetPoint({
        position: p,
        name: "sightPoint_Target" + point_index
      });
      sightTargetPoints.push(position);
      point_index += 1; // ???????????????

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          sightline.getBarrierPoint('sightPoint_Target' + point_index, function (obj) {
            addSightPoint_Target(point_index); //??????????????? 

            if (obj && obj.position) {
              obj.position.height += 2;

              var _position = SuperMap3D.Cartographic.toCartesian(obj.position);

              sightBarrierPoints.push(_position); //?????????????????????
              // ???????????????id

              var ObjectId = sightline.getObjectIds();

              if (!ObjectId) {
                return;
              }

              ObjectIds.push(ObjectId);
              sightBarrierPointsColor.push(state.hiddenColor);
            } else {
              sightBarrierPoints.push({
                x: 6378137,
                y: 0,
                z: 0
              });
              sightBarrierPointsColor.push(state.visibleColor);
            }

            addBarrierCone(point_index); //???????????????
          });
        });
      });
    } else {
      sightline.viewPosition = p; // ?????????????????????

      state.viewPosition = p;
      sightline.build();
      addSightPoint_view();
      viewPointPosition = position;
    }
  }; // ???????????????


  var addSightPoint_view = function addSightPoint_view() {
    scene.trackingLayer.add({
      id: 'sightPoint_view',
      point: new SuperMap3D.PointGraphics({
        color: SuperMap3D.Color.fromCssColorString(state.barrierColor),
        pixelSize: 10
      }),
      position: new SuperMap3D.CallbackProperty(function () {
        return viewPointPosition;
      }, false)
    });
  };

  var addSightPoint_Target = function addSightPoint_Target(i) {
    scene.trackingLayer.add({
      id: 'sightPoint_Target' + i,
      point: new SuperMap3D.PointGraphics({
        // color: SuperMap3D.Color.fromCssColorString(state.barrierColor),
        color: new SuperMap3D.CallbackProperty(function () {
          return SuperMap3D.Color.fromCssColorString(sightBarrierPointsColor[i]);
        }, false),
        pixelSize: 10
      }),
      position: new SuperMap3D.CallbackProperty(function () {
        return sightTargetPoints[i];
      }, false)
    });
  }; // ?????????????????????

  var addBarrierCone = function addBarrierCone(i) {
    scene.trackingLayer.add({
      name: 'Point_Barrier' + i,
      position: new SuperMap3D.CallbackProperty(function () {
        return sightBarrierPoints[i];
      }, false),
      // orientation: SuperMap3D.Transforms.headingPitchRollQuaternion(sightBarrierPoints[i], new SuperMap3D.HeadingPitchRoll(0, 0, Math.PI)),
      cylinder: {
        length: 3,
        topRadius: 2,
        bottomRadius: 0,
        material: SuperMap3D.Color.fromCssColorString("#d60000")
      }
    });
  }; // ????????????????????????


  var MOUSE_MOVE = function MOUSE_MOVE(e) {
    if (!state.viewPosition || clickFlag) return; //????????????????????????,?????????????????????????????????

    var endPosition = scene.pickPosition(e.message.endPosition);
    var p = tool$1.CartesiantoDegrees(endPosition); // ??????????????????????????????????????????

    sightline.addTargetPoint({
      position: p,
      name: "point"
    });
  }; // //????????????????????????????????????????????????????????????????????????????????????????????????


  var RIGHT_CLICK = function RIGHT_CLICK() {
    document.body.classList.remove("measureCur");

    if (state.highlightBarrier) {
      getHighlightBarriers();
    }

    sightline.removeTargetPoint('point');
    sightline.build();
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //??????????????????????????????

    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE); //??????????????????????????????

    scene.eventManager.removeEventListener("RIGHT_CLICK", RIGHT_CLICK); //??????????????????????????????
  }; // ???????????????


  var getHighlightBarriers = function getHighlightBarriers(barrierColor) {
    var color = SuperMap3D.defaultValue(barrierColor, SuperMap3D.Color.fromCssColorString(state.barrierColor));

    try {
      if (ObjectIds.length === 0) return;
      ObjectIds.forEach(function (ObjectId) {
        for (var index in ObjectId) {
          var layer = scene.layers.findByIndex(Number(index) - 3); // ???????????????3??????

          var ids = ObjectId[index];
          layer.setObjsColor(ids, color);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }; // ??????


  var clear = function clear() {
    sightline.removeAllTargetPoint();

    var _iterator = _createForOfIteratorHelper(scene.layers.layerQueue),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var layer = _step.value;
        layer.removeAllObjsColor();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    point_index = 0;
    ObjectIds.length = 0;
    sightTargetPoints.length = 0;
    sightBarrierPoints.length = 0;
    sightBarrierPointsColor.length = 0;
    scene.trackingLayer.removeAll();
    document.body.classList.remove("measureCur");
    state.viewPosition = null;
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //??????????????????????????????

    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE); //??????????????????????????????

    scene.eventManager.removeEventListener("RIGHT_CLICK", RIGHT_CLICK); //??????????????????????????????
  }; // ??????
  // ???????????????


  var onLineWidthChange = function onLineWidthChange(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      lineWidth: value
    }));
    sightline.lineWidth = value;
  }; // ?????????????????????


  var onVisibleColorChange = function onVisibleColorChange(e) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      visibleColor: e.target.value
    }));
    sightline.visibleColor = SuperMap3D.Color.fromCssColorString(e.target.value);
  }; // ?????????????????????


  var onHiddenColor = function onHiddenColor(e) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      hiddenColor: e.target.value
    }));
    sightline.hiddenColor = SuperMap3D.Color.fromCssColorString(e.target.value);
  };

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel",
    style: {
      width: '270px'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sm-title"
  }, "\u7EBF\u5BBD\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 1,
    max: 10,
    step: 1,
    value: state.lineWidth,
    onChange: onLineWidthChange
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u53EF\u89C6\u533A\u989C\u8272"), /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sm-global-color",
    type: "color",
    value: state.visibleColor,
    onChange: onVisibleColorChange
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u4E0D\u53EF\u89C6\u989C\u8272"), /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sm-global-color",
    type: "color",
    value: state.hiddenColor,
    onChange: onHiddenColor
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: analysis
  }, "\u5206\u6790"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clear
  }, "\u6E05\u9664"))));
}

// ??????????????????????????????????????????????????????
var currentLanguage;
var cookieLanguage = getLang().toLowerCase();

function getLang() {
  //???????????????  IE???browserLanguage??????IE??????language????????????
  var lang = (navigator.language || navigator.browserLanguage).toLowerCase();
  window.lang = lang; //??????portal???????????? ??????cookie??????
  //   const cookies = document.cookie.split(';');
  //   if (cookies.length > 0) {
  //     cookies.forEach(function (cookie) {
  //       const arr = cookie.split('=');
  //       if (arr[0].toLowerCase().trim() === 'language') {
  //         lang = arr[1];
  //         return;
  //       }
  //     });
  //   }

  return lang;
}

if (cookieLanguage !== undefined) {
  currentLanguage = cookieLanguage;
} else {
  currentLanguage = (navigator.language || navigator.browserLanguage).toLowerCase(); // ??????????????????????????????
}

if (currentLanguage.startsWith('zh')) ; else if (currentLanguage.startsWith('ja')) ; else ;

/**
 * ?????????
 * DrawMode?????????
 * clampMode?????????
 */

var initHandler = function initHandler(DrawMode, clampMode) {
  var clampmode = 0;

  if (clampMode) {
    clampmode = clampMode;
  }

  switch (DrawMode) {
    case "Point":
      window.handlerPoint = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Point);
      break;

    case "Polyline":
      window.handlerPolyline = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Line, clampmode);
      break;

    case "Polygon":
      window.handlerPolygon = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Polygon, clampmode);
      break;

    case "Marker":
      window.handlerMarker = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Marker, clampmode);
      break;

    case "Box":
      window.handlerBox = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box, clampmode);
      break;
  }
  //     window.tooltip = createTooltip(scene._element);
  // }
  // ???????????????

  if (!window.polylineCollection) {
    window.polylineCollection = new SuperMap3D.PolylineCollection({
      translucentRS: SuperMap3D.RenderState.fromCache({
        depthMask: false,
        depthTest: {
          enabled: false
        }
      })
    });
    window.polylineTransparent = window.polylineCollection.add({
      width: 2,
      material: SuperMap3D.Material.fromType(SuperMap3D.Material.ColorType, {
        color: SuperMap3D.Color.fromCssColorString("#51ff00").withAlpha(0.3)
      })
    });
    scene.primitives.add(window.polylineCollection);
  }
};
/**
 * ??????
 * PolyType????????? 
 * lineVisib????????????????????????????????????boolean???
 * toolTipObj????????????????????????{beforeDrawing????????????????????????(string)???isDrawing????????????????????????,?????????????????????string???}
 */


var handlerDrawing = function handlerDrawing(PolyType, lineVisib, toolTipObj) {
  var lineVisible = true;

  if (lineVisib === false) {
    lineVisible = lineVisib;
  }

  var DrawHandler = judgeDrawHandlerType(PolyType); //??????????????????

  return new Promise(function (resolve, reject) {
    //?????????????????????
    // let tooltip = window.tooltip;
    var clearActFn = DrawHandler.activeEvt.addEventListener(function (isActive) {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = '';

        if (PolyType == "Point" || PolyType == "Marker") {
          document.body.classList.add("measureCur");
        } else {
          document.body.classList.add("drawCur");
        }
      } else {
        scene.enableCursorStyle = true; // tooltip.setVisible(false);

        if (PolyType == "Point" || PolyType == "Marker") {
          document.body.classList.remove('measureCur');
        } else {
          document.body.classList.remove('drawCur');
        }
      }
    });
    var clearMovFn = DrawHandler.movingEvt.addEventListener(function (windowPosition) {
      if (windowPosition.x < 200 && windowPosition.y < 150) {
        // tooltip.setVisible(false);
        return;
      }
      //     tooltip.showAt(windowPosition, tiptext);
      // } else if (toolTipObj && toolTipObj.beforeDrawing) {
      //     tooltip.showAt(windowPosition, toolTipObj.beforeDrawing);
      // }else if (DrawHandler.isDrawing && toolTipObj.isDrawing) {
      //     tooltip.showAt(windowPosition, toolTipObj.isDrawing);
      // }

      if (DrawHandler.polyline && DrawHandler.isDrawing) {
        var p = _toConsumableArray(DrawHandler.polyline.positions);

        if (PolyType == "Polygon") {
          //??????????????????????????????
          p.push(p[0]);
        }
        window.polylineTransparent.show = true;
        window.polylineTransparent.positions = p;
      }
    });
    var clearDrawFn = DrawHandler.drawEvt.addEventListener(function (result) {
      if (!result.object.positions && PolyType != "Point" && PolyType != "Box") {
        // tooltip.showAt(result, '<p>???????????????????????????</p>');
        DrawHandler.polygon.show = false;
        DrawHandler.polyline.show = false;
        DrawHandler.deactivate();
        DrawHandler.activate();
        return;
      }

      if (PolyType == "Box") {
        resolve({
          result: result
        });
        return;
      }

      if (PolyType == "Point" || PolyType == "Marker") {
        DrawHandler.clear(); // ?????????????????????

        resolve({
          result: result
        });
      } else {
        //?????????
        window.polylineTransparent.show = lineVisible;

        if (lineVisible) {
          if (PolyType == "Polygon" && lineVisible) {
            DrawHandler.polygon._polygon._material._color._value.alpha = 0.1; //??????????????????

            var p2 = _toConsumableArray(result.object.positions); //??????????????????????????????


            p2.push(p2[0]);
            window.polylineTransparent.positions = p2;
          }
        }

        var positions = CartesiantoDegrees(result.object.positions);
        resolve({
          result: result,
          positions: positions
        });
      }

      clearActFn();
      clearMovFn();
      clearDrawFn();
    });
  });
}; //??????


var clearHandlerDrawing = function clearHandlerDrawing(PolyType) {
  var DrawHandler;

  if (!PolyType) {
    DrawHandler = window.handlerPolygon;
  } else {
    DrawHandler = judgeDrawHandlerType(PolyType);
  }
  if (!DrawHandler) return;
  DrawHandler.deactivate();
  DrawHandler.clear();
  scene.enableCursorStyle = true; // document.body.classList.remove("drawCur");
  // document.body.classList.remove("measureCur");
  // window.tooltip.setVisible(false);

  if (window.polylineTransparent) {
    window.polylineTransparent.show = false;
  }
}; // ????????????


var judgeDrawHandlerType = function judgeDrawHandlerType(PolyType) {
  var DrawHandler;

  switch (PolyType) {
    case "Point":
      DrawHandler = window.handlerPoint;
      break;

    case "Polyline":
      DrawHandler = window.handlerPolyline;
      break;

    case "Polygon":
      DrawHandler = window.handlerPolygon;
      break;

    case "Marker":
      DrawHandler = window.handlerMarker;
      break;

    case "Box":
      DrawHandler = window.handlerBox;
      break;
  }

  return DrawHandler;
}; // export default {

var css_248z$3 = "";
styleInject(css_248z$3);

function Sm3dViewshed() {
  // ?????????????????????
  var _useState = React.useState({
    viewshedSpatialUrl: "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/viewshedbody.json",
    observerInformation: null,
    //???????????????
    direction: 1.0,
    //??????
    pitch: 1.0,
    //????????????
    addheight: 1.8,
    //????????????
    distance: 200,
    //??????
    verticalFov: 60,
    //  ????????????
    horizontalFov: 90,
    //????????????
    hintLineColor: "#D4CA2D",
    //???????????????
    visibleAreaColor: "#09C770",
    //??????????????????
    hiddenAreaColor: "#EE7216",
    //?????????????????????
    visibleBodyColor: "#09C770",
    //??????????????????
    invisibleBodyColor: "#EE7216",
    //?????????????????????
    visibleBody: true,
    //??????????????????
    invisibleBody: true,
    //?????????????????????
    viewshedAnimation: true,
    //????????????
    DynamicLine: [],
    //?????????
    DynamicSpeed: 10 //????????????????????????

  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // ???????????????


  var handler, s3mInstanceColc, startPosition;
  var Carurls = ['public/data/s3m/car1.s3m'],
      timers;
  React.useEffect(function () {
    init();
  }, []);

  var _useState3 = React.useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      viewshed3D = _useState4[0],
      setViewshed3D = _useState4[1];

  var _useState5 = React.useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      dynamicLayer3D = _useState6[0],
      setDynamicLayer3D = _useState6[1];

  var init = function init() {
    var viewshed3DTem = new SuperMap3D.ViewShed3D(scene);
    handler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
    viewshed3DTem.hintLineColor = SuperMap3D.Color.fromCssColorString(state.hintLineColor);
    viewshed3DTem.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
    viewshed3DTem.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
    setViewshed3D(viewshed3DTem);
    s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
    scene.primitives.add(s3mInstanceColc);
    var dynamicLayer3DTem = new SuperMap3D.DynamicLayer3D(scene.context, Carurls);
    dynamicLayer3DTem.updateInterval = 100;
    dynamicLayer3DTem.setCullEnabled(Carurls[0], SuperMap3D.CullFace.BACK);
    dynamicLayer3DTem.maxVisibleAltitude = 2000;
    dynamicLayer3DTem.minVisibleAltitude = 0;
    setDynamicLayer3D(dynamicLayer3DTem);
    scene.primitives.add(dynamicLayer3DTem);
  };
  /*
   ***????????????***
  */
  //??????


  var analysis = function analysis() {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");

    if (state.viewshedAnimation) {
      if (timers) {
        clear();
        state.viewshedAnimation = true;
        document.body.classList.add("measureCur");
      }

      handlerPolyline();
    } else {
      LEFT_CLICK();
    }
  }; //   ??????????????????????????????


  var LEFT_CLICK = function LEFT_CLICK() {
    s3mInstanceColc.removeCollection("VeiwshedBody");
    s3mInstanceColc.removeCollection("VeiwshedBodyHidden");
    viewshed3D.distance = 0.00001;
    viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
    viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
    handler.setInputAction(function (e) {
      var position = scene.pickPosition(e.position);
      startPosition = position; //????????????????????????????????????

      var p = tool$1.CartesiantoDegrees(position); // ??????????????????????????????????????????

      p[2] += Number(state.addheight); //??????????????????

      viewshed3D.viewPosition = p;
      viewshed3D.build(); // ?????????????????????

      state.observerInformation = p;
      document.body.classList.remove("measureCur");
      removeInputAction('LEFT_CLICK');
      MOUSE_MOVE();
      RIGHT_CLICK(); // ??????????????????

      var p2 = SuperMap3D.Cartesian3.fromDegrees(p[0], p[1], p[2]);
      addPoint(p2);
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
  };

  var addPoint = function addPoint(p) {
    scene.trackingLayer.removeById('viewshedPoint');
    scene.trackingLayer.add({
      id: 'viewshedPoint',
      point: new SuperMap3D.PointGraphics({
        color: colorUpdate(state.hiddenAreaColor),
        pixelSize: 8
      }),
      position: p
    });
  }; // ????????????????????????


  var MOUSE_MOVE = function MOUSE_MOVE() {
    handler.setInputAction(function (e) {
      // tooltip.setVisible(false);
      //????????????????????????,?????????????????????????????????
      var position = e.endPosition;
      var endPosition = scene.pickPosition(position); //?????????????????????????????????????????????

      var distance = SuperMap3D.Cartesian3.distance(startPosition, endPosition);

      if (distance > 0) {
        var p2 = tool$1.CartesiantoDegrees(endPosition); // ??????????????????????????????????????????
        // ?????????????????????????????????????????????????????????

        viewshed3D.setDistDirByPoint(p2);
      }
    }, SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
  }; // //????????????????????????????????????????????????????????????????????????????????????????????????


  var RIGHT_CLICK = function RIGHT_CLICK() {
    handler.setInputAction(function (e) {
      state.direction = viewshed3D.direction.toFixed(2);
      state.pitch = viewshed3D.pitch.toFixed(2);
      state.distance = viewshed3D.distance.toFixed(2);
      state.horizontalFov = viewshed3D.horizontalFov;
      state.verticalFov = viewshed3D.verticalFov;
      tooltip.setVisible(false);
      removeInputAction('MOUSE_MOVE');
      removeInputAction('RIGHT_CLICK');
    }, SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
  }; //??????????????????


  var removeInputAction = function removeInputAction(type) {
    switch (type) {
      case 'LEFT_CLICK':
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
        break;

      case 'MOUSE_MOVE':
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
        break;

      case 'RIGHT_CLICK':
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
        break;

      case 'ALL':
      default:
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
        break;
    }
  }; // ??????


  var clear = function clear() {
    clearViewshed();
    dynamicLayer3D.clearState(Carurls[0], [1]);
    clearInterval(timers);
    timers = null;
    state.viewshedAnimation = false;
    clearHandlerDrawing("Polyline");
  };

  var clearViewshed = function clearViewshed() {
    tooltip.setVisible(false);
    scene.trackingLayer.removeById('viewshedPoint');
    document.body.classList.remove("measureCur");
    viewshed3D.distance = 0.00001;
    viewshed3D.viewPosition = [0, 0, 0];
    state.visibleBody = false;
    state.invisibleBody = false;
    state.observerInformation = null;
  };
  /*
  ?????????????????????
  */
  //????????????


  var handlerPolyline = function handlerPolyline() {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    } // if (props.DynamicLine) {  //??????????????????,???????????????????????????
    //   setCarState();
    //   return;
    // }


    handlerDrawing("Polyline", SuperMap3D.ClampMode.Ground).then(function (res) {
      var handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false;
      window.polylineTransparent.show = true; //???????????????

      handlerPolyline.deactivate();
      state.DynamicLine = res.result.object._positions;
      tooltip.setVisible(false);

      if (state.DynamicLine.length < 2) {
        tool$1.Message.warnMsg('????????????????????????');
        return;
      }
      setCarState();
    }, function (err) {
      console.log(err);
    });
    window.handlerPolyline.activate();
  }; // ?????????????????????????????????


  var setCarState = function setCarState() {
    viewshed3D.distance = state.distance;
    viewshed3D.build();
    var points = state.DynamicLine;
    var points2 = [];

    for (var i = 1, j = points.length; i < j; i++) {
      var startPoint = points[i - 1];
      var endPoint = points[i];
      var d = SuperMap3D.Cartesian3.distance(startPoint, endPoint);
      var count = parseInt(d / (state.DynamicSpeed * 0.05)) + 1;

      for (var _i = 1, _j = count; _i <= _j; _i++) {
        points2.push(SuperMap3D.Cartesian3.lerp(startPoint, endPoint, _i / count, new SuperMap3D.Cartesian3()));
      }
    }

    var positions = tool$1.CartesiantoDegreesObjs(points2);
    var CarState = new SuperMap3D.DynamicObjectState({
      id: 1,
      longitude: positions[0].longitude,
      latitude: positions[0].latitude,
      altitude: positions[0].height,
      scale: new SuperMap3D.Cartesian3(1, 1, 1)
    });
    dynamicLayer3D.updateObjectWithModel(Carurls[0], [CarState]);
    var index = 1;
    timers = setInterval(function () {
      if (index >= positions.length) {
        clearInterval(timers);
        return;
      }

      CarState.longitude = positions[index].longitude;
      CarState.latitude = positions[index].latitude;
      CarState.altitude = positions[index].height;
      dynamicLayer3D.updateObjectWithModel(Carurls[0], [CarState]);
      var getAngleAndRadian = tool$1.getAngleAndRadian(points2[index - 1], points2[index]);
      viewshed3D.direction = getAngleAndRadian.angle;
      viewshed3D.viewPosition = [CarState.longitude, CarState.latitude, CarState.altitude + Number(state.addheight)];
      index += 1;
    }, 50);
  }; // ????????????


  var changAddheight = function changAddheight(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      addheight: value
    }));
    console.log('state.observerInformation', state.observerInformation); // if (state.observerInformation) {
    //   setState({
    //     ...state,
    //     observerInformation[2] += value
    //   })
    //   viewshed3D.viewPosition = state.observerInformation
    // }
    //   if (state.observerInformation) {
    //     state.observerInformation[2] += parseFloat(val);
    //     viewshed3D.viewPosition = state.observerInformation;
    //   }
  }; // ????????????


  var changeVerticalFov = function changeVerticalFov(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      verticalFov: parseFloat(value)
    }));
    viewshed3D.verticalFov = parseFloat(value);
  }; // ????????????


  var changeHorizontalFov = function changeHorizontalFov(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      horizontalFov: parseFloat(value)
    }));
    viewshed3D.horizontalFov = parseFloat(value);
  }; // ???????????????


  var changeHintLineColor = function changeHintLineColor(e) {
    var value = e.target.value;
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      hintLineColor: value
    }));
    viewshed3D.hintLineColor = colorUpdate(value);
  }; // ???????????????


  var changeVisibleAreaColor = function changeVisibleAreaColor(e) {
    var value = e.target.value;
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      visibleAreaColor: value
    }));
    viewshed3D.visibleAreaColor = colorUpdate(value);
  }; // ???????????????


  var changeHiddenAreaColor = function changeHiddenAreaColor(e) {
    var value = e.target.value;
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      hiddenAreaColor: value
    }));
    viewshed3D.hiddenAreaColor = colorUpdate(value);
  };

  var colorUpdate = function colorUpdate(val) {
    if (val == "") return;
    return SuperMap3D.Color.fromCssColorString(val);
  };

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u9644\u52A0\u9AD8\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 1,
    max: 10,
    step: 0.1,
    value: state.addheight,
    onChange: changAddheight
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5782\u76F4\u89C6\u89D2"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 1,
    max: 179,
    value: state.verticalFov,
    onChange: changeVerticalFov
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u6C34\u5E73\u89C6\u89D2"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 1,
    max: 179,
    value: state.horizontalFov,
    onChange: changeHorizontalFov
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u63D0\u793A\u7EBF\u989C\u8272"), /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sm-global-color",
    type: "color",
    value: state.hintLineColor,
    onChange: changeHintLineColor
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u53EF\u89C6\u533A\u989C\u8272"), /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sm-global-color",
    type: "color",
    "v-model": "visibleAreaColor",
    value: state.visibleAreaColor,
    onChange: changeVisibleAreaColor
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u9690\u85CF\u533A\u989C\u8272"), /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sm-global-color",
    type: "color",
    value: state.hiddenAreaColor,
    onChange: changeHiddenAreaColor
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: analysis
  }, "\u5206\u6790"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clear
  }, " \u6E05\u9664"))));
}

var css_248z$2 = ".sm-panel {\n  width: 250px;\n}";
styleInject(css_248z$2);

function Sm3dTerrainFlood() {
  // ?????????????????????
  var _useState = React.useState({
    maxHeight: 9000,
    //??????????????????
    minHeight: 1000,
    //??????????????????
    floodHeight: [1000, 9000],
    currentHeight: 1000,
    //????????????
    floodTrans: 0.8,
    //?????????
    cheackedBand: 'band1',
    //??????????????????
    colorBandShow: false,
    //?????????????????????
    floodSpeed: 800,
    //??????
    floodPositions: [],
    lineVisible: true //?????????????????????

  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // ????????????


  var changeFloodHeight = function changeFloodHeight(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      floodHeight: value,
      currentHeight: value[1],
      maxHeight: value[1]
    }));
  }; // ????????????


  var changeFloodSpeed = function changeFloodSpeed(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      floodSpeed: value
    }));
  }; // ???????????????


  var floodDisplayMode = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE;
  var hypFlood = new SuperMap3D.HypsometricSetting();
  var floodColorTable = new SuperMap3D.ColorTable();
  var colors = tool$1.gradientColors("#95E9F9", "#002794", 20, 0.8); // 0-4500???????????????

  colors.forEach(function (color, index) {
    var h = 500 + 200 * index;
    floodColorTable.insert(h, SuperMap3D.Color.fromCssColorString(color));
  });
  floodColorTable.insert(9000, new SuperMap3D.Color(0, 39 / 255, 148 / 255, 1));
  floodColorTable.insert(0, new SuperMap3D.Color(149 / 255, 232 / 255, 249 / 255, 0.5));
  var interval;
  /*
   ***????????????????????????***
  */
  // ??????

  function floodBegin(e) {
    e.preventDefault();
    hypFlood.DisplayMode = floodDisplayMode;
    hypFlood._lineColor = new SuperMap3D.Color(1.0, 0.0, 0.0, 1.0);
    hypFlood.MinVisibleValue = state.minHeight;
    hypFlood.MaxVisibleValue = 0;
    hypFlood.ColorTableMinKey = 1;
    hypFlood.ColorTableMaxKey = 9000;
    hypFlood.ColorTable = floodColorTable;
    hypFlood.Opacity = state.floodTrans;
    hypFlood.LineInterval = 200.0;

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(function (res) {
      var handlerPolygon = window.handlerPolygon;
      floodUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.deactivate();
    }, function (err) {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool$1.Message.errorMsg(resource.NoPickPositionSupported);
    }
  }

  function floodUpdate(positions) {

    var currentH = state.minHeight;
    hypFlood.CoverageArea = positions;
    interval = setInterval("flood()", 100);

    window.flood = function () {
      if (currentH <= state.maxHeight) {
        setState(_objectSpread2(_objectSpread2({}, state), {}, {
          currentHeight: currentH
        }));
      }

      if (currentH > state.maxHeight) {
        setState(_objectSpread2(_objectSpread2({}, state), {}, {
          currentHeight: state.maxHeight
        }));
        clearInterval(interval);
        return;
      }

      hypFlood.MaxVisibleValue = currentH;

      try {
        scene.globe.HypsometricSetting = {
          hypsometricSetting: hypFlood,
          analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
        };
      } catch (err) {
        clearInterval(interval);
      }
      currentH += parseFloat(state.floodSpeed) / 10;
    };
  }

  function floodClear(e) {
    e.preventDefault();
    if (!window.handlerPolygon) return;
    scene.globe.HypsometricSetting = undefined;
    clearInterval(interval);
    clearHandlerDrawing("Polygon");
  }
  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u53EF\u89C1\u9AD8\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 0,
    max: 9000,
    value: state.floodHeight,
    range: true,
    step: 1,
    onChange: changeFloodHeight
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5F53\u524D\u9AD8\u7A0B"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    className: "sm-global-input-number",
    value: state.currentHeight,
    min: 0,
    disabled: true
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u6DF9\u6CA1\u901F\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 1,
    max: 1000,
    step: 1,
    value: state.floodSpeed,
    onChange: changeFloodSpeed
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: floodBegin
  }, "\u5206\u6790"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: floodClear
  }, "\u6E05\u9664"))));
}

/**
 * ????????????
 * EditPositions?????????????????????????????????????????????????????????array???
 * isEditZ???????????????z???
 * callback?????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????????????????????????????
 */

var Edit$1 = function Edit(EditPositions, isEditZ, callback) {
  if (!window.selectHandler) {
    window.selectHandler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
  }

  var selectHandler = window.selectHandler;

  if (window.handlerPolygon && window.handlerPolygon.polygon) {
    window.handlerPolygon.polygon.show = true;
  }

  selectHandler.setInputAction(function () {
    var entity = scene.selectedEntity;
    var editHandler = window.editHandler;

    if (!entity) {
      if (editHandler) {
        editHandler && editHandler.deactivate();
      }

      return;
    }

    if (!editHandler) {
      window.editHandler = new SuperMap3D.EditHandler(scene, entity);

      if (isEditZ) {
        window.editHandler.isEditZ = isEditZ;
      } else {
        window.editHandler.isEditZ = false;
      }

      window.editHandler.activate();
    } else {
      editHandler.deactivate();
      editHandler.setEditObject(entity);
      editHandler.activate();
    }

    selectHandler.setInputAction(function () {
      entity = scene.selectedEntity;
      editHandler = window.editHandler;

      if (!entity) {
        return;
      }

      if (editHandler && editHandler._positions) {
        var positions = CartesiantoDegrees(editHandler._positions);

        if (isEqualArr(EditPositions, positions)) {
          return;
        } else {
          EditPositions = positions;

          if (callback) {
            callback(positions, window.editHandler);
          }
        }

        if (window.handlerPolygon && window.handlerPolygon.polygon && window.handlerPolygon.polygon.show) {
          var p3 = _toConsumableArray(editHandler._positions);

          p3.push(p3[0]);
          window.polylineTransparent.positions = p3; //?????????
        }
      }
    }, SuperMap3D.ScreenSpaceEventType.LEFT_UP);
  }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
};

var clearEditHandler$1 = function clearEditHandler() {
  if (window.editHandler) {
    window.editHandler.deactivate();
    window.editHandler.clear();
  }

  if (window.selectHandler) {
    //??????????????????????????????
    window.selectHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_UP);
    window.selectHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
    window.selectHandler.destroy();
    window.selectHandler = null;
  }
};

var css_248z$1 = ".sm-panel {\n  width: 250px;\n}";
styleInject(css_248z$1);

var Option$2 = antd.Select.Option;

function Sm3dTerrainIsoline() {
  // ?????????????????????
  var _useState = React.useState({
    fillMaxHeight: 9000,
    //??????????????????
    fillMinHeight: 0,
    //??????????????????
    fillHeight: [0, 9000],
    equivalentIsoline: 100,
    //?????????
    fillOptionsSelected: 'Line',
    //??????????????????
    lineColor: "#FF8040",
    //??????
    isEdit: false,
    //????????????
    isolinePositions: [],
    lineVisible: true //?????????????????????

  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var colorTableInit = function colorTableInit(colorTable) {
    colorTable.insert(5597.06640625, new SuperMap3D.Color(0, 0, 255 / 255));
    colorTable.insert(5406.3873860677086, new SuperMap3D.Color(0, 51 / 255, 255 / 255));
    colorTable.insert(5215.7083658854172, new SuperMap3D.Color(0, 102 / 255, 255 / 255));
    colorTable.insert(5025.0293457031257, new SuperMap3D.Color(0, 153 / 255, 255 / 255));
    colorTable.insert(4834.3503255208343, new SuperMap3D.Color(0, 204 / 255, 255 / 255));
    colorTable.insert(4643.6713053385429, new SuperMap3D.Color(0, 255 / 255, 255 / 255));
    colorTable.insert(4452.9922851562524, new SuperMap3D.Color(51 / 255, 255 / 255, 204 / 255));
    colorTable.insert(4262.3132649739609, new SuperMap3D.Color(102 / 255, 255 / 255, 153 / 255));
    colorTable.insert(4071.6342447916695, new SuperMap3D.Color(153 / 255, 255 / 255, 102 / 255));
    colorTable.insert(3880.9552246093781, new SuperMap3D.Color(204 / 255, 255 / 255, 51 / 255));
    colorTable.insert(3690.2762044270867, new SuperMap3D.Color(255 / 255, 255 / 255, 0));
    colorTable.insert(3499.5971842447952, new SuperMap3D.Color(255 / 255, 204 / 255, 0));
    colorTable.insert(3308.9181640625038, new SuperMap3D.Color(255 / 255, 153 / 255, 0));
    colorTable.insert(3118.2391438802129, new SuperMap3D.Color(255 / 255, 102 / 255, 0));
    colorTable.insert(2927.5601236979214, new SuperMap3D.Color(255 / 255, 51 / 255, 0));
    colorTable.insert(2736.88110351563, new SuperMap3D.Color(255 / 255, 0, 0));
  }; // ???????????????


  var hyp = new SuperMap3D.HypsometricSetting(); // const [DisplayModeHyp, setDisplayModeHyp] = useState()

  var DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE; //????????????

  var colorTable = new SuperMap3D.ColorTable(); //???????????????

  colorTableInit(colorTable);
  var isolinePosition = []; //????????????????????????
  // ????????????

  var changeFillHeight = function changeFillHeight(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      fillHeight: value
    }));
  }; // ??????


  var changeEquivalentIsoline = function changeEquivalentIsoline(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      equivalentIsoline: value
    }));
  };

  var changeFillOptionsSelected = function changeFillOptionsSelected(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      fillOptionsSelected: value
    }));

    switch (value) {
      case "None":
        DisplayModeHyp = undefined;
        break;

      case "Line":
        DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;
        hyp.Opacity = 1;
        break;

      case "Region":
        DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE;
        hyp.Opacity = 0.5;
        break;

      case "Line_Region":
        DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE_AND_LINE;
        hyp.Opacity = 0.5;
        break;
    }

    hyp.DisplayMode = DisplayModeHyp;

    if (isolinePosition.length == 0) {
      return;
    }

    isolineUpdate(isolinePosition);
  };
  /*
   ***?????????????????????***
  */
  // ??????


  var isoLineAnalysis = function isoLineAnalysis(e) {
    e.preventDefault(); //????????????

    hyp.DisplayMode = DisplayModeHyp;
    hyp._lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
    hyp.LineInterval = parseFloat(state.equivalentIsoline);
    hyp.MaxVisibleValue = parseFloat(state.fillMaxHeight);
    hyp.MinVisibleValue = parseFloat(state.fillMinHeight);
    hyp.ColorTableMinKey = 2736.88110351563;
    hyp.ColorTableMaxKey = 5597.06640625;
    hyp.ColorTable = colorTable; // hyp.Opacity = 0.4;

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(function (res) {
      isolinePosition = res.positions;
      var handlerPolygon = window.handlerPolygon; //???????????????????????????

      isolineUpdate(isolinePosition);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (state.isEdit) {
        Edit$1(isolinePosition, false, isolineUpdate);
      }
    }, function (err) {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(resource.NoPickPositionSupported);
    }
  }; // ??????


  var isolineUpdate = function isolineUpdate(p) {
    if (p) {
      isolinePosition = p;
    }

    if (isolinePosition.length == 0) return;

    if (p) {
      hyp.CoverageArea = p;
    }

    scene.globe.HypsometricSetting = {
      hypsometricSetting: hyp,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
  }; // ??????


  var clearIsoLine = function clearIsoLine(e) {
    e.preventDefault();
    isolinePosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.HypsometricSetting = undefined;
    hyp && (hyp.MaxVisibleValue = -1000);
    hyp && (hyp.MinVisibleValue = -1000);
    clearHandlerDrawing("Polygon");
    clearEditHandler$1();
  };

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u53EF\u89C1\u9AD8\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    min: 0,
    value: state.te,
    max: 9000,
    step: 1,
    onChange: changeFillHeight
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u7B49\u503C\u8DDD(\u7C73)"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    className: "sm-global-input-number",
    min: 0,
    placeholder: "\u6DF1\u5EA6",
    value: state.equivalentIsoline,
    onChange: changeEquivalentIsoline
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u663E\u793A\u6A21\u5F0F"), /*#__PURE__*/React__default["default"].createElement(antd.Select, {
    className: "sm-global-select",
    value: state.fillOptionsSelected,
    onChange: changeFillOptionsSelected
  }, /*#__PURE__*/React__default["default"].createElement(Option$2, {
    value: "Line"
  }, "\u7B49\u9AD8\u7EBF\u586B\u5145"), /*#__PURE__*/React__default["default"].createElement(Option$2, {
    value: "Region"
  }, "\u7B49\u9AD8\u9762\u586B\u5145"), /*#__PURE__*/React__default["default"].createElement(Option$2, {
    value: "Line_Region"
  }, "\u7B49\u9AD8\u7EBF\u9762\u586B\u5145"), /*#__PURE__*/React__default["default"].createElement(Option$2, {
    value: "None"
  }, "\u65E0\u989C\u8272\u8868"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: isoLineAnalysis
  }, "\u5206\u6790"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearIsoLine
  }, "\u6E05\u9664"))));
}

function Sm3dTerrainOperation() {
  // ?????????????????????
  var _useState = React.useState({
    digDepth: 500,
    isEdit: false,
    isEditZ: false,
    lineVisible: true,
    digPositions: [],
    modifyPositions: [],
    operationType: 'dig',
    terrainVisible: "terrainVisible"
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // ????????????????????????


  var digPosition = [];
  var modifyPosition = [];

  var changeOperationType = function changeOperationType(e) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      operationType: e.target.value
    }));
  }; // ????????????


  var changeDigDepth = function changeDigDepth(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      digDepth: value
    }));
  };
  /*
   ***????????????***
  */
  //?????????????????????(?????????????????????????????????)
  // if (props && props.digPositions) {
  //   digUpdate(props.digPositions);
  // }


  var digTerrain = function digTerrain(e) {
    e.preventDefault();

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(function (res) {
      digPosition = res.positions;
      var handlerPolygon = window.handlerPolygon;
      digUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (state.isEdit) {
        Edit$1(digPosition, state.isEditZ, digUpdate);
      }
    }, function (err) {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool$1.Message.errorMsg(resource.NoPickPositionSupported);
    }
  }; //??????????????????


  var digUpdate = function digUpdate(dig_position) {
    if (dig_position) {
      digPosition = dig_position;
    }

    scene.globe.removeAllExcavationRegion();
    scene.globe.addExcavationRegion({
      name: "dig_terrain",
      position: digPosition,
      height: state.digDepth,
      transparent: false
    });
  }; // ??????


  var clearDig = function clearDig(e) {
    e.preventDefault();
    digPosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.removeAllExcavationRegion();
    clearHandlerDrawing("Polygon");
    clearEditHandler$1();
  };
  /*
   ***??????????????????***
   */


  var modifyTerrain = function modifyTerrain(e) {
    e.preventDefault();

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(function (res) {
      modifyPosition = res.positions;
      var handlerPolygon = window.handlerPolygon;
      modifyUpdate(res.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;

      if (state.isEdit) {
        Edit$1(modifyPosition, state.isEditZ, modifyUpdate);
      }
    }, function (err) {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      alert("?????????????????????,?????????????????????????????????????????????????????????");
    } // }

  };

  var clearModify = function clearModify(e) {
    e.preventDefault();
    if (!window.handlerPolygon) return;
    scene.globe.removeAllModifyRegion();
    clearHandlerDrawing("Polygon");
    clearEditHandler$1();
  }; //??????????????????


  var modifyUpdate = function modifyUpdate(modify_positions) {
    if (modify_positions) {
      modifyPosition = modify_positions;
    }

    scene.globe.removeAllModifyRegion();
    scene.globe.addModifyRegion({
      name: "ggg",
      position: modifyPosition
    });
  };

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement(antd.Radio.Group, {
    value: state.operationType,
    className: "sm-global-row",
    onChange: changeOperationType
  }, /*#__PURE__*/React__default["default"].createElement(antd.Radio, {
    value: "dig"
  }, "\u5730\u5F62\u5F00\u6316"), /*#__PURE__*/React__default["default"].createElement(antd.Radio, {
    value: "modify"
  }, "\u5730\u5F62\u4FEE\u6539")), state.operationType === 'dig' ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5F00\u6316\u6DF1\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    className: "sm-global-input-number",
    value: state.digDepth,
    min: 0,
    onChange: changeDigDepth
  })) : "", state.operationType === 'modify' ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: modifyTerrain
  }, "\u4FEE\u6539"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearModify
  }, "\u6E05\u9664")) : /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: digTerrain
  }, "\u5F00\u6316"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearDig
  }, " \u6E05\u9664"))));
}

var css_248z = ".sm-panel {\n  width: 280px;\n}";
styleInject(css_248z);

var Option$1 = antd.Select.Option;

function Sm3dTerrainSlope() {
  // ?????????????????????
  var _useState = React.useState({
    analysisArea: 'ARM_REGION',
    //????????????
    displayMode: 'FACE_AND_ARROW',
    //????????????
    wideMaxR: 90,
    //????????????
    wideMinR: 0,
    //????????????
    slopeInterval: [0, 90],
    trans: 0.8,
    //?????????
    isEdit: false,
    //????????????
    slopePositions: [],
    lineVisible: true //?????????????????????

  }),
      _useState2 = _slicedToArray(_useState, 2),
      slopData = _useState2[0],
      setSlopData = _useState2[1]; // ???????????????
  var slope = new SuperMap3D.SlopeSetting(); //????????????

  var wide = SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode[slopData.analysisArea]; //?????????????????????

  var disMode = SuperMap3D.SlopeSettingEnum.DisplayMode[slopData.displayMode]; //????????????

  var SlopColorTable = new SuperMap3D.ColorTable(); //??????

  var slopePosition = []; //????????????????????????

  SlopColorTable.insert(80, new SuperMap3D.Color(255 / 255, 0 / 255, 0 / 255));
  SlopColorTable.insert(50, new SuperMap3D.Color(221 / 255, 224 / 255, 7 / 255));
  SlopColorTable.insert(30, new SuperMap3D.Color(20 / 255, 187 / 255, 18 / 255));
  SlopColorTable.insert(20, new SuperMap3D.Color(0, 161 / 255, 1));
  SlopColorTable.insert(0, new SuperMap3D.Color(9 / 255, 9 / 255, 255 / 255)); // ????????????

  var changeAnalysisArea = function changeAnalysisArea(value) {
    setSlopData(_objectSpread2(_objectSpread2({}, slopData), {}, {
      analysisArea: value
    }));
  }; // ????????????


  var changeSlopeInterval = function changeSlopeInterval(value) {
    setSlopData(_objectSpread2(_objectSpread2({}, slopData), {}, {
      slopeInterval: value
    }));
  };
  /*
   ***??????????????????***
  */
  // ??????


  var startSlope = function startSlope(e) {
    e.preventDefault();
    slope.DisplayMode = disMode;
    slope.MaxVisibleValue = slopData.wideMaxR;
    slope.MinVisibleValue = slopData.wideMinR;
    slope.ColorTable = SlopColorTable;
    slope.Opacity = slopData.trans; // this.positions = [];
    // scene.globe.enableLighting = true;

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", slopData.lineVisible).then(function (res) {
      slopePosition = res.positions;
      slopeUpdate(slopePosition);
      var handlerPolygon = window.handlerPolygon;
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (slopData.isEdit) {
        Edit(slopePosition, false, slopeUpdate);
      }
    }, function (err) {
      console.log(err);
    });
    handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(resource.NoPickPositionSupported);
    }
  }; // ??????


  var slopeUpdate = function slopeUpdate(p) {
    if (p) {
      slopePosition = p;
    }

    slope.CoverageArea = p;
    scene.globe.SlopeSetting = {
      slopeSetting: slope,
      analysisMode: wide
    };
  }; // ??????


  var clearSlope = function clearSlope(e) {
    e.preventDefault();
    slopePosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.SlopeSetting = {
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_NONE
    };
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  };

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5206\u6790\u533A\u57DF"), /*#__PURE__*/React__default["default"].createElement(antd.Select, {
    value: slopData.analysisArea,
    onChange: changeAnalysisArea
  }, /*#__PURE__*/React__default["default"].createElement(Option$1, {
    value: "ARM_REGION"
  }, "\u6307\u5B9A\u591A\u8FB9\u5F62\u533A\u57DF"), /*#__PURE__*/React__default["default"].createElement(Option$1, {
    value: "ARM_ALL"
  }, "\u5168\u90E8\u533A\u57DF\u53C2\u4E0E\u5206\u6790"), /*#__PURE__*/React__default["default"].createElement(Option$1, {
    value: "ARM_NONE"
  }, "\u5168\u90E8\u533A\u57DF\u4E0D\u53C2\u4E0E\u5206\u6790"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5761\u5EA6\u533A\u95F4"), /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-global-slider",
    value: slopData.slopeInterval,
    min: 0,
    max: 90,
    range: true,
    step: 1,
    onChange: changeSlopeInterval
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: startSlope
  }, "\u5206\u6790"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearSlope
  }, "\u6E05\u9664"))));
}

antd.Select.Option;

function Sm3dClipCross() {
  // ?????????????????????
  var _useState = React.useState({
    clipWidth: 5,
    clipHeight: 5,
    heading: 0,
    pitch: 0,
    roll: 0,
    extrude: 1
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // ???????????????


  var layers; // let screenSpaceEventHandler;

  var _useState3 = React.useState(new SuperMap3D.ScreenSpaceEventHandler(scene.canvas)),
      _useState4 = _slicedToArray(_useState3, 1),
      screenSpaceEventHandler = _useState4[0];

  var _useState5 = React.useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      box = _useState6[0],
      setBox = _useState6[1];

  var startClip, //????????????
  boxPosition, dim, //entity
  position; //????????????
  // if (storeState.isViewer) {
  //   layers = scene.layers && scene.layers.layerQueue;
  // }
  //viewer ????????????????????????
  // watch(() => storeState.isViewer, val => {
  //   if (val) {
  //     screenSpaceEventHandler = new SuperMap3D.ScreenSpaceEventHandler(
  //       scene.canvas
  //     );
  //     layers = scene.layers && scene.layers.layerQueue;
  //   }
  // })

  React.useEffect(function () {
    layers = scene.layers && scene.layers.layerQueue;
    console.log('useEffect???layers', layers);
  }, [layers]); // ????????????

  var changeClipWidth = function changeClipWidth(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      clipWidth: value
    }));
  }; // ????????????


  var changeClipHeight = function changeClipHeight(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      clipHeight: value
    }));
  }; // ???X?????????


  var changePitch = function changePitch(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      pitch: value
    }));
  };
  /** 
   * @description: ???Y?????????
   * @return {*}
   */
  // 


  var changeRoll = function changeRoll(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      roll: value
    }));
  };
  /**
   * ???Z?????????
   * @description: 
   * @param {*} value
   * @return {*}
   */


  var changeHeading = function changeHeading(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      heading: value
    }));
  }; // ????????????


  var changeExtrude = function changeExtrude(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      extrude: value
    }));
  };
  /*
   ***cross????????????***
  */
  // ??????


  var startCross = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();

              if (scene) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              if (box) {
                clearCross();
              }

              _context.next = 6;
              return start();

            case 6:
              startClip = true;
              box.show = true;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function startCross(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var start = function start() {
    var _iterator = _createForOfIteratorHelper(layers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var layer = _step.value;
        layer.selectEnabled = false;
      } // ????????????

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    boxPosition = SuperMap3D.Cartesian3.fromDegrees(0, 0, 0);
    dim = new SuperMap3D.Cartesian3(state.clipWidth, state.clipHeight, 0.1);
    var boxTem = null;
    boxTem = scene.trackingLayer.add({
      // ?????????
      id: "cross-clip-identify-box",
      position: boxPosition,
      show: false,
      box: {
        dimensions: dim,
        fill: false,
        outline: true,
        outlineColor: SuperMap3D.Color.AQUA,
        outlineWidth: 5.0
      }
    });
    var hpr;
    screenSpaceEventHandler.setInputAction(function (movement) {
      if (startClip) {
        boxPosition = scene.pickPosition(movement.endPosition);

        if (!boxPosition) {
          return;
        }

        boxTem.position = boxPosition;

        if (!hpr) {
          hpr = new SuperMap3D.HeadingPitchRoll(SuperMap3D.Math.toRadians(state.heading), SuperMap3D.Math.toRadians(state.pitch), SuperMap3D.Math.toRadians(state.roll));
        }

        var orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(boxPosition, hpr);
        boxTem.orientation = orientation;
      }
    }, SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
    screenSpaceEventHandler.setInputAction(function (evt) {
      if (startClip) {
        position = scene.pickPosition(evt.position);

        if (!position) {
          return;
        }

        updateClip();
        startClip = false;
        boxTem.show = false;
      }

      screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
      screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
      hpr = null;
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
    console.log('start??????', boxTem);
    setBox(boxTem);
  }; // ??????


  var updateClip = function updateClip() {
    var _iterator2 = _createForOfIteratorHelper(layers),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var layer = _step2.value;
        layer.setCustomClipCross({
          position: position,
          dimensions: dim,
          heading: state.heading,
          pitch: state.pitch,
          roll: state.roll,
          extrudeDistance: Number(state.extrude)
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }; // ??????


  var clearCross = function clearCross() {
    box && scene.trackingLayer.removeById("cross-clip-identify-box");

    var _iterator3 = _createForOfIteratorHelper(layers),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var layer = _step3.value;
        layer.clearCustomClipBox();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    startClip = false;
    _readOnlyError("box");
    screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
    screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
  }; // ??????
  // watch(() => state.clipWidth, val => {
  //   let temp_width = Number(val);
  //   if (temp_width <= 0 || !box) {
  //     return;
  //   }
  //   box.box.dimensions = new SuperMap3D.Cartesian3(
  //     state.clipWidth,
  //     state.clipHeight,
  //     0.1
  //   );
  //   dim = new SuperMap3D.Cartesian3(temp_width, state.clipHeight, state.extrude);
  //   updateClip();
  // });


  React.useEffect(function () {
    var temp_width = Number(state.clipWidth);

    if (temp_width <= 0 || !box) {
      return;
    }

    box.box.dimensions = new SuperMap3D.Cartesian3(state.clipWidth, state.clipHeight, 0.1);
    dim = new SuperMap3D.Cartesian3(temp_width, state.clipHeight, state.extrude);
    updateClip();
  }, [state.clipWidth]); // watch(() => state.clipHeight, val => {
  //   let temp_height = Number(val);
  //   if (temp_height <= 0 || !box) {
  //     return;
  //   }
  //   box.box.dimensions = new SuperMap3D.Cartesian3(
  //     state.clipWidth,
  //     state.clipHeight,
  //     0.1
  //   );
  //   dim = new SuperMap3D.Cartesian3(state.clipWidth, temp_height, state.extrude);
  //   updateClip();
  // });
  // watch(() => state.pitch, val => {
  //   if (val === "" || !box) {
  //     return;
  //   }
  //   let pitch = Number(val);
  //   let hpr = new SuperMap3D.HeadingPitchRoll(
  //     SuperMap3D.Math.toRadians(state.heading),
  //     SuperMap3D.Math.toRadians(pitch),
  //     SuperMap3D.Math.toRadians(state.roll)
  //   );
  //   let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
  //     boxPosition,
  //     hpr
  //   );
  //   box.orientation = orientation;
  //   updateClip();
  // });
  // watch(() => state.roll, val => {
  //   if (val === "" || !box) {
  //     return;
  //   }
  //   let roll = Number(val);
  //   let hpr = new SuperMap3D.HeadingPitchRoll(
  //     SuperMap3D.Math.toRadians(state.heading),
  //     SuperMap3D.Math.toRadians(state.pitch),
  //     SuperMap3D.Math.toRadians(roll)
  //   );
  //   let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
  //     boxPosition,
  //     hpr
  //   );
  //   box.orientation = orientation;
  //   updateClip();
  // });
  // watch(() => state.heading, val => {
  //   if (val === "" || !box) {
  //     return;
  //   }
  //   let heading = Number(val);
  //   let hpr = new SuperMap3D.HeadingPitchRoll(
  //     SuperMap3D.Math.toRadians(heading),
  //     SuperMap3D.Math.toRadians(state.pitch),
  //     SuperMap3D.Math.toRadians(state.roll)
  //   );
  //   let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
  //     boxPosition,
  //     hpr
  //   );
  //   box.orientation = orientation;
  //   updateClip();
  // });
  // watch(() => state.extrude, val => {
  //   let temp_extrudeDistance = Number(val);
  //   if (temp_extrudeDistance <= 0 || !box) {
  //     return;
  //   }
  //   updateClip();
  // });
  // ??????
  // onBeforeUnmount(() => {
  //   screenSpaceEventHandler.destroy();
  //   layers = undefined;
  //   box = undefined;
  //   screenSpaceEventHandler = undefined;
  //   dim = undefined;
  // })

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel",
    style: {
      width: '250px'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u88C1\u526A\u5BBD\u5EA6"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-cc-slider-input"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-cc-slider",
    value: state.clipWidth,
    min: 1,
    step: 1,
    onChange: changeClipWidth
  }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.clipWidth,
    min: 1,
    onChange: changeClipWidth
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u88C1\u526A\u9AD8\u5EA6"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-cc-slider-input"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-cc-slider",
    value: state.clipHeight,
    min: 1,
    onChange: changeClipHeight
  }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.clipHeight,
    min: 1,
    onChange: changeClipHeight
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u7ED5X\u8F74\u65CB\u8F6C"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-cc-slider-input"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-cc-slider",
    value: state.pitch,
    min: 1,
    step: 1,
    max: 360,
    onChange: changePitch
  }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.pitch,
    min: 0,
    max: 360,
    onChange: changePitch
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u7ED5Y\u8F74\u65CB\u8F6C"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-cc-slider-input"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-cc-slider",
    value: state.roll,
    min: 0,
    step: 1,
    max: 360,
    onChange: changeRoll
  }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.roll,
    min: 0,
    max: 360,
    onChange: changeRoll
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u7ED5Z\u8F74\u65CB\u8F6C"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-cc-slider-input"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-cc-slider",
    value: state.heading,
    min: 0,
    step: 1,
    max: 360,
    onChange: changeHeading
  }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.heading,
    min: 0,
    max: 360,
    onChange: changeHeading
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u62C9\u4F38\u9AD8\u5EA6"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-cc-slider-input"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Slider, {
    className: "sm-cc-slider",
    value: state.extrude,
    min: 1,
    step: 1,
    onChange: changeExtrude
  }), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.extrude,
    min: 1,
    onChange: changeExtrude
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: startCross
  }, "\u88C1\u526A"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearCross
  }, "\u6E05\u9664"))));
}

function Sm3dClipPolygon() {
  // ?????????????????????
  var _useState = React.useState({
    clipModelPolygon: 'ClipInside',
    //????????????js
    isEdit: false,
    //????????????
    isEditZ: false,
    lineVisible: true //?????????????????????

  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // ???????????????


  var clipMode = SuperMap3D.ModifyRegionMode.CLIP_INSIDE; //??????????????? ??????: SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;

  var layers;
  var polygonPosition = [];

  var changeClipModelPolygon = function changeClipModelPolygon(e) {
    console.log(e);
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      clipModelPolygon: e.target.value
    }));
  };
  /*
   ***????????????????????????***
  */
  //????????????????????? ???????????????????????????????????????


  React.useEffect(function () {
    layers = scene.layers && scene.layers.layerQueue;
  }, [scene.layers]); // ??????

  var clipPolygon = function clipPolygon(e) {
    e.preventDefault();

    if (!layers) {
      layers = scene.layers && scene.layers.layerQueue;
    }

    var _iterator = _createForOfIteratorHelper(layers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var layer = _step.value;
        layer.selectEnabled = false; // ??????????????????????????????

        layer.clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", state.lineVisible).then(function (res) {
      clipPolygonUpdate(res.positions);
      var handlerPolygon = window.handlerPolygon;
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();

      if (state.isEdit) {
        Edit(polygonPosition, state.isEditZ, clipPolygonUpdate);
      }
    }, function (err) {
      console.log(err);
    });
    window.handlerPolygon.activate();

    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(resource.NoPickPositionSupported);
    }
  }; // ??????


  var clipPolygonUpdate = function clipPolygonUpdate(p) {
    polygonPosition = p;

    var _iterator2 = _createForOfIteratorHelper(layers),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var layer = _step2.value;
        layer.setModifyRegions([p], clipMode);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }; // ??????


  var clearClipPolygon = function clearClipPolygon(e) {
    e.preventDefault();
    polygonPosition = [];
    if (!window.handlerPolygon) return;
    clearHandlerDrawing("Polygon");

    var _iterator3 = _createForOfIteratorHelper(layers),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var layer = _step3.value;
        layer.clearModifyRegions();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }; // ??????


  React.useEffect(function () {
    switch (state.clipModelPolygon) {
      case "ClipInside":
        clipMode = SuperMap3D.ModifyRegionMode.CLIP_INSIDE;
        break;

      case "ClipOutside":
        clipMode = SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;
        break;
    }

    if (polygonPosition.length > 0) {
      clipPolygonUpdate(polygonPosition);
    }
  }, [state.clipModelPolygon]); // ??????
  // onBeforeUnmount(() => {
  //   layers = undefined;
  // })

  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement(antd.Radio.Group, {
    defaultValue: "ClipInside",
    className: "sm-global-row",
    onChange: changeClipModelPolygon
  }, /*#__PURE__*/React__default["default"].createElement(antd.Radio, {
    value: "ClipInside"
  }, "\u88C1\u526A\u5185\u90E8"), /*#__PURE__*/React__default["default"].createElement(antd.Radio, {
    value: "ClipOutside"
  }, "\u88C1\u526A\u5916\u90E8")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clipPolygon
  }, "\u88C1\u526A"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearClipPolygon
  }, "\u6E05\u9664"))));
}

var Option = antd.Select.Option;

function Sm3dGeologicalBody() {
  // ?????????????????????
  var _useState = React.useState({
    operationType: 'stretch_cut',
    //????????????
    stretchHeight: 1,
    //????????????
    modelUrls: [{
      id: 1,
      model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer1/features/1.stream",
      color: new SuperMap3D.Color(179 / 255, 179 / 255, 179 / 255, 1)
    }, {
      id: 2,
      model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer2/features/1.stream",
      color: new SuperMap3D.Color(94 / 255, 179 / 255, 59 / 255, 1)
    }, {
      id: 3,
      model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer3/features/1.stream",
      color: new SuperMap3D.Color(52 / 255, 94 / 255, 35 / 255, 1)
    }, {
      id: 4,
      model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer4/features/1.stream",
      color: new SuperMap3D.Color(115 / 255, 115 / 255, 115 / 255, 1)
    }, {
      id: 5,
      model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer5/features/1.stream",
      color: new SuperMap3D.Color(171 / 255, 85 / 255, 66 / 255, 1)
    }, {
      id: 6,
      model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer6/features/1.stream",
      color: new SuperMap3D.Color(68 / 255, 68 / 255, 68 / 255, 1)
    }],
    //????????????
    digHeight: 500,
    drillRadius: 400,
    drillHeight: 2000,
    clipType: 'drawClip',
    drawClipMode: 'KeepInside'
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // ???????????????


  var _useState3 = React.useState(new SuperMap3D.SolidModelsProfile(scene)),
      _useState4 = _slicedToArray(_useState3, 2),
      solidModelsProfile = _useState4[0];
      _useState4[1];

  var entitie_ids = []; //??????

  var drillConeCounts = 0,
      drillPoints = []; //??????

  var editorBox, geoBox; //??????

  React.useEffect(function () {
    init();
  }, []);

  var init = function init() {
    scene.logarithmicDepthBuffer = true;
    scene.camera.frustum.near = 0.1;
    scene.globe.show = false;
    scene.skyAtmosphere.show = false;
    solidModelsProfile.addModels(state.modelUrls);
    scene.camera.setView({
      destination: new SuperMap3D.Cartesian3(-2167835.4408299956, 4423497.534529096, 4095839.2845661934),
      orientation: {
        heading: 4.029329438295484,
        pitch: -0.23796647219353817,
        roll: 8.994289757424667e-10
      }
    });
  }; // ????????????


  var changOperationType = function changOperationType(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      operationType: value
    }));
  }; // ????????????


  var changeStretchHeight = function changeStretchHeight(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      stretchHeight: value
    }));
  }; // ????????????


  var changeDigHeight = function changeDigHeight(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      digHeight: value
    }));
  }; // ????????????


  var changeDrillRadius = function changeDrillRadius(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      drillRadius: value
    }));
  }; // ??????


  var changeDrawClipMode = function changeDrawClipMode(value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      drawClipMode: value
    }));
  }; // ????????????


  var drawLine = function drawLine() {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    } // window.tooltip.showAt(' <p>??????????????????????????????</p><p>????????????????????????</p><p>????????????????????????</p>', '350px');


    handlerDrawing("Polyline").then(function (res) {
      addCutLine(res.result.object.positions);
      var handlerPolyline = window.handlerPolyline;
      handlerPolyline.polyline.show = false; // window.polylineTransparent.show = false; //???????????????

      handlerPolyline.deactivate(); // tooltip.setVisible(false);

      var id = 'geologicalbody_cutline-' + new Date().getTime();
      entitie_ids.push(id);
      scene.trackingLayer.add({
        id: id,
        polyline: {
          positions: res.result.object.positions,
          width: 2,
          material: SuperMap3D.Color.fromCssColorString('#51ff00') // clampToGround: true, //?????????
          // classificationType: SuperMap3D.ClassificationType.S3M_TILE, //???????????????

        }
      });
    }, function (err) {
      console.log(err);
    });
    window.handlerPolyline.activate();
  };

  var addCutLine = function addCutLine(positions) {
    var pointArray = [];
    if (positions.length < 2) return;

    for (var i = 0; i < positions.length - 1; i++) {
      pointArray.length = 0;
      pointArray.push(positions[i]);
      pointArray.push(positions[i + 1]);
      solidModelsProfile.addProfileGeometry(pointArray);
    }
  };

  var startCut = function startCut() {
    // tooltip.setVisible(false);
    clearHandlerDrawing('Polyline');

    if (entitie_ids.length === 0) {
      // window.tooltip.showAt(' <p>???????????????????????????</p>', '350px');
      return;
    }

    solidModelsProfile.build();
  };

  var clearCut = function clearCut() {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    clearHandlerDrawing('Polyline');
    entitie_ids.forEach(function (id) {
      scene.trackingLayer.removeById(id);
    });
    entitie_ids.length = 0;
  }; //??????


  var addProfileGeometry = function addProfileGeometry(positions) {
    var point3ds = new SuperMap3D.Point3Ds();
    var points = tool$1.CartesiantoDegreesObjs(positions);
    points.forEach(function (point) {
      var point3d = new SuperMap3D.Point3D(point.longitude, point.latitude, point.height + 1000);
      point3ds.add(point3d);
    });
    var geometry = new SuperMap3D.GeoRegion3D([point3ds]);

    if (state.operationType === 'dig') {
      solidModelsProfile.clippingType = SuperMap3D.ClippingType.KeepOutside;
      geometry.extrudedHeight = -Number(state.digHeight); //??????

      var geometry2 = new SuperMap3D.GeoRegion3D([point3ds]);
      geometry2.isLatLon = false;
      geometry2.bottomAltitude = geometry.extrudedHeight;
      solidModelsProfile.addProfileGeometry(geometry2);
    } else {
      // solidModelsProfile.clippingType = SuperMap3D.ClippingType.KeepOutside;
      geometry.extrudedHeight = -7000;
    }

    geometry.isLatLon = false;
    solidModelsProfile.setClipGeometry(geometry); //??????

    for (var i = 0; i < positions.length; i++) {
      var singleA = [];
      singleA.push(positions[i]);

      if (i == positions.length - 1) {
        singleA.push(positions[0]);
      } else {
        singleA.push(positions[i + 1]);
      }

      solidModelsProfile.addProfileGeometry(singleA);
      solidModelsProfile.build();
    }
  };

  var drawPolygon = function drawPolygon() {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }

    handlerDrawing("Polygon", false).then(function (res) {
      var handlerPolygon = window.handlerPolygon;
      addProfileGeometry(res.result.object.positions);
      handlerPolygon.polygon.show = false;
      handlerPolygon.polyline.show = false;
      handlerPolygon.deactivate();
    }, function (err) {
      console.log(err);
    });
    window.handlerPolygon.activate();
  };

  var startDig = function startDig() {
    clearDig();
    drawPolygon();
  };

  var clearDig = function clearDig() {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    clearHandlerDrawing();
  }; //??????


  var startDrilling = function startDrilling() {
    clearDrilling();
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur"); // window.tooltip.showAt(' <p>????????????????????????????????????</p><p>???????????????????????????????????????</p>', '350px');

    scene.eventManager.addEventListener("CLICK", click_point, true);
    scene.eventManager.addEventListener("RIGHT_CLICK", click_right, true);
  };

  var click_point = function click_point(e) {
    var position = scene.pickPosition(e.message.position);
    addDrillCone(position);
    drillPoints.push(position);
  };

  var click_right = function click_right(e) {
    // window.tooltip.setVisible(false);
    document.body.classList.remove("measureCur");
    var points = tool$1.CartesiantoDegreesObjs(drillPoints);
    points.forEach(function (point) {
      var geoCylinder = new SuperMap3D.GeoCylinder(Number(state.drillRadius), Number(state.drillRadius), Number(state.drillHeight));
      var height = Number(state.drillHeight) / 2;
      geoCylinder.geoPosition = new SuperMap3D.Point3D(point.longitude, point.latitude, point.height - height);
      solidModelsProfile.addProfileGeometry(geoCylinder);
    });

    for (var i = 1; i <= drillConeCounts; i++) {
      scene.trackingLayer.removeById('Drill_Point-' + i);
    }

    solidModelsProfile.build();
    scene.eventManager.removeEventListener("CLICK", click_point);
    scene.eventManager.removeEventListener("RIGHT_CLICK", click_right);
  };

  var clearDrilling = function clearDrilling() {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    document.body.classList.remove("measureCur");

    for (var i = 1; i <= drillConeCounts; i++) {
      scene.trackingLayer.removeById('Drill_Point-' + i);
    }

    scene.eventManager.removeEventListener("CLICK", click_point);
    scene.eventManager.removeEventListener("RIGHT_CLICK", click_right);
    drillConeCounts = 0;
    drillPoints.length = 0;
  }; // ???????????????


  var addDrillCone = function addDrillCone(position) {
    drillConeCounts++;
    scene.trackingLayer.add({
      id: 'Drill_Point-' + drillConeCounts,
      position: position,
      cylinder: {
        length: 100,
        topRadius: Number(state.drillRadius),
        bottomRadius: Number(state.drillRadius),
        material: SuperMap3D.Color.fromCssColorString("#d60000")
      }
    });
  }; //??????


  var startClip = function startClip() {
    clearClip();
    solidModelsProfile.clippingType = SuperMap3D.ClippingType[state.drawClipMode];

    if (state.clipType === 'drawClip') {
      drawPolygon();
      return;
    }

    BoxClipByEitor();
  };

  var clearClip = function clearClip() {
    clearDig();
    clearHandlerDrawing('Box');

    if (editorBox) {
      editorBox.deactivate();
      editorBox.destroy();
      editorBox = null;
    }
  }; //box??????


  var BoxClipByEitor = function BoxClipByEitor() {
    if (editorBox) {
      editorBox.deactivate();
    } // tooltip.showAt(' <p>??????????????????????????????box??????</p><p>????????????????????????box??????</p><p>??????????????????????????????</p>', '350px');


    if (!window.handlerBox) {
      initHandler("Box");
    }

    handlerDrawing("Box", false).then(function (res) {
      var handlerBox = window.handlerBox;
      updateClipBox(res.result.object);
      handlerBox.deactivate();
    }, function (err) {
      console.log(err);
    });
    window.handlerBox.activate();
  };

  var updateClipBox = function updateClipBox(object) {
    object.show = false; //???????????????????????????

    var newDim = object.box.dimensions.getValue();
    var position = SuperMap3D.Cartographic.fromCartesian(object.position.getValue(0));
    geoBox = new SuperMap3D.GeoBox(newDim.x, newDim.y, newDim.z);
    geoBox.geoPosition = new SuperMap3D.Point3D(SuperMap3D.Math.toDegrees(position.longitude), SuperMap3D.Math.toDegrees(position.latitude), position.height);
    solidModelsProfile.addProfileGeometry(geoBox);
    solidModelsProfile.build(); // ????????????

    if (!editorBox) {
      editorBox = new SuperMap3D.BoxEditor(scene, object);
      editorBox.color = SuperMap3D.Color.WHITE.withAlpha(0.0); //??????????????????

      editorBox.hoverColor = SuperMap3D.Color.BLUE; //???????????????????????????

      var editBoxEvt = function editBoxEvt(e) {
        var newDim = e.dimensions;
        geoBox.geoWidth = newDim.y;
        geoBox.geoHeight = newDim.z;
        geoBox.geoLength = newDim.x;
        var position = tool$1.CartesiantoDegrees(e.position);
        geoBox.geoPosition = new SuperMap3D.Point3D(position[0], position[1], position[2]);
        geoBox.geoRotationZ = editorBox.hpr.heading * (180 / SuperMap3D.Math.PI);
      };

      editorBox.editEvt.addEventListener(editBoxEvt);
    } else {
      editorBox.setEditObject(object); //
    }

    editorBox.activate();
  }; //????????????
  // watch(() => state.modelUrls, val => {
  //   solidModelsProfile.addModels(val);
  // });
  // watch(() => state.stretchHeight, val => {
  //   if (!state.modelUrls || state.modelUrls.length == 0) return;
  //   for (let model of state.modelUrls) {
  //     let url = model.model;
  //     let instance = solidModelsProfile._s3mInstanceCollection._group[url].instances._array[0];
  //     instance.updateScale(new SuperMap3D.Cartesian3(1, 1, Number(val)));
  //   }
  // });
  // watch(() => state.operationType, val => {
  //   clearAll();
  // });
  // watch(() => state.drawClipMode, val => {
  //   solidModelsProfile.clippingType = SuperMap3D.ClippingType[val];
  // });
  // watch(() => state.clipType, val => {
  //   clearClip()
  // });
  // ??????
  // onBeforeUnmount(() => {
  //   solidModelsProfile.clear()
  //   scene.globe.show = true;
  //   scene.skyAtmosphere.show = true;
  //   clearAll();
  //   scene = null;
  //   solidModelsProfile = null;
  //   geoBox = null;
  // });


  return /*#__PURE__*/React__default["default"].createElement(Draggable__default["default"], {
    handle: ".sm-drag-handler"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-panel"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-drag-handler"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u64CD\u4F5C\u7C7B\u578B"), /*#__PURE__*/React__default["default"].createElement(antd.Select, {
    defaultValue: state.operationType,
    className: "sm-global-select",
    onChange: changOperationType
  }, /*#__PURE__*/React__default["default"].createElement(Option, {
    value: "stretch_cut"
  }, "\u62C9\u4F38\u4E0E\u5256\u5207"), /*#__PURE__*/React__default["default"].createElement(Option, {
    value: "dig"
  }, "\u5F00\u6316"), /*#__PURE__*/React__default["default"].createElement(Option, {
    value: "drilling"
  }, "\u8F6C\u5B54"), /*#__PURE__*/React__default["default"].createElement(Option, {
    value: "clip"
  }, "\u88C1\u526A"))), state.operationType === 'stretch_cut' ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u62C9\u4F38\u7CFB\u6570"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.stretchHeight,
    min: 1,
    className: "sm-global-input-number",
    onChange: changeStretchHeight
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: drawLine
  }, "\u753B\u7EBF"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: startCut,
    style: {
      marginRight: '10px'
    }
  }, "\u5256\u5207"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearCut
  }, "\u6E05\u9664"))) : '', state.operationType === 'dig' ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u5F00\u6316\u6DF1\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.digHeight,
    min: 1,
    className: "sm-global-input-number",
    onChange: changeDigHeight
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: startDig
  }, "\u5F00\u6316"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearDig
  }, "\u6E05\u9664"))) : '', state.operationType === 'drilling' ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u94BB\u5B54\u534A\u5F84"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.drillRadius,
    min: 1,
    className: "sm-global-input-number",
    onChange: changeDrillRadius
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u94BB\u5B54\u6DF1\u5EA6"), /*#__PURE__*/React__default["default"].createElement(antd.InputNumber, {
    value: state.drillHeight,
    min: 1,
    className: "sm-global-input-number"
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: startDrilling
  }, "\u94BB\u5B54"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearDrilling
  }, "\u6E05\u9664"))) : '', state.operationType === 'clip' ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-row"
  }, /*#__PURE__*/React__default["default"].createElement("span", null, "\u88C1\u526A\u6A21\u5F0F"), /*#__PURE__*/React__default["default"].createElement(antd.Select, {
    value: state.drawClipMode,
    onChange: changeDrawClipMode
  }, /*#__PURE__*/React__default["default"].createElement(Option, {
    value: "KeepInside"
  }, "\u88C1\u526A\u5916\u90E8"), /*#__PURE__*/React__default["default"].createElement(Option, {
    value: "KeepOutside"
  }, "\u88C1\u526A\u5185\u90E8"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sm-global-button"
  }, /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: startClip
  }, "\u88C1\u526A"), /*#__PURE__*/React__default["default"].createElement(antd.Button, {
    size: "small",
    onClick: clearClip
  }, "\u6E05\u9664"))) : ''));
}

exports.Sm3dClipCross = Sm3dClipCross;
exports.Sm3dClipPolygon = Sm3dClipPolygon;
exports.Sm3dGeologicalBody = Sm3dGeologicalBody;
exports.Sm3dMeasure = Sm3dMeasure;
exports.Sm3dSightline = Sm3dSightline;
exports.Sm3dTerrainFlood = Sm3dTerrainFlood;
exports.Sm3dTerrainIsoline = Sm3dTerrainIsoline;
exports.Sm3dTerrainOperation = Sm3dTerrainOperation;
exports.Sm3dTerrainSlope = Sm3dTerrainSlope;
exports.Sm3dViewer = Sm3dViewer;
exports.Sm3dViewshed = Sm3dViewshed;
