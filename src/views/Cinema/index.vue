<template>
    <div class="main_cinema">
        <div class="cinema_header" @touchmove.prevent @mousewheel.prevent>
            <div class="cinema_title">
                <div class="cinema_city">
                    <router-link tag="span" to="/city">{{cityname}}</router-link>
                    <i class="iconfont icon-xiabiao"></i>
                </div>
                <span class="cinema_name">影院</span>
                <router-link tag="div" to="/cinema/search" class="cinema_search">
                    <i class="iconfont icon--search1"></i>
                </router-link>
            </div>
            <div class="cinema_menu">
                <div class="cinema_area" @click="handlecity()">
                        <span class="active" >全城</span>
                        <i class="iconfont icon-xiabiao"></i>
                </div>
                <div class="cinema_brand">
                    <span>品牌</span>
                    <i class="iconfont icon-xiabiao"></i>
                </div>
                <div class="cinema_feature">
                    <span>特色</span>
                    <i class="iconfont icon-xiabiao"></i>
                </div>
            </div>
        </div>
        <div class="area_search" ref="myarea">
            <ul>
                <li class="area_detail" v-for="data in datalist" v-if="!isShow" @touchmove.prevent @mousewheel.prevent @click="citydetail(data)" :key="data">
                    <div>
                        {{data}}
                    </div>
                </li>
            </ul>
        </div>
        <CinemaList></CinemaList>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import CinemaList from '@/components/CinemaList'
export default {
    name : 'Cinema',
    components:{
        Header,
        Tabbar,
        CinemaList
    },
    data(){
        return{
            cityname:"",
            datalist:["全城"],
            isShow:true,
            isColor:true
        }
    },
    mounted(){
        console.log("123456",document.querySelectorAll('div')[1]
        )
        this.cityname = localStorage.getItem("cityname")

        console.log(localStorage.getItem("cityid"));
        this.cityid = localStorage.getItem("cityid")
        axios({
            url:`https://m.maizuo.com/gateway?cityId=${this.cityid}&ticketFlag=1&k=9335601`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            // console.log(res.data.data.cinemas)
            this.handleDistrict(res.data.data.cinemas)
        })
    },
    methods:{
         handleDistrict(data){
            //  console.log('4561',data)
            var newlist = []
            for(var i in data){
                if(newlist.indexOf(data[i].districtName) == -1){
                    newlist.push(data[i].districtName)
                }
            }
            this.datalist = [...this.datalist,...newlist]
            console.log("aaaaa",newlist);
        },
        handlecity(){
            this.isShow = !this.isShow  
            this.isColor = !this.isColor
            if(this.isColor){
                return document.querySelectorAll('div')[7].style.color = "black"
            }else{
                return document.querySelectorAll('div')[7].style.color = "red"
            }
            var top = document.querySelectorAll('div')[0].offsetTop
            top - this.$refs.myarea.offsetTop
        },
        citydetail(data){
            console.log("123123",data);
            localStorage.setItem("area",data)
        }

    },
    // computed:{
    //     handlecity(){
    //         return document.querySelectorAll('div')[10].style.display = "block"
    //         return document.querySelectorAll('div')[7].style.color = "red"
            
    //     }
    // }
    // computed:{
    //    handle(){
    //         var newlist = [];
    //         for(var i =0;i<this.datalist.length;i++){
    //             newlist = this.datalist
    //         };
            


    //    }    
    // }
    
}
</script>

<style lang="scss" scoped>
    .main_cinema{}
    .cinema_header{width: 100%;height: 107px;}
    .cinema_title{display: flex;padding:0 30px 0 20px;align-items: center;text-align: center;}
    .cinema_title .cinema_city span{font-size: 13px;}
    .cinema_title .cinema_name{flex:2;margin-right: 30px;}
    .cinema_title{height: 60px;background-color: white;}
    .cinema_menu div{flex: 1;}
    .cinema_menu{
        background-color: white;
        display: flex;align-items: center;text-align: center;width: 100%;height: 45px;border: 1px solid rgba(223, 217, 217, 0.925);font-size: 13px;}
    .cinema_menu .cinema_area{color:black}
    .area_search{width: 100%;padding-left:5px;margin-top: 10px;background-color: white;}
    .area_search ul{display: flex;flex-wrap:wrap;}
    .area_search ul .area_detail{height:39px;width: 24.9%;text-align: start;}
    .area_search{position: fixed;top: 107px;}
    .area_search .area_detail div{border: 1px solid rgb(243, 239, 239);width: 90%;text-align: center;font-size: 13px;}
</style>
