<template>
  <cfx-layout>
    <u-popup v-model="show" mode="center" length="95%" height="60%" border-radius="20">
      <view class="main">
        <view class="main-title u-flex u-row-between u-border-bottom u-p-40">
          <text>Connect Wallet</text>
          <u-icon name="close"></u-icon>
        </view>
        <scroll-view scroll-y="true" class="main-scroll-y">
          <view class="main-grid main-col-2">
            <view class="main-row u-text-center u-border-bottom" v-for="item in chainList" :key="item.code">
              <image style="width: 100rpx" mode="widthFix" :src="item.icon"></image>
              <view class="main-name">{{ item.name }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </cfx-layout>
</template>

<script>
import cfxConfig from '../../libs/conflux/config'
import cfxSdk from '../../libs/conflux/sdk'
export default {
  name: 'cfx-connect-wallet',
  emits: ['click', 'close'],
  props: {},
  data() {
    return {
      show: true,
      chainList: [
        {
          name: '树图公链',
          code: 'CONFLUX_MAINNET',
          icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
        },
        {
          name: '树图测试链',
          code: 'CONFLUX_TESTNET',
          icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
        },
        {
          name: '树图ESPACE主链',
          code: 'ESPACE_MAINNET',
          icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
        },
        {
          name: '树图ESPACE测试链',
          code: 'ESPACE_TESTNET',
          icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
        },
        {
          name: '树图联盟正式链',
          code: 'CONFLUX_CONSORTIUM_MAINNET',
          icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
        },
        {
          name: '树图联盟测试链',
          code: 'CONFLUX_CONSORTIUM_TESTNET',
          icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
        }
      ]
    }
  },
  computed: {},
  methods: {
    // 点击内容
    click() {
      this.$emit('click')
    },
    // 点击关闭按钮
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.main {
  // padding: 50rpx;
  &-title {
    font-size: 40rpx;
    font-weight: bold;
    color: $u-type-primary;
  }
  &-row {
    padding: 40rpx;
    color: $u-type-primary;
  }
  &-scroll-y {
    height: calc(52vh);
  }
  &-name {
    font-size: 30rpx;
    font-weight: bold;
    margin-top: 10rpx;
  }
}
</style>
