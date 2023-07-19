import cfxConfig from '../conflux/config'
import CfxWeb3 from '../conflux/sdk'

let cfxObj = null
let walletInfo = null
let userInfo = null
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
  saveUserInfo(item) {
    userInfo = item
    console.log('🚀 ~ file: cfx.js:30 ~ saveUserInfo ~ userInfo:', userInfo)
  },
  // 钱包地址
  getWalletAddress() {
    if (!walletInfo) {
      return ''
    }
    return walletInfo.address
  }
}
