import Web3 from 'web3'
import BaseProvider from './BaseProvider'

class ConfluxProvider extends BaseProvider {
  constructor(options) {
    super(options)
  }

  async accessProvider() {
    if (this.client) {
      return this.client
    }
    this.client = new Web3(this.requestUrl)
  }

  async getBalance(address) {
    await this.accessProvider()
    const balance = await this.client.eth.getBalance(address)
    return balance
  }
}

module.exports = ConfluxProvider
