<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button @click="show1 = true" type="primary">获取用户信息</cfx-button>
      <cfx-connect-user v-model="show2"></cfx-connect-user>
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 20rpx;
}
</style>
