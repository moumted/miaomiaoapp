<template>
    <div id="movie">
        <router-link tag="div" to="/city" class="city">
            {{cityname}}
        </router-link>
        <Header title="全民电影"></Header>
        <div id="content">
            <div id="movie_menu" ref="mylist" :class="isFixed?'fixed':''" >
                <!-- <router-link tag="div" to="/movie/city" class="cityName" active-class="myactive">
                        <span style="font-size:14px">{{cityname}}</span>
                        <i class="iconfont icon-xiabiao"></i>
                </router-link> -->
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
                    <router-view></router-view>
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
            isFixed:false,
            routerlive:true,
            cityname:"",
        }
    },
    mounted(){
        // console.log("bbbbbbb");
        console.log(this.$refs.mylist.style);
        this.cityname = localStorage.getItem("cityname"),
        // console.log(this.cityname);
        
        window.onscroll = this.handleScroll
    },
    beforeDestroy(){
        console.log("bbbbbb");
        window.onscroll = null
    },

    methods:{
        
		handleScroll(){
			// console.log(this.$refs)
			if(document.documentElement.scrollTop >= this.$refs.mylist.scrollHeight){
				this.isFixed = true
			}else{

				this.isFixed = false
			}
		}
	},

}
</script>

<style scoped>
#movie .city{position: absolute; background-color: rgba(169, 169, 169, 0.5);border-radius: 25px; min-width: 50px;height: 25px; text-align: center;line-height: 25px;padding: 2px;margin-top: 10px;margin-left:10px}
#movie_menu div:hover{cursor: pointer;}
.myactive{color: red;}
#movie #content{}
#content #movie_menu{display: flex;align-items: center;text-align: center;height: 45px;border-bottom: 1px solid rgba(194, 189, 189, 0.925);background-color: white;z-index: 1;}
/* #movie_menu .cityName{width: 25%;} */

#movie_menu .filmSwitch{display: flex;justify-content: space-around;width: 85%;}

#movie_menu .search{width: 15%;}

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
