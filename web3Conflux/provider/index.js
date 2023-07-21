import ConfluxProvider from './ConfluxProvider'

function providerFactory(chainCode, address) {
  //树图链
  if (~chainCode.indexOf('CONFLUX')) {
    return new ConfluxProvider({ address, chainCode })
  }
}
module.exports = providerFactory
