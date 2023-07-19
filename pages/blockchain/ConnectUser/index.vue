<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button @click="show1 = true" type="primary">获取用户信息</cfx-button>
      <cfx-connect-user v-model="show1" @click="onClick"></cfx-connect-user>
    </view>

    <view class="list-wrap">
      <cfx-cell-group title-bg-color="rgb(243, 244, 246)" v-for="(item, index) in listData" :key="index">
        <view>{{ item[0] }}：</view>
        <view>
          {{ item[1] }}
        </view>
        <cfx-gap height="30"></cfx-gap>
        <!-- <cfx-cell-item :titleStyle="{ fontWeight: 500 }" :title="item[0]" :key="index" :arrow="false">
          {{ item[1] }}
        </cfx-cell-item> -->
      </cfx-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      listData: []
    }
  },
  methods: {
    onClick(data) {
      let listData = []
      for (let key in data) {
        listData.push([key, data[key]])
      }
      this.listData = listData
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  margin-top: 20rpx;
}
</style>
