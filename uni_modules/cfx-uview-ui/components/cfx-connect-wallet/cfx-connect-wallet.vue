<template>
  <cfx-popup v-model="show" mode="center" length="95%" height="60%" border-radius="20">
    <view class="main">
      <view class="main-title cfx-flex cfx-row-between cfx-border-bottom cfx-p-40">
        <block v-if="walletVar.show">
          <view @click="walletVar.show = false">
            <cfx-icon name="arrow-left" size="30"></cfx-icon>
            <text class="cfx-m-l-10">{{ walletVar.title }}</text>
          </view>
          <cfx-icon name="close" size="30" @click="show = false"></cfx-icon>
        </block>
        <block v-else>
          <text>{{ title }}</text>
          <cfx-icon name="close" size="30" @click="show = false"></cfx-icon>
        </block>
      </view>
      <scroll-view scroll-y="true" class="main-scroll-y">
        <view class="main-grid">
          <!-- 钱包 -->
          <block v-if="walletVar.show">
            <view class="cfx-p-20">
              <view
                class="main-wallet-row cfx-text-left cfx-font-28"
                v-for="item in walletVar.list"
                :key="item.address"
                @click="onWallet(item)"
              >
                <view class="cfx-type-primary">
                  <text>账户名称：{{ item.name }}</text>
                </view>
                <view class="cfx-type-info cfx-m-t-5">
                  <text class="cfx-font-25">{{ item.address }}</text>
                </view>
              </view>
            </view>
          </block>
          <block v-else>
            <!-- 链 -->
            <view
              class="main-row cfx-text-center cfx-border-bottom"
              v-for="item in chainList"
              :key="item.code"
              @click="onChain(item)"
            >
              <image style="width: 100rpx" mode="widthFix" :src="item.icon"></image>
              <view class="main-name">{{ item.name }}</view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
  </cfx-popup>
</template>

<script>
import $cfxcore from '../../libs/core/cfx'
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
    icon: 'http://www.hncfx.com/images/pl1.png'
  },
  {
    name: '树图ESPACE主链',
    code: 'ESPACE_MAINNET',
    icon: 'http://www.hncfx.com/images/ban1.png'
  },
  {
    name: '树图ESPACE测试链',
    code: 'ESPACE_TESTNET',
    icon: 'http://www.hncfx.com/images/team.jpg'
  },
  {
    name: '树图联盟正式链',
    code: 'CONFLUX_CONSORTIUM_MAINNET',
    icon: 'http://www.hncfx.com/images/js.png'
  },
  {
    name: '树图联盟测试链',
    code: 'CONFLUX_CONSORTIUM_TESTNET',
    icon: 'http://www.hncfx.com/images/Android.png'
  }
]

export default {
  name: 'cfx-connect-wallet',
  emits: ['click', 'close'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
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
      chainList: [],
      walletVar: {
        show: false,
        title: '树图公链',
        list: [
          {
            name: 1111,
            address: 'cfx:sdfafasdfasfsaddfasdfasdfasdfdsdfafasdfasfsaddfasdfasdfasdfdsdfafasdfasfsaddfasdfasdfasdfd'
          },
          {
            name: 1111,
            address: 'cfx:vxcvdfgdagsd131231213'
          }
        ]
      }
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

  created() {
    $cfxcore.init()
  },

  methods: {
    geTel(tel) {
      return tel.substring(0, 20) + '****' + tel.substr(tel.length - 20)
    },

    onChain(item) {
      $cfxcore.getContext(cfxContext => {
        cfxContext.getWalletInfo({
          chainCode: item.code,
          refresh: 0,
          success: res => {
            this.walletVar.title = item.name
            this.walletVar.list = res.data.map(item => {
              item.address = this.geTel(item.address)
              return item
            })
            this.walletVar.show = true
            console.log('🚀 ~ file: cfx-connect-wallet.vue:138 ~ onChain ~ res:', res, this.walletVar)
          },
          fail: err => {},
          complete: res => {}
        })
      })
    },

    //选中钱包
    onWallet(item) {
      this.show = false
      this.walletVar.show = false
      console.log(item)
    },

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
  background-color: $cfx-type-info-light;
  // padding: 50rpx;
  &-title {
    font-size: 35rpx;
    font-weight: bold;
    background: #ffffff;
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
    background: #ffffff;
  }
  &-scroll-y {
    height: calc(52vh);
  }
  &-name {
    font-size: 30rpx;
    font-weight: bold;
    margin-top: 10rpx;
  }
  &-wallet-row {
    margin: 0 0 20rpx 0;
    padding: 30rpx 20rpx;
    background: #ffffff;
    box-shadow: 0px 5rpx 10rpx 0rpx rgba(0, 0, 0, 0.09);
    border-radius: 10rpx;
  }
}
</style>
