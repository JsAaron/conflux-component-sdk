<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-connect-wallet @click="btnClick('A1')" timer-id="A">按钮A1</cfx-connect-wallet>
    </view>
  </view>
</template>

<script>
var numObj = {}
export default {
  data() {
    return {}
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
