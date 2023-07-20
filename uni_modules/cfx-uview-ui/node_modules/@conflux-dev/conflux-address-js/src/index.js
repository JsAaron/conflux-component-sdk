const { encode, decode } = require('./cip37')
const { ...rest } = require('./address-utils')
const { isString } = require('./utils')

/**
 * Check whether a given address is valid, will return a boolean value
 *
 * @param address {string}
 * @return {boolean}
 *
 */
function isValidCfxAddress (address) {
  if (!isString(address)) {
    return false
  }
  try {
    decode(address)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Check whether a given address is valid, if not valid will throw an error
 *
 * @param address {string}
 *
 */
function verifyCfxAddress (address) {
  decode(address)
  return true
}

module.exports = {
  encode,
  decode,
  isValidCfxAddress,
  verifyCfxAddress,
  ...rest
}
