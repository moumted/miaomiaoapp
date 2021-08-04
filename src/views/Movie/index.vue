<template>
    <div id="movie">
           <Header title="全民电影"></Header>
            <div id="content">
                <div id="movie_menu" ref="mylist" :class="isFixed?'fixed':''" >
                    <router-link tag="div" to="/movie/city" class="cityName" active-class="myactive">
                            <span style="font-size:14px">江苏</span>
                            <i class="iconfont icon-xiabiao"></i>
                    </router-link>
                    <div class="filmSwitch">
                        <router-link tag="div" to="/movie/nowplaying" class="nowplay" active-class="myactive">
                            <span style="font-size:15px">正在热映</span>
                        </router-link>
                        <router-link tag="div" to="/movie/commingsoon" class="commingSoon" active-class="myactive" style="font-size:15px">即将上映</router-link>
                    </div>
                    <router-link tag="div" to="/movie/search" class="search" active-class="myactive">
                        <i class="iconfont icon--search1"></i>
                    </router-link>
            </div>
            <keep-alive>
                <router-view class="filmlist"></router-view>
            </keep-alive>
        </div>     
           <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';


export default {
    name : 'Movie',
    components:{
        Header,
        Tabbar
    },
    data(){
        return{
            isFixed:false
        }
    },

    methods:{
		handleScroll(){
			// console.log(document.documentElement.scrollTop,this.$refs.mylist.scrollHeight + 46)
			if(document.documentElement.scrollTop >= this.$refs.mylist.scrollHeight){
				this.isFixed = true
			}else{

				this.isFixed = false
			}
		},
	},
    mounted(){
        window.onscroll = this.handleScroll
    },
    beforeDestory(){
        window.onscroll = null
    }
}
</script>

<style scoped>
#movie_menu div:hover{cursor: pointer;}
.myactive{color: red;}
#movie #content{}
#content #movie_menu{display: flex;align-items: center;text-align: center;height: 45px;border-bottom: 1px solid rgba(194, 189, 189, 0.925);background-color: white;z-index: 1;}
#movie_menu .cityName{width: 25%;}

#movie_menu .filmSwitch{display: flex;justify-content: space-around;width: 55%;}

#movie_menu .search{width: 20%;}

.fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white
    ;
}
</style>
