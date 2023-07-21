<template>
  <view>
    <!-- subsection -->
    <cfx-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></cfx-action-sheet>
    <view v-if="subsection" class="cfx-p-20">
      <cfx-form :model="form" ref="uForm">
        <cfx-form-item label="选择链" label-width="120">
          <cfx-input v-model="form.chain" type="select" border @click="show = true" />
        </cfx-form-item>
      </cfx-form>
    </view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'u-alert-tips',
  emits: ['click', 'close'],
  props: {
    subsection: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    let actionSheetList = [
      // {
      //   text: '树图公链',
      //   value: 'CONFLUX_MAINNET'
      // },
      {
        text: '树图测试链',
        value: 'CONFLUX_TESTNET',
        wallet: 'cfxtest:aajfzr7sdpnea2wv97ajhzc8mc5aw6e9mj4sr09wk5',
        private: '3ca15c8d280393987d7dc2b8bed04a2456f92a0b364295ee5959d5ff51c48a9b'
      },
      // {
      //   text: '树图联盟链正式',
      //   value: 'CONFLUX_CONSORTIUM_MAINNET'
      // },
      {
        text: '树图联盟链测试',
        value: 'CONFLUX_CONSORTIUM_TESTNET',
        wallet: '0x19034eef6fad0c566ff75793294e6d03ea6f1536',
        private: '0xc1f69a6fae1d34d6e9b9f578ca2823a30c6aeca5677850a26be798efdf3be87b'
      },
      // {
      //   text: 'ESPACE主网',
      //   value: 'ESPACE_MAINNET'
      // },
      {
        text: 'ESPACE测试网',
        value: 'ESPACE_TESTNET',
        wallet: '0xeB9eE0F249A50B22E2b61AB4C81a51c581C60B89',
        private: '66326889af5965d84d55abcaaf99bbc440617c19399b6326d9de27136552cf9b'
      }
    ]

    getApp().globalData.chianItem = actionSheetList[getApp().globalData.chainIndex]

    return {
      actionSheetList,
      current: getApp().globalData.chainIndex,
      show: false,
      form: {
        chain: getApp().globalData.chianItem.text
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    actionSheetCallback(index) {
      let item = this.actionSheetList[index]
      getApp().globalData.chianItem = { ...item }
      this.form.chain = item.text
      this.$emit('chainChange')
    }
  }
}
</script>

<style lang="scss" scoped></style>
