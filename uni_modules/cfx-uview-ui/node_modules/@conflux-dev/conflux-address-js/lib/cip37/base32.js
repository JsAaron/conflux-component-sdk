"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var JSBI = require('jsbi');

var ALPHABET = 'ABCDEFGHJKMNPRSTUVWXYZ0123456789';
var ALPHABET_MAP = {};

for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z);

  if (ALPHABET_MAP[x] !== undefined) {
    throw new TypeError(x + ' is ambiguous');
  }

  ALPHABET_MAP[x] = z;
} // pre defined BigInt could faster about 40 percent


var BIGINT_0 = JSBI.BigInt(0);
var BIGINT_1 = JSBI.BigInt(1);
var BIGINT_5 = JSBI.BigInt(5);
var BIGINT_35 = JSBI.BigInt(35);
var BIGINT_0B00001 = JSBI.BigInt(1);
var BIGINT_0B00010 = JSBI.BigInt(2);
var BIGINT_0B00100 = JSBI.BigInt(4);
var BIGINT_0B01000 = JSBI.BigInt(8);
var BIGINT_0B10000 = JSBI.BigInt(16);
var BIGINT_0X07FFFFFFFF = JSBI.BigInt(0x07ffffffff);
var BIGINT_0X98F2BC8E61 = JSBI.BigInt(0x98f2bc8e61);
var BIGINT_0X79B76D99E2 = JSBI.BigInt(0x79b76d99e2);
var BIGINT_0XF33E5FB3C4 = JSBI.BigInt(0xf33e5fb3c4);
var BIGINT_0XAE2EABE2A8 = JSBI.BigInt(0xae2eabe2a8);
var BIGINT_0X1E4F43E470 = JSBI.BigInt(0x1e4f43e470);

function convertBit(buffer, inBits, outBits, pad) {
  var mask = (1 << outBits) - 1;
  var array = [];
  var bits = 0;
  var value = 0;

  var _iterator = _createForOfIteratorHelper(buffer),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _byte = _step.value;
      bits += inBits;
      value = value << inBits | _byte;

      while (bits >= outBits) {
        bits -= outBits;
        array.push(value >>> bits & mask);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  value = value << outBits - bits & mask;

  if (bits && pad) {
    array.push(value);
  } else if (value && !pad) {
    throw new Error('Excess padding');
  } else if (bits >= inBits && !pad) {
    throw new Error('Non-zero padding');
  }

  return array;
}

function polyMod(buffer) {
  var checksumBigInt = BIGINT_1;

  var _iterator2 = _createForOfIteratorHelper(buffer),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _byte2 = _step2.value;
      // c0 = c >> 35;
      var high = JSBI.signedRightShift(checksumBigInt, BIGINT_35); // XXX: checksumBigInt must be positive, signedRightShift is ok
      // c = ((c & 0x07ffffffff) << 5) ^ d;

      checksumBigInt = JSBI.bitwiseAnd(checksumBigInt, BIGINT_0X07FFFFFFFF);
      checksumBigInt = JSBI.leftShift(checksumBigInt, BIGINT_5);
      checksumBigInt = _byte2 ? JSBI.bitwiseXor(checksumBigInt, JSBI.BigInt(_byte2)) : checksumBigInt; // bit ^ 0 = bit

      if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B00001), BIGINT_0)) {
        checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0X98F2BC8E61);
      }

      if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B00010), BIGINT_0)) {
        checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0X79B76D99E2);
      }

      if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B00100), BIGINT_0)) {
        checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0XF33E5FB3C4);
      }

      if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B01000), BIGINT_0)) {
        checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0XAE2EABE2A8);
      }

      if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B10000), BIGINT_0)) {
        checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0X1E4F43E470);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return JSBI.bitwiseXor(checksumBigInt, BIGINT_1);
}

module.exports = {
  convertBit: convertBit,
  polyMod: polyMod,
  ALPHABET: ALPHABET,
  ALPHABET_MAP: ALPHABET_MAP
};