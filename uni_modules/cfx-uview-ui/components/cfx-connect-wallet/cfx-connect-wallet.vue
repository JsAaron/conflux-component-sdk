<template>
  <view>
    <cfx-popup v-model="visibleSync" mode="center" length="95%" height="60%" border-radius="20" @close="close">
      <view class="main">
        <view class="main-title cfx-flex cfx-row-between cfx-border-bottom cfx-p-40">
          <block v-if="walletVar.show">
            <view @click="walletVar.show = false">
              <cfx-icon v-if="chainList.length > 1" name="arrow-left" size="30"></cfx-icon>
              <text class="cfx-m-l-10">{{ walletVar.title }}</text>
            </view>
            <cfx-icon name="close" size="30" @click="close"></cfx-icon>
          </block>
          <block v-else>
            <text>{{ title }}</text>
            <cfx-icon name="close" size="30" @click="close"></cfx-icon>
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
    <cfx-toast ref="cfxToast" />
  </view>
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
  emits: ['update:modelValue', 'open', 'close'],
  props: {
    title: {
      type: String,
      default: 'Connect Wallet'
    },
    chainCode: {
      type: String,
      default: 'all'
    },
    // ======== v-model ========
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleSync: false,
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

  computed: {
    valueCom() {
      // #ifndef VUE3
      return this.value
      // #endif

      // #ifdef VUE3
      return this.modelValue
      // #endif
    }
  },

  watch: {
    valueCom: {
      immediate: true,
      handler(val) {
        if (val) {
          this.open()
        } else {
          this.close()
        }
      }
    }
  },

  created() {
    $cfxcore.init()
  },

  mounted() {
    // 组件渲染完成时，检查value是否为true，如果是，弹出popup
    this.valueCom && this.open()
  },

  methods: {
    getChainList() {
      let chainCode = this.chainCode
      if (chainCode == 'all') {
        this.chainList = [...CHAINLIST]
      } else {
        let val_arr = chainCode.split(',')
        let chainList = CHAINLIST.filter(item => {
          return val_arr.find(vitem => vitem == item.code)
        })
        if (chainList.length == 1) {
          this.onChain(chainList[0])
        } else {
          this.chainList = chainList
        }
      }
    },

    open() {
      this.getChainList()
      this.change('visibleSync', true)
    },

    close() {
      this.change('visibleSync', false)
    },

    change(param1, status) {
      this[param1] = status
      this.$emit('input', status)
      this.$emit('update:modelValue', status)

      if (status) {
        // #ifdef H5 || MP
        this.timer = setTimeout(() => {
          this.$emit(status ? 'open' : 'close')
        }, 50)
        // #endif
        // #ifndef H5 || MP
        this.$nextTick(() => {
          this.$emit(status ? 'open' : 'close')
        })
        // #endif
      } else {
        this.timer = setTimeout(() => {
          this.$emit(status ? 'open' : 'close')
        }, this.duration)
      }
    },

    geTel(tel) {
      return tel.substring(0, 20) + '****' + tel.substr(tel.length - 20)
    },

    onChain(item) {
      $cfxcore
        .getContext()
        .then(context => {
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
            },
            fail: err => {},
            complete: res => {}
          })
        })
        .catch(() => {
          this.$refs.cfxToast.show({
            title: '请先安装web3钱包',
            type: 'error'
          })
        })
    },

    //选中钱包
    onWallet(item) {
      this.show = false
      this.walletVar.show = false
      console.log(item)
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
