<template>
  <cfx-layout>
    <u-popup v-model="show" mode="center" closeable length="95%" border-radius="20">
      <view class="main">
        <view class="main-title">Connect Wallet</view>
        <view class="main-grid main-col-2">
          <view class="main-row" v-for="item in chainList" :key="item.code">
            <view>{{ item.name }}</view>
            <image style="width: 100rpx" mode="widthFix" :src="item.icon"></image>
          </view>
        </view>
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
  padding: 30rpx;
  &-title {
  }
  &-row {
    padding: 30rpx;
  }
}
</style>
