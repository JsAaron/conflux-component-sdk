import cfxConfig from '../conflux/config'
import CfxWeb3 from '../conflux/sdk'

let cfxObj = null

export default {
  init() {
    return new Promise((resovle, reject) => {
      if (!cfxObj) {
        cfxObj = CfxWeb3.createApp({ ...cfxConfig })
      }
      resovle(cfxObj)
    })
  },
  getContext(callback) {
    if (callback) {
      callback(cfxObj)
    }
    return cfxObj
  }
}
