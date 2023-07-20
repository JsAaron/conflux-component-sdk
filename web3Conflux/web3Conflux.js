const { Conflux, Drip } = require('js-conflux-sdk')
import cosNativeSdk from './sdk/native-conflux-sdk/index'
import cosNativeConfig from './cosNativeConfig'

const Constant = require('./constant')

/**
 * A sdk of web3Conflux
 * chainCode	CONFLUX_MAINNET	树图公链 Conflux Core(Hydra)
 * chainCode	CONFLUX_TESTNET	树图测试链 Conflux Core(Testnet)
 * chainCode	CONFLUX_CONSORTIUM_MAINNET  树图联盟链正式
 * chainCode	CONFLUX_CONSORTIUM_TESTNET	树图联盟测试
 * chainCode	ESPACE_MAINNET	ESPACE 主网
 * chainCode	ESPACE_TESTNET	ESPACE 测试网
 */
class Web3Conflux {
  static async create(options) {}

  constructor() {
    //内部回调
    this.errorCallback = []
    try {
      this.cosNativeObj = cosNativeSdk.createApp({ ...cosNativeConfig })
    } catch (e) {
      this.emitCallback(e)
    }
  }

  getWallet({ chainCode } = args) {
    return new Promise((resovle, reject) => {
      this.cosNativeObj.getWalletInfo({
        chainCode: chainCode,
        refresh: 0,
        success: res => {
          resovle(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }

  /**
   * 连接 Conflux
   * @param {*} url
   * @returns
   */
  connectConflux(url) {
    return new Conflux({
      url: url,
      networkId: 1,
      logger: console // use console to print log
    })
  }

  /**
   * 转化请求的URl
   */
  transformUrl(chainCode) {
    return Constant.CHAIN_URL[chainCode]
  }

  /**
   * 获取余额
   */
  async getBalance({ chainCode, address, format } = args) {
    const url = this.transformUrl(chainCode)
    const conflux = this.connectConflux(url)
    const balance = await conflux.getBalance(address)
    if (format == 'toCFX') {
      return Drip(balance).toCFX()
    }
    return balance
  }

  watch(eventName, callback) {
    if (eventName == 'error') {
      this.errorCallback.push(callback)
    }
  }

  emitCallback(e) {
    for (let key in errorCallback) {
      errorCallback[key](e).call(this)
    }
  }

  setStorage(key, data) {
    try {
      uni.setStorageSync(key, data)
    } catch (e) {
      console.log('🚀 ~ file: web3Conflux.js:58 ~ Web3Conflux ~ setStorage ~ e:', e)
    }
  }

  getStorage(key) {
    try {
      const value = uni.getStorageSync(key)
      if (value) {
        return value
      }
    } catch (e) {
      console.log('🚀 ~ file: web3Conflux.js:69 ~ Web3Conflux ~ getStorage ~ e:', e)
    }
  }
}

module.exports = Web3Conflux
