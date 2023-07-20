"use strict";

try {
  var _require = require('@conflux-dev/conflux-address-rust'),
      _encode = _require.encode,
      decode = _require.decode;

  module.exports = {
    encode: function encode(hexAddress, netId) {
      var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (Buffer.isBuffer(hexAddress)) {
        hexAddress = hexAddress.toString('hex');
      }

      return _encode(hexAddress, netId, verbose);
    },
    decode: decode
  };
} catch (e) {
  // console.log('To gain a address conversion performance boost, install @conflux-dev/conflux-address-rust')
  module.exports = require('./pure-js-cip37.js');
}