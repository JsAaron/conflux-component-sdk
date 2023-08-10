<template>
  <cfx-layout>
    <cfx-tabs :list="list1" @click="click"></cfx-tabs>
  </cfx-layout>
</template>

<script>
import { Web3Conflux } from 'web3Conflux'
export default {
  data() {
    return {
      tabsList: [],
      tabsIndex: 0
    }
  },
  mounted() {
    const chainItem = getApp().getChain()
    console.log('🚀 ~ file: index.vue:18 ~ mounted ~ chainItem:', chainItem)
    // this.web3Conflux = new Web3Conflux({
    //   chainCode: chainItem.value,
    //   address: chainItem.wallet
    // })

    // console.log(
    //   '🚀 ~ file: index.vue:29 ~ mounted ~  this.web3Conflux.getStatus():',
    //   await this.web3Conflux.getStatus()
    // )
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 20rpx;
}
</style>
