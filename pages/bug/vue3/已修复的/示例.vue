<template>
	<view class="app">
		
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, unref, computed, watch } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	const data = reactive({
		name: "",
		intro: ""
	});
</script>