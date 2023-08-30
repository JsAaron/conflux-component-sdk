<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button @click="onConnectWallet" type="primary">连接Fluent钱包</cfx-button>
      <view style="height: 20rpx"></view>
      <!-- <cfx-connect-wallet chainCode="CONFLUX_MAINNET" v-model="show1"></cfx-connect-wallet>
      <cfx-connect-wallet chainCode="all" v-model="show2"></cfx-connect-wallet> -->
      <view>{{ currentAccount }}</view>
    </view>
  </view>
</template>

<script>
import { Web3Conflux } from 'web3Conflux'
export default {
  data() {
    return {
      currentAccount: ''
    }
  },

  async onLoad() {},

  methods: {
    onConnectWallet() {
      this.web3Conflux = new Web3Conflux({
        chainCode: 'CONFLUX_TESTNET'
      })
      //连接Fluent钱包
      this.web3Conflux.connectFluentWallet()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  flex-direction: column;
}
</style>
