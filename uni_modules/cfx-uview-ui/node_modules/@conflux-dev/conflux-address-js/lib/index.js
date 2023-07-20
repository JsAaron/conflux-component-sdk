"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _require = require('./cip37'),
    encode = _require.encode,
    decode = _require.decode;

var _require2 = require('./address-utils'),
    rest = _extends({}, _require2);

var _require3 = require('./utils'),
    isString = _require3.isString;
/**
 * Check whether a given address is valid, will return a boolean value
 *
 * @param address {string}
 * @return {boolean}
 *
 */


function isValidCfxAddress(address) {
  if (!isString(address)) {
    return false;
  }

  try {
    decode(address);
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Check whether a given address is valid, if not valid will throw an error
 *
 * @param address {string}
 *
 */


function verifyCfxAddress(address) {
  decode(address);
  return true;
}

module.exports = _objectSpread({
  encode: encode,
  decode: decode,
  isValidCfxAddress: isValidCfxAddress,
  verifyCfxAddress: verifyCfxAddress
}, rest);