try {
  const { encode, decode } = require('@conflux-dev/conflux-address-rust')
  module.exports = {
    encode: function (hexAddress, netId, verbose = false) {
      if (Buffer.isBuffer(hexAddress)) {
        hexAddress = hexAddress.toString('hex')
      }
      return encode(hexAddress, netId, verbose)
    },
    decode
  }
} catch (e) {
  // console.log('To gain a address conversion performance boost, install @conflux-dev/conflux-address-rust')
  module.exports = require('./pure-js-cip37.js')
}
