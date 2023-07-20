import cfxConfig from '../conflux/config'
import CfxWeb3 from '../conflux/sdk/index'

let cfxObj = null
let userInfo = null

//相关操作信息
let walletAddress = null
let chainCode = null

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
        reject('请先安装web3钱包')
      }
    })
  },
  saveWallet(item) {
    console.log('🚀 ~ file: cfx.js:31 ~ saveWallet ~ item:', item)
    walletAddress = item.address
    chainCode = item.chainCode
  },
  saveUserInfo(item) {
    console.log('🚀 ~ file: cfx.js:37 ~ saveUserInfo ~ item:', item)
    userInfo = item
    walletAddress = item.accountAddress
    chainCode = item.chainCode
  },
  // 钱包地址
  getWalletAddress() {
    return walletAddress || ''
  },
  //code
  getChainCode() {
    return chainCode || ''
  }
}
