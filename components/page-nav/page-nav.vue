<template>
  <view class="nav-wrap">
    <view class="nav-title">
      <image class="logo vk-logo" src="/static/logo.png" mode="widthFix"></image>
      <!-- <image class="logo" src="https://cdn.uviewui.com/uview/common/logo.png" mode="widthFix"></image> -->
      <view class="nav-info">
        <view class="nav-title__text">cfxView Vue3.0</view>
        <view class="nav-slogan">多平台快速开发UI框架</view>
      </view>
      <!-- 			<image class="logo vk-logo" src="/static/logo.png" mode="widthFix"></image> -->
    </view>
    <view class="nav-desc">
      <view>cfxView Vue3.0 是 uView 的 Vue3.0 版本（由 Conflux 维护，同时兼容 Vue2.0），扩展区块链组件。</view>
      <view class="mt15">cfxView 官网：https://confluxos.cfx.art/doc</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.nav-wrap {
  padding: 15px;
  position: relative;
}

.lang {
  position: absolute;
  top: 15px;
  right: 15px;
}

.nav-title {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.nav-info {
  margin-left: auto;
  margin-right: auto;
}

.nav-title__text {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  color: $cfx-main-color;
  font-size: 25px;
  font-weight: bold;
}

.logo {
  width: 60px;
  /* #ifndef APP-NVUE */
  height: auto;
  /* #endif */
}
.vk-logo {
  margin-left: 30rpx;
  border-radius: 50%;
}

.nav-slogan {
  color: $cfx-tips-color;
  font-size: 14px;
}

.nav-desc {
  margin-top: 10px;
  font-size: 14px;
  color: $cfx-content-color;
}

.mt15 {
  margin-top: 30rpx;
}
</style>
