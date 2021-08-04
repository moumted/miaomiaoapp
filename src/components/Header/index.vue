<template>
    <div ref="myheader">
        <div id="header">
			<div class="header_title">
				<span id="">
					<img src="@/assets/maizuo.png" style="width: 35px;height: 35px;">
				</span>
				<h1>{{title}}</h1>
			</div>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
	
    name:'Header',
	props:{
		title:{
			type:String,
			default:"全民目击"
		}
	},
}
</script>
 
<style lang="scss" scoped>
    #header{
			width: 100%;
			height: 60px;
			background-color: palevioletred;
			display: flex;
		}
		.header_title{margin: auto;width:160px;text-align: center;}
		.header_title span{margin-left: 10px;float: left;}
		h1{font-size: 25px;float: right;margin-right: 10px;}
</style>