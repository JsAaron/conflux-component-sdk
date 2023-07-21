import ConfluxProvider from './ConfluxProvider'
import Web3Provider from './Web3Provider'

function providerFactory(chainCode, address) {
  //树图链
  if (~chainCode.indexOf('CONFLUX')) {
    return new ConfluxProvider({ address, chainCode })
  }
  return new Web3Provider({ address, chainCode })
}
module.exports = providerFactory
