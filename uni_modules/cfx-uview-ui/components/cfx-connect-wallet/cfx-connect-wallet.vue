<template>
  <cfx-layout>
    <u-popup v-model="show" mode="center" length="95%" height="60%" border-radius="20">
      <view class="main">
        <view class="main-title cfx-flex cfx-row-between cfx-border-bottom cfx-p-40">
          <text>{{ title }}</text>
          <u-icon name="close" @click="show = false"></u-icon>
        </view>
        <scroll-view scroll-y="true" class="main-scroll-y">
          <view class="main-grid main-col-2">
            <view class="main-row cfx-text-center cfx-border-bottom" v-for="item in chainList" :key="item.code">
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
/**
 * cfx-connect-wallet 钱包连接
 */
const CHAINLIST = [
  {
    name: '树图公链',
    code: 'CONFLUX_MAINNET',
    icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
  },
  {
    name: '树图测试链',
    code: 'CONFLUX_TESTNET',
    icon: 'http://inews.gtimg.com/newsapp_ls/0/13801174710_200200/0'
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
export default {
  name: 'cfx-connect-wallet',
  emits: ['click', 'close'],
  props: {
    title: {
      type: String,
      default: 'Connect Wallet'
    },
    chainCode: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      show: true,
      chainList: []
    }
  },
  watch: {
    chainCode: {
      immediate: true,
      handler(val) {
        if (val == 'all') {
          this.chainList = [...CHAINLIST]
        } else {
          let val_arr = val.split(',')
          this.chainList = CHAINLIST.filter(item => {
            return val_arr.find(vitem => vitem == item.code)
          })
        }
      }
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
    color: $cfx-type-primary;
  }
  &-grid {
    :active {
      background-color: $cfx-type-primary-light;
    }
  }
  &-row {
    padding: 40rpx;
    color: $cfx-type-primary;
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
