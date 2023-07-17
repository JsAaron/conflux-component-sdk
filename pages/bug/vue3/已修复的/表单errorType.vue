<template>
	<view class="app">
		<u-form :model="data.formData" ref="form1" :errorType="data.errorType">
			<u-form-item label="姓名" prop="name"><u-input v-model="data.formData.name" /></u-form-item>
			<u-form-item label="简介" prop="intro"><u-input v-model="data.formData.intro" /></u-form-item>
		</u-form>

		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, unref, computed, watch } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	const form1 = ref();
	const data = reactive({
		formData: {
			name: "",
			intro: ""
		},
		rules: {
			name: [{
				required: true,
				message: '请输入姓名',
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change', 'blur'],
			}],
			intro: [{
				min: 5,
				message: '简介不能少于5个字',
				trigger: 'change'
			}]
		},
		// 文字提示
		// errorType: ['message'],
		// 不提示
		// errorType: ['none'],
		// 文字和下划线提示
		errorType: ['message', 'border-bottom'],
	});

	onReady(() => {
		form1.value.setRules(data.rules);
	});

	const submit = (e) => {
		form1.value.validate(valid => {
			if (valid) {
				uni.showToast({
					title: "验证通过",
					icon: 'none'
				});
				console.log('验证通过');
			} else {
				console.log('验证失败');
			}
		});
	}
</script>