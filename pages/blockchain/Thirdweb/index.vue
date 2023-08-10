<template>
  <cfx-layout bgColor="#rgb(242, 246, 255)"></cfx-layout>
</template>

<script>
// import { MetaMaskWallet } from '@thirdweb-dev/wallets'
// console.log('🚀 ~ file: index.vue:7 ~ MetaMaskWallet:', MetaMaskWallet)
// import { ThirdwebSDK } from '@thirdweb-dev/sdk'
export default {
  data() {
    return {
      show: true
    }
  },
  async onLoad() {
    const rpcUrl = 'https://conflux-espace-testnet.rpc.thirdweb.com'
    // const wallet = new MetaMaskWallet();
    // console.log("🚀 ~ file: index.vue:17 ~ onLoad ~ wallet:", wallet)
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 20rpx;
}
</style>
