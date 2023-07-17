<template>
	<view class="u-content">
		<u-parse :html="content" :preview="false"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`
			}
		},
	}
</script>


