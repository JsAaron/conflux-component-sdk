import { Conflux, Drip } from '../sdk/js-conflux-sdk/index'
import BaseProvider from './BaseProvider'
import Request from '../request/index'

class ConfluxProvider extends BaseProvider {
  constructor(options) {
    super(options)
  }

  async accessProvider() {
    if (this.client) {
      return this.client
    }
    this.client = await Conflux.create({
      url: this.requestUrl
    })
  }

  async getBalance(address) {
    await this.accessProvider()
    const balance = await this.client.getBalance(address)
    return balance
  }

  async getAssetsList() {
    return Request({
      url: this.scanUrl + `/v1/token?accountAddress=${this.accountAddress}&fields=iconUrl`,
      method: 'GET'
    })
  }

  //获取交易记录
  async getTransaction(transferType, limit = 20) {
    return new Promise((resove, reject) => {
      let url = ''
      if (this.chainCode == 'CONFLUX_TESTNET') {
        if (transferType == 'ERC721') {
          url = `https://testnet.confluxscan.net/v1/transfer?accountAddress=${this.accountAddress}&limit=${limit}&skip=0&tab=transfers-CRC721&transferType=ERC721`
        }
        if (transferType == 'ERC1155') {
          url = `https://testnet.confluxscan.net/v1/transfer?accountAddress=${this.accountAddress}&limit=${limit}&skip=0&tab=transfers-CRC1155&transferType=ERC1155`
        }
        if (transferType == 'transaction') {
          url = `https://testnet.confluxscan.net/v1/transaction?accountAddress=${this.accountAddress}&limit=${limit}&skip=0&tab=transaction`
        }
      }

      uni.request({
        url: url,
        success: res => {
          resove(res.data)
        },
        fail: reject
      })
    })
  }

  async getStatus() {
    await this.accessProvider()
    return this.client.getStatus()
  }
}

module.exports = ConfluxProvider
