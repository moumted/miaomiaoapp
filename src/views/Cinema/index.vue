<template>
    <div class="main_cinema">
        <div class="cinema_header" @touchmove.prevent @mousewheel.prevent>
            <div class="cinema_title">
                <div class="cinema_city">
                    <router-link tag="span" to="/city">{{cityname}}
                    <i class="iconfont icon-xiabiao"></i>
                    </router-link>
                </div>
                <span class="cinema_name">影院</span>
                <router-link tag="div" to="/cinema/search" class="cinema_search">
                    <i class="iconfont icon--search1"></i>
                </router-link>
            </div>
            <div class="cinema_menu">
                <div class="cinema_area" @click="handlecity()">
                        <span class="active">{{city}}</span>
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
            <ul v-if="!isShow">
                <li class="area_detail" v-for="data in datalist"  @touchmove.prevent @mousewheel.prevent @click="citydetail(data)" :key="data">
                    <div>
                        {{data}}
                    </div>
                </li>
            </ul>
        </div>
        <div class="cinema_list">
            <Loading v-if="isLoading"/>
            <ul v-else>
                <li v-for="data in areaFilter" 
                @click="handlecinema(data.name)" 
                :key="data.cinemaId">
                    <div class="cinema_detail">
                        <p>{{data.name}}</p>
                        <span>{{data.address}}</span>
                    </div>
                    <div class="price">{{data.lowPrice|pricefilter}}元起</div>
                </li>
                <div class="ending">已加载全部影城</div>
            </ul>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import CinemaList from '@/components/CinemaList'
import Loading from '@/components/Loading'
import Vue from 'vue'

Vue.filter("pricefilter",function(data){
    return Math.floor(data*0.01)
}) 
export default {
    name : 'Cinema',
    components:{
        Header,
        Tabbar,
        CinemaList,
        Loading
    },
    data(){
        return{
            cityname:"",
            datalist:["全城"],
            isShow:true,
            isColor:true,
            isLoading:true,
            city:"全城",
            list:[],
            arealist:[],
            cityid:"",
            price:[],
        }
    },
    mounted(){
        var area = window.localStorage.getItem("cityarea")
        if(area){
            this.arealist = JSON.parse(area)
        }
        console.log("123456",document.querySelectorAll('ul')
        )
        this.cityname = localStorage.getItem("cityname")

        // console.log(localStorage.getItem("cityid"));
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
            // this.arealist = res.data.data.cinemas
            if(this.arealist = res.data.data.cinemas){
                this.isLoading = false
            }
            window.localStorage.setItem("cityarea",JSON.stringify(this.arealist))
        }),
        // console.log(localStorage.getItem("cityid"));
        this.cityid = localStorage.getItem("cityid")

        
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
            console.log("aaaaa",this.datalist);
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
            // console.log("123123",data);
            this.city = data
            this.isColor = !this.isColor
            this.isShow = !this.isShow  
            if(this.isColor){
                return document.querySelectorAll('div')[7].style.color = "black"
            }else{
                return document.querySelectorAll('div')[7].style.color = "red"
            }
            document.querySelectorAll('ul')[0].style.display = "none"
            
        },
        // handlecinema(name){
        //     console.log("cinema",name);
        //     this.$store.commit("CINEMA_STATE",name)
        // }
    },
    computed:{
        areaFilter(){
            console.log("cccc",this.arealist);
            var newlist = []
            if(this.city === "全城"){
                newlist = this.arealist
            }else{
                var arr = this.arealist.filter(item=>new RegExp(this.city,"ig").test(item.districtName))
                newlist = arr
            }
            return newlist
        }
    }
}
</script>

<style scoped>
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
    .cinema_list{overflow: hidden;}
    .cinema_list ul{margin-bottom:46px}
    .cinema_list ul li{overflow: hidden;padding:10px;border-bottom: 1px solid rgba(252, 248, 248, 0.966);}
    .cinema_list ul li .cinema_detail{white-space: nowrap;width: 70%;float: left;text-overflow: ellipsis;width: 70%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
    .cinema_list ul li .cinema_detail p{font-size: 15px;white-space: ;}   
    .cinema_list ul li .cinema_detail span{font-size: 10px;color: grey;}         
    .cinema_list ul li .price{width: 70px;float: right;color: red}
    .cinema_list .ending{color: lightgrey;text-align: center;} 
</style>
