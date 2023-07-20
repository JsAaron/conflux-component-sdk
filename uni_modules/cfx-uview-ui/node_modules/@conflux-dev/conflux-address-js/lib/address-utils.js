"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CONST = require('./const');

var _require = require('./utils'),
    isHexString = _require.isHexString,
    isString = _require.isString;
/**
 * Check conflux address's prefix
 *
 * @param address {string}
 * @return {boolean}
 *
 * @example
 */


function hasNetworkPrefix(address) {
  if (!isString(address)) {
    return false;
  }

  var parts = address.toLowerCase().split(':');

  if (parts.length !== 2 && parts.length !== 3) {
    return false;
  }

  var prefix = parts[0];

  if (prefix === CONST.PREFIX_CFX || prefix === CONST.PREFIX_CFXTEST) {
    return true;
  }

  return prefix.startsWith(CONST.PREFIX_NET) && /^([1-9]\d*)$/.test(prefix.slice(3));
}
/**
 * simplify a verbose address(return a non-verbose address)
 *
 * @param address {string}
 * @return {string}
 *
 */


function simplifyCfxAddress(address) {
  if (!hasNetworkPrefix(address)) {
    throw new Error('invalid base32 address');
  }

  var parts = address.toLocaleLowerCase().split(':');

  if (parts.length !== 3) {
    return address;
  }

  return "".concat(parts[0], ":").concat(parts[2]);
}

function shortenCfxAddress(address) {
  var compress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  address = simplifyCfxAddress(address);

  var _address$split = address.split(':'),
      _address$split2 = _slicedToArray(_address$split, 2),
      netPre = _address$split2[0],
      body = _address$split2[1];

  var tailLen = netPre === 'cfx' && !compress ? 8 : 4;
  var pre = body.slice(0, 3);
  var tail = body.slice(body.length - tailLen);
  return "".concat(netPre, ":").concat(pre, "...").concat(tail);
}

function isZeroAddress(address) {
  if (!isHexString(address)) throw new Error('Only hex is allowed');
  return address === CONST.ZERO_ADDRESS_HEX;
}

function isInternalContractAddress(address) {
  if (!isHexString(address)) throw new Error('Only hex is allowed');
  return address === CONST.ADMIN_CONTROL || address === CONST.SPONSOR_CONTROL || address === CONST.STAKING || address === CONST.CONFLUX_CONTEXT || address === CONST.POS_REGISTER || address === CONST.CROSS_SPACE_CALL || address === CONST.PARAMS_CONTROL;
}

function isValidHexAddress(address) {
  return isHexString(address) && address.length === 42;
} // TOOD check address's checksum


function isValidCfxHexAddress(address) {
  if (address.length !== 42) return false;
  if (isZeroAddress(address) || isInternalContractAddress(address)) return true;
  return address.startsWith('0x1') || address.startsWith('0x8');
}

module.exports = {
  hasNetworkPrefix: hasNetworkPrefix,
  simplifyCfxAddress: simplifyCfxAddress,
  shortenCfxAddress: shortenCfxAddress,
  isZeroAddress: isZeroAddress,
  isInternalContractAddress: isInternalContractAddress,
  isValidHexAddress: isValidHexAddress,
  isValidCfxHexAddress: isValidCfxHexAddress
};