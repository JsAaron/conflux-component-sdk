
exports.isHexString = function (v) {
  return typeof v === 'string' && v.match(/^0x[0-9A-Fa-f]*$/)
}

exports.isString = function (data) {
  return typeof data === 'string'
}
