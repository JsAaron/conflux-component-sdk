<template>
	<view>
		<u-button @click="openMaterials">弹出popup</u-button>
		<view v-for="(item, index) in 108" :key="index">{{ item }}</view>
		<!-- 放入材料弹出层 -->
		<u-popup class="materials-popup" v-model="showMaterials" mode="bottom" border-radius="40" :closeable="true" height="1400" :mask="true" :safe-area-inset-bottom="true">
			<view class="popup-container">
				<view class="popup-title">
					<text>请选择所需的材料藏品</text>
				</view>
				<view class="popup-content">
					<scroll-view scroll-y="true" style="height: 1185rpx;" @touchmove.stop.prevent>
						<view class="content-item" v-for="(item, index) in 18" :key="index">
							<text class="item-name">藏品名称</text>
							<text class="item-num">0/2</text>
							<button class="item-btn">去获取</button>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="popup-bottom" @click="showMaterials=false">
				<text>取消</text>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import { reactive, ref } from 'vue'
	// 放入材料弹出层
	const showMaterials = ref(false)
	const openMaterials = () => {
		showMaterials.value = true
	}
</script>

<style lang="less">

</style>
