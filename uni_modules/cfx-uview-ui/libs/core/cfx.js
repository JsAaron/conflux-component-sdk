import cfxConfig from '../conflux/config'
import CfxWeb3 from '../conflux/sdk'

let cfxObj = null
let walletInfo = null
export default {
  init() {
    return new Promise((resovle, reject) => {
      if (!cfxObj) {
        cfxObj = CfxWeb3.createApp({ ...cfxConfig })
      }
      resovle(cfxObj)
    })
  },
  getContext() {
    return new Promise((resovle, reject) => {
      if (cfxObj) {
        resovle(cfxObj)
      } else {
        reject(cfxObj)
      }
    })
  },
  saveWallet(item) {
    walletInfo = item
  },
  // 钱包地址
  getWalletAddress() {
    if (!walletInfo) {
      return ''
    }
    return walletInfo.address
  }
}
