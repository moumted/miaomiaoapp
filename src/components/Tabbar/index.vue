<template>
    <div>
        <div id="footer">
			<ul>
				<router-link to="/movie" tag="li">
					<i class="iconfont icon-film"></i>
					<p>电影</p>
				</router-link>
				<router-link to="/cinema" tag="li">
					<i class="iconfont icon-yingyuan"></i>
					<p>影院</p>
				</router-link>
				<router-link to="/mine" tag="li">
					<i class="iconfont icon-mine"></i>
					<p>我的</p>
				</router-link>
			</ul>
		</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
	i{padding-top: 5px;display: block;}
	#footer ul li.router-link-active{color:red}
    #footer{position: fixed;bottom: 0;left: 0;width: 				100%;height: 45px;border-top: grey 1px solid;
			ul{
				display: flex;text-align: center;height:45px;
				li{
					flex: 1;height: 45px;
					font-size:15px;
					color:darkgrey;
					background-color: white;
					p{
					font-size: 14px;line-height: 14px;
					}
				}
			}	 
	}
</style>