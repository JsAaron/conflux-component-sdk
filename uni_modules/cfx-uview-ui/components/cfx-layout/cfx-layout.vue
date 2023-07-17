<template>
  <view>
    <slot></slot>
  </view>
</template>

<script>
import cfxConfig from '../../libs/conflux/config'
import cfxSdk from '../../libs/conflux/sdk'
export default {
  name: 'u-alert-tips',
  emits: ['click', 'close'],
  props: {},
  data() {
    return {}
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

<style lang="scss" scoped></style>
