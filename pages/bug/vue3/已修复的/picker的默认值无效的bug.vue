<template>
	<view class="app">
		<u-picker mode="time" v-model="data.show" :default-time="data.time" :params="data.params" @confirm="confirm"></u-picker>
		<button @click="data.show=true">显示</button>
		{{ data.time }}
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, unref, computed, watch } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	const data = reactive({
		show: false,
		time: "2022-05",
		params: {
			year: true,
			month: true,
			day: false,
			hour: false,
			minute: false,
			second: false
		},
	});
	const confirm = (e) => {
		data.time = `${e.year}-${e.month}`;
	}
</script>