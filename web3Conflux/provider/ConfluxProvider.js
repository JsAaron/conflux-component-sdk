import { Conflux, Drip } from '../sdk/js-conflux-sdk/index'
import BaseProvider from './BaseProvider'

class ConfluxProvider extends BaseProvider {
  constructor(options) {
    super(options)
  }

  async createProvider() {
    if (this.client) {
      return this.client
    }
    this.client = await Conflux.create({
      url: this.requestUrl
    })
  }

  async getBalance(address) {
    await this.createProvider()
    const balance = await this.client.getBalance(address)
    return balance
  }
}

module.exports = ConfluxProvider
