})
<template>
  <cfx-layout @chainChange="onChainChange">
    <view class="u-demo">数字资产总数: {{ total }}条</view>
    <view class="u-demo">721交易记录: {{ e721 }}条</view>
    <view class="u-demo">1155交易记录: {{ e1155 }}条</view>
  </cfx-layout>
</template>

<script>
import { Web3Conflux } from 'web3Conflux'
export default {
  data() {
    return {
      total: 0,
      e721: 0,
      e1155: 0
    }
  },

  async mounted() {
    const chainItem = getApp().getChain()
    this.web3Conflux = new Web3Conflux({
      chainCode: chainItem.value,
      address: chainItem.wallet
    })

    //获取资产列表
    this.web3Conflux.getAssetsList().then(res => {
      console.log('🚀 ~ file: index.vue:29 ~ this.web3Conflux.getAssetsList ~ res:', res)
    })
  },

  methods: {
    onChainChange(e) {}
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 20rpx;
}
</style>
