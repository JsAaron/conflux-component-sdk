<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-count-down ref="uCountDown" class="count-down-demo" :timestamp="timestamp" :format="format" :customStyle="customStyle" @end="end" @change="change"></u-count-down>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">参数配置</view>
			<view class="u-config-item">
				<view class="u-item-title">调整时间</view>
				<u-subsection :list="[60000, 86400000, 983272000]" @change="timestampChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定义样式</view>
				<u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">格式</view>
				<u-subsection current="0" :list="['默认', '毫秒', '中文', '带天']" @change="formatChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">开关</view>
				<u-subsection current="0" :list="['开始', '暂停', '重置']" @change="startChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timestamp: 60000,
			format: "DD:HH:mm:ss",
			customStyle: ""
		};
	},
	methods: {
		timestampChange(index) {
			let arr = [60000, 86400000, 983272000];
			this.timestamp = arr[index];
		},
		formatChange(index) {
			let arr = ["HH:mm:ss", "HH:mm:ss.SSS", "HH时mm分ss秒", "DD天HH时mm分ss秒"];
			this.format = arr[index];
		},
		styleChange(index) {
			if (index == 0) {
				this.customStyle = "color:red;font-size:40rpx";
			} else {
				this.customStyle = "";
			}
		},
		startChange(index) {
			let arr = ["start", "pause", "reset"];
			this.$refs.uCountDown[arr[index]]();
		},
		end() {
			if (this.$refs.uToast) {
				this.$refs.uToast.show({
					title: "倒计时结束",
					type: "warning"
				});
			}
		},

		change(timestamp) {
			//console.log(timestamp);
		}
	}
};
</script>

<style scoped lang="scss">
.count-down-demo {
	justify-content: center;
}
</style>
