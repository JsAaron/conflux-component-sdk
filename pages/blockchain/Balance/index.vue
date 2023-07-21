<template>
  <cfx-layout>
    <view class="u-demo">
      <view class="btn-box">
        <cfx-button type="success" @click="getBanlance">点击-获取CFX余额</cfx-button>
      </view>
      <cfx-toast ref="cfxToast" />
    </view>
  </cfx-layout>
</template>

<script>
import { Web3Conflux } from 'web3Conflux'
export default {
  data() {
    return {
      show1: false,
      show2: false
    }
  },
  methods: {
    async getBanlance() {
      const chainItem = getApp().getChain()
      this.web3Conflux = new Web3Conflux()
      const balance = await this.web3Conflux.getBalance({
        format: 'cfx',
        chainCode: chainItem.value || 'CONFLUX_TESTNET',
        address: chainItem.wallet || 'cfxtest:aar8jzybzv0fhzreav49syxnzut8s0jt1a1pdeeuwb'
      })
      this.$refs.cfxToast.show({
        title: `cfx数量：${balance}`,
        type: 'success',
        icon: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 20rpx;
}
</style>
