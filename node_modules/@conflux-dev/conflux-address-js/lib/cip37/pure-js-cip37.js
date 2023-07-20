"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./base32'),
    ALPHABET = _require.ALPHABET,
    ALPHABET_MAP = _require.ALPHABET_MAP,
    polyMod = _require.polyMod,
    convertBit = _require.convertBit;

var CONST = require('../const');

var _require2 = require('../utils'),
    isHexString = _require2.isHexString;

var VERSION_BYTE = 0;
var NET_ID_LIMIT = 0xFFFFFFFF;

function encodeNetId(netId) {
  if (!Number.isInteger(netId)) {
    throw new Error('netId should be passed as an integer');
  }

  if (netId < 0 || netId > NET_ID_LIMIT) {
    throw new Error('netId should be passed as in range [0, 0xFFFFFFFF]');
  }

  switch (netId) {
    case CONST.NETID_TEST:
      return CONST.PREFIX_CFXTEST;

    case CONST.NETID_MAIN:
      return CONST.PREFIX_CFX;

    default:
      return "".concat(CONST.PREFIX_NET).concat(netId);
  }
}

function isValidNetId(netId) {
  return /^([1-9]\d*)$/.test(netId) && Number(netId) <= NET_ID_LIMIT;
}

function decodeNetId(payload) {
  switch (payload) {
    case CONST.PREFIX_CFXTEST:
      return CONST.NETID_TEST;

    case CONST.PREFIX_CFX:
      return CONST.NETID_MAIN;

    default:
      {
        var prefix = payload.slice(0, 3);
        var netId = payload.slice(3);

        if (prefix !== CONST.PREFIX_NET || !isValidNetId(netId)) {
          throw new Error("netId prefix should be passed by 'cfx', 'cfxtest' or 'net[n]' ");
        }

        if (Number(netId) === CONST.NETID_TEST || Number(netId) === CONST.NETID_MAIN) {
          throw new Error('net1 or net1029 are invalid');
        }

        return Number(netId);
      }
  }
}

function getAddressType(hexAddress) {
  if (hexAddress.length < 1) {
    throw new Error('Empty payload in address');
  }

  switch (hexAddress[0] & 0xf0) {
    case 0x10:
      return CONST.TYPE_USER;

    case 0x80:
      return CONST.TYPE_CONTRACT;

    case 0x00:
      var _iterator = _createForOfIteratorHelper(hexAddress),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var x = _step.value;

          if (x !== 0x00) {
            return CONST.TYPE_BUILTIN;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return CONST.TYPE_NULL;

    default:
      return CONST.TYPE_UNKNOWN;
    // throw new Error('hexAddress should start with 0x0, 0x1 or 0x8')
  }
}

function encode(hexAddress, netId) {
  var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (isHexString(hexAddress)) {
    hexAddress = Buffer.from(hexAddress.slice(2), 'hex');
  }

  if (!(hexAddress instanceof Buffer)) {
    throw new Error('hexAddress should be passed as a Buffer');
  }

  if (hexAddress.length < 20) {
    throw new Error('hexAddress should be at least 20 bytes');
  }

  var addressType = getAddressType(hexAddress).toUpperCase();
  var netName = encodeNetId(netId).toUpperCase();
  var netName5Bits = Buffer.from(netName).map(function (_byte) {
    return _byte & 31;
  });
  var payload5Bits = convertBit([VERSION_BYTE].concat(_toConsumableArray(hexAddress)), 8, 5, true);
  var checksumBigInt = polyMod([].concat(_toConsumableArray(netName5Bits), [0], _toConsumableArray(payload5Bits), [0, 0, 0, 0, 0, 0, 0, 0]));
  var checksumBytes = Buffer.from(checksumBigInt.toString(16).padStart(10, '0'), 'hex');
  var checksum5Bits = convertBit(checksumBytes, 8, 5, true);
  var payload = payload5Bits.map(function (_byte2) {
    return ALPHABET[_byte2];
  }).join('');
  var checksum = checksum5Bits.map(function (_byte3) {
    return ALPHABET[_byte3];
  }).join('');
  return verbose ? "".concat(netName, ":TYPE.").concat(addressType, ":").concat(payload).concat(checksum) : "".concat(netName, ":").concat(payload).concat(checksum).toLowerCase();
}

function decode(address) {
  // don't allow mixed case
  var lowered = address.toLowerCase();
  var uppered = address.toUpperCase();

  if (address !== lowered && address !== uppered) {
    throw new Error('Mixed-case address ' + address);
  }

  var _address$toUpperCase$ = address.toUpperCase().match(/^([^:]+):(.+:)?(.{34})(.{8})$/),
      _address$toUpperCase$2 = _slicedToArray(_address$toUpperCase$, 5),
      netName = _address$toUpperCase$2[1],
      shouldHaveType = _address$toUpperCase$2[2],
      payload = _address$toUpperCase$2[3],
      checksum = _address$toUpperCase$2[4];

  var prefix5Bits = Buffer.from(netName).map(function (_byte4) {
    return _byte4 & 31;
  });
  var payload5Bits = [];

  var _iterator2 = _createForOfIteratorHelper(payload),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _char = _step2.value;
      payload5Bits.push(ALPHABET_MAP[_char]);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var checksum5Bits = [];

  var _iterator3 = _createForOfIteratorHelper(checksum),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _char2 = _step3.value;
      checksum5Bits.push(ALPHABET_MAP[_char2]);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _convertBit = convertBit(payload5Bits, 5, 8),
      _convertBit2 = _toArray(_convertBit),
      version = _convertBit2[0],
      addressBytes = _convertBit2.slice(1);

  if (version !== VERSION_BYTE) {
    throw new Error('Can not recognize version byte');
  }

  var hexAddress = Buffer.from(addressBytes);
  var netId = decodeNetId(netName.toLowerCase());
  var type = getAddressType(hexAddress);

  if (shouldHaveType && "type.".concat(type, ":") !== shouldHaveType.toLowerCase()) {
    throw new Error('Type of address doesn\'t match');
  }

  var bigInt = polyMod([].concat(_toConsumableArray(prefix5Bits), [0], payload5Bits, checksum5Bits));

  if (Number(bigInt)) {
    throw new Error("Invalid checksum for ".concat(address));
  }

  return {
    hexAddress: hexAddress,
    netId: netId,
    type: type
  };
}

module.exports = {
  encode: encode,
  decode: decode
};