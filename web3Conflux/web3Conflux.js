import { Drip } from './sdk/js-conflux-sdk/index'
import cosNativeSdk from './sdk/native-conflux-sdk/index'
import cosNativeConfig from './cosNativeConfig'
import providerFactory from './provider'

const superagent = require('superagent')

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

  constructor(options) {
    this.options = options
    this.errorCallback = []

    try {
      this.cosNativeObj = cosNativeSdk.createApp({ ...cosNativeConfig })
    } catch (e) {
      this.emitCallback(e)
    }

    //构建内部provider
    if (options.chainCode && options.address) {
      this.provider = providerFactory(options.chainCode, options.address)
    }
  }

  accessProvider(chainCode, address) {
    if (this.provider && this.options.chainCode == chainCode) {
      return this.provider
    }
    this.provider = providerFactory(chainCode, address)
  }

  getStatus() {
    return this.provider.getStatus()
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

  async getNft() {
    return new Promise((resovle, reject) => {
      uni.request({
        url: 'https://testnet.confluxscan.net/stat/nft/checker/preview', //仅为示例，并非真实接口地址。
        data: {
          contractAddress: this.options.address,
          tokenId: this.options.tokenId
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: res => {
          resovle(res.data.data)
        }
      })
    })
  }

  //获取资产列表
  getAssetsList() {
    return this.provider.getAssetsList()
  }

  //交易记录
  getTransaction(transferType, limit) {
    return this.provider.getTransaction(transferType, limit)
  }

  /**
   * 获取余额
   */
  async getBalance({ chainCode, address, format = 'cfx' } = args) {
    this.accessProvider(chainCode, address)
    const balance = await this.provider.getBalance(address)
    if (format == 'cfx') {
      return Drip(balance).toCFX()
    }
    if ((format = 'drip')) {
      return Drip(balance).toGdrip()
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
