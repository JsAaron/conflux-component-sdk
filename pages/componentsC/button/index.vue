<template>
	<view class="u-demo">
		<view>
			<u-alert-tips type="primary" title="相同 timerId 的按钮一定时间内只能点击1次"></u-alert-tips>
		</view>
		
		<view class="btn-box">
			<u-button @click="btnClick('A1')" timer-id="A">按钮A1</u-button>
			<u-button @click="btnClick('A2')" timer-id="A">按钮A2</u-button>
			<u-button @click="btnClick('A3')" timer-id="A">按钮A3</u-button>
		</view>
		
		<view class="btn-box">
			<u-button @click="btnClick('B1')" timer-id="B">按钮B1</u-button>
			<u-button @click="btnClick('B2')" timer-id="B">按钮B2</u-button>
			<u-button @click="btnClick('B3')" timer-id="B">按钮B3</u-button>
		</view>
		
		<view class="btn-box">
			<u-button @click="btnClick('C1')" timer-id="C">按钮C1</u-button>
			<u-button @click="btnClick('C2')" timer-id="C">按钮C2</u-button>
			<u-button @click="btnClick('C3')" timer-id="C">按钮C3</u-button>
		</view>
		
	</view>
</template>

<script>
	var numObj = {};
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			btnClick(name) {
				if (!numObj[name]) numObj[name] = 0;
				numObj[name]++;
				let str = `按钮 ${name} 被点击 ${numObj[name]} 次`;
				console.log(str);
				this.$u.toast(str);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.btn-box{
		display: flex;
		margin-top: 20rpx;
	}
</style>
