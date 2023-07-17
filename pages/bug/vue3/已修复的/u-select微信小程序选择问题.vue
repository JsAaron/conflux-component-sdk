<template>
	<view class="content">
	
		<view class="">{{age}}</view>
			<u-select
				v-model="show" 
				:list="agesList" 
				@confirm="confirm" 
				:default-value="defaultValue"
				 mode="single-column"
				>
				</u-select>
			<view style="font-size: 50rpx;font-weight: bold;" @click="clicks">点击选择</view>	
			<text space="ensp">{{ JSON.stringify(data,null,2) }}</text>
			
	</view>
</template>
<script setup>
	import {ref,reactive,onMounted} from 'vue'
	const agesList = reactive([
		{
		   label:'1月',
		   value:1,
		   lock:0,
		   extra:0
		},
		{
		   label:'2月',
		   value:2,
		   lock:1,
		   extra:1
		},
		{
		   label:'3月',
		   value:3,
		   lock:1,
		   extra:1
		},
		{
		   label:'4月',
		   value:4,
		   lock:1,
		   extra:1
		},
		{
		   label:'5月',
		   value:5,
		   lock:1,
		   extra:1
		},
		{
		   label:'6月',
		   value:6,
		   lock:1,
		   extra:1
		},
		{
		   label:'7月',
		   value:7,
		   lock:1,
		   extra:1
		},
		{
		   label:'8月',
		   value:8,
		   lock:1,
		   extra:1
		},
		{
		   label:'9月',
		   value:9,
		   lock:1,
		   extra:1
		}
	])
	const show = ref(false)
	const age = ref('一月')
	var data = reactive({});
	var defaultValue = reactive([]);
	function confirm(e){
		defaultValue = e.map((item, index) => {
			return item.index;
		});
		data = e;
		console.log('e: ', e)
		//你看返回值 第一次选择没问题 第二次再点默认是上一次的选项 点确定extra就没有了
		age.value = e[0].label
	}

	function clicks(){
		show.value = true
		
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	
</style>
