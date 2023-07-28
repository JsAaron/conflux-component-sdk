<template>
  <view>
    <view class="cfx-ntf" :style="[customStyle]">
      <image class="cfx-ntf-image" :src="nftItem.image"></image>
      <view class="cfx-ntf-name">{{ nftItem.name }}</view>
    </view>
  </view>
</template>

<script>
// const { Conflux } = require('../../libs/conflux/src')
import { Web3Conflux, Constant } from 'web3Conflux'
// const { Conflux, Drip } = require('../../node_modules/js-conflux-sdk')

export default {
  name: 'cfx-connect-wallet',
  emits: ['update:modelValue', 'open', 'close', 'click'],
  props: {
    //是否有界面
    modal: {
      type: Boolean,
      default: true
    },
    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    chainCode: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    tokenId: {
      type: String,
      default: ''
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
      nftItem: {}
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
        //无界面
        if (!this.modal) {
          return
        }
      }
    }
  },

  created() {},

  async mounted() {
    this.web3Conflux = new Web3Conflux({
      chainCode: this.chainCode,
      address: this.address,
      tokenId: this.tokenId
    })
    const resNft = await this.web3Conflux.getNft()
    this.nftItem = { ...resNft.detail.metadata }
    console.log('🚀 ~ file: cfx-ntf.vue:92 ~ mounted ~ resNft:', resNft.detail.metadata)
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.cfx-ntf {
  padding: 50rpx;
  background: #ffffff;
  box-shadow: 0px 5rpx 10rpx 0rpx rgba(0, 0, 0, 0.09);
  border-radius: 20rpx;
  &-image {
    width: 500rpx;
    height: 500rpx;
  }
  &-name {
    padding-top: 20rpx;
  }
}
</style>
