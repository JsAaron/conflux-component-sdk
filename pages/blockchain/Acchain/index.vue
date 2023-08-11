})
<template>
  <cfx-layout @chainChange="onChainChange">
    <view class="u-demo">链标识: {{ chainItem.value }}</view>
    <view class="u-demo">钱包地址: {{ chainItem.wallet }}</view>
    <view class="u-demo">数字资产总数: {{ total }}个</view>
  </cfx-layout>
</template>

<script>
import { Web3Conflux } from 'web3Conflux'
export default {
  data() {
    return {
      chainItem: {},
      total: 0,
      indexList: []
    }
  },

  async mounted() {
    const chainItem = getApp().getChain()
    this.chainItem = chainItem
    this.web3Conflux = new Web3Conflux({
      chainCode: chainItem.value,
      address: chainItem.wallet
    })

    //获取资产列表
    this.web3Conflux.getAssetsList().then(res => {
      this.total = res.data.total
      this.list = res.data.list
      console.log('🚀 ~ file: index.vue:29 ~ this.web3Conflux.getAssetsList ~ res:', res)
    })
  },

  methods: {
    onChainChange(e) {
      console.log('🚀 ~ file: index.vue:40 ~ onChainChange ~ e:', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 10rpx;
}
</style>
