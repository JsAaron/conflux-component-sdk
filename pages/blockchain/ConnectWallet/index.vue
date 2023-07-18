<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button @click="show1 = true" type="primary">树图链钱包</cfx-button>
      <cfx-button @click="show2 = true" type="primary">全部链钱包</cfx-button>
      <cfx-connect-wallet chainCode="CONFLUX_MAINNET" v-model="show1"></cfx-connect-wallet>
      <cfx-connect-wallet chainCode="all" v-model="show2"></cfx-connect-wallet>
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
    btnClick(name) {
      if (!numObj[name]) numObj[name] = 0
      numObj[name]++
      let str = `按钮 ${name} 被点击 ${numObj[name]} 次`
      console.log(str)
      this.$u.toast(str)
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
