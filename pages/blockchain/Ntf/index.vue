<template>
  <cfx-layout bgColor="#rgb(242, 246, 255)">
    <view class="u-demo">
      <view class="btn-box">
        <cfx-ntf
          type="success"
          v-model="show"
          chainCode="CONFLUX_TESTNET"
          address="cfxtest:achxhxf7mhd1w7ghh3xhy4m2maybxyzrwe345ef6wt"
          tokenId="121"
        ></cfx-ntf>
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
      show: true
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
