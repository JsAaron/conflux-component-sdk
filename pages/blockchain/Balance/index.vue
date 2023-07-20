<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button type="success" @click="getBanlance">点击-无界面UI</cfx-button>
      <cfx-button @click="show1 = true" type="primary">点击-有界面UI</cfx-button>
      <cfx-balance ref="cfxBalance"></cfx-balance>
      <cfx-balance chainCode="CONFLUX_MAINNET"></cfx-balance>
    </view>
  </view>
</template>

<script>
var numObj = {}
export default {
  data() {
    return {
      show1: false,
      show2: false
    }
  },
  methods: {
    getBanlance() {
      this.$refs.cfxBalance.getBalance().then(res => {
        console.log(111, res)
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
