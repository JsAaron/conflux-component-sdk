<template>
  <cfx-layout @chainChange="onChainChange">
    <view class="u-demo">交易记录: {{ jiaoyi }}条</view>
    <view class="u-demo">721交易记录: {{ e721 }}条</view>
    <view class="u-demo">1155交易记录: {{ e1155 }}条</view>
  </cfx-layout>
</template>

<script>
import { Web3Conflux } from 'web3Conflux'
export default {
  data() {
    return {
      jiaoyi: 0,
      e721: 0,
      e1155: 0
    }
  },

  async mounted() {
    const chainItem = getApp().getChain()
    this.web3Conflux = new Web3Conflux({
      chainCode: chainItem.value,
      address: 'aas91k2j5bz1pjzht382s04khf9004ayrjcfhpj7yd' || chainItem.wallet
    })

    //交易
    let res_jiaoyi = await this.web3Conflux.getTransaction('transaction')
    this.jiaoyi = res_jiaoyi.data.total

    //721记录
    let res_721 = await this.web3Conflux.getTransaction('ERC721')
    this.e721 = res_721.data.total

    //721记录
    let res_1155 = await this.web3Conflux.getTransaction('ERC1155')
    this.e1155 = res_1155.data.total
  },

  methods: {
    onChainChange(e) {
      console.log(123, e)
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
