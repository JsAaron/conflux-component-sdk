<template>
	<view class="wrap">
		<u-parse :html="content" :tag-style="style"></u-parse>
		<p>22</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
				style: {
					// 字符串的形式
					p: 'color: red;font-size:32rpx',
					span: 'font-size: 30rpx'
				}
			};
		},
		methods: {

		},
		computed: {

		}
	};
</script>

<style lang="scss" scoped>

</style>