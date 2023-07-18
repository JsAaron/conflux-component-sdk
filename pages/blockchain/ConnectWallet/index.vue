<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button @click="show = true" type="primary">连接钱包</cfx-button>
      <cfx-connect-wallet chainCode="all" v-model="show"></cfx-connect-wallet>
    </view>
  </view>
</template>

<script>
var numObj = {}
export default {
  data() {
    return {
      show: false
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
