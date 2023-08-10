const EventEmitter = require('events')
import Constant from '../constant'

class BaseProvider extends EventEmitter {
  constructor(options) {
    super()
    this.address = options.address
    this.accountAddress = options.address
    this.chainCode = options.chainCode
    this.tokenId = options.tokenId
    this.requestUrl = Constant.CHAIN_URL[options.chainCode]
    this.scanUrl = Constant.SCAN_URL[options.chainCode]
  }
}

module.exports = BaseProvider
