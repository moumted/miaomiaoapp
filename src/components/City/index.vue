<template>
    <div class="city_name">
        <div class="city_header">
            <span class="city_back" @click="go_back">返回</span>
            <span class="city_title">当前城市</span> 
        </div>
        <div class="city_search">
            <div class="search_city_content">
                <i class="iconfont icon--search1"></i>
                <input type="text" placeholder="输入城市名称" v-model="info">
                <div @click="listShow()" class="search_cancel">取消</div>
            </div>         
        </div>
        <ul class="search_result">
            <li v-for="data in cityFilter" :key="data.cityId" @click="handlecitynum(data.cityId,data.name)">
                {{data.name}}
            </li>
        </ul>
        <mt-index-list ref="mylist" class="city_list">
            <mt-index-section :index="data.index" v-for="data in datalist" :key="data.list.cityId">
                <div @click="handlecitynum(city.cityId,city.name)" v-for="city in data.list" :key="city.cityId">
                    <mt-cell :title="city.name" ></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
export default {
    name:'City',
    data(){
        return{
            datalist:[],
            citylist:[],
            list:[],
            info:"",
        }
    },
    mounted(){
        // console.log(document.querySelectorAll('ul'));
        // this.$refs.mylist.$el.style.heigth = document.documentElement.scrollHeight - 300 + 'px',
        
        axios({
            url:`https://m.maizuo.com/gateway?k=7527648`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"110100"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res=>{
            // console.log("CITY",res.data.data.cities)
            this.list = res.data.data.cities
            this.handleCity(res.data.data.cities)

        })
        
    },
    watch:{
        info(data){
            this.$refs.mylist.$el.style.display = 'none'
            document.querySelectorAll('div')[5].style.display = 'block'
           document.querySelectorAll('ul')[0].style.display = 'block'
        },
    },
    methods:{
        handleCity(data){
            // console.log(data)
            var listArr = []
            for(var i=65;i<91;i++){
                listArr.push(String.fromCharCode(i))
            }
            // console.log("77777",listArr)

            var newArr = []
            for(var j=0;j<listArr.length;j++){
                var arr = data.filter(item=>item.pinyin.slice(0,1) === listArr[j].toLowerCase())
                // console.log(arr) 
                if(arr.length > 0){
                    newArr.push({
                        index:listArr[j],
                        list:arr
                    })
                }
            }
            // console.log("7777",newArr) 
            this.datalist = newArr
            
        },
        handlecitynum(cityid,cityname){
            // console.log("111",cityid)
            // this.$store.commit("cityid",cityid)
            localStorage.setItem("cityid",cityid)
            localStorage.setItem("cityname",cityname)
            this.$router.push(`/movie/nowplay`)
        },
        go_back(){
            this.$router.go(-1)
        },
        listShow(){
            this.$refs.mylist.$el.style.display = 'block';
            document.querySelectorAll('div')[5].style.display = 'none'
            document.querySelectorAll('ul')[0].style.display = 'none'
            
            // let cancel = document.getElementsByTagName("search_cancel")
            // cancel.onclick = function(){
                //     style.display = "none"
            // }
        },
    },

    computed:{
        cityFilter(){
            console.log("6666666",this.list);
            var arr = this.list.filter(item=>new RegExp(this.info,"ig").test(item.name))
            // console.log(arr);
            return arr
        }
    },
}
</script>

<style lang="scss" scoped>
.city_name{
    .city_header{
        height: 50px;text-align:center;position: relative;
        .city_back{background-color: lightgray;border-radius: 30%;text-align: center;position: absolute;left: 10px;top: 15px;width: 37px};
        .city_title{width: 50%;line-height: 50px;}
    };
    .city_search{
        height: 45px;
        background-color: rgba(241, 234, 234, 0.986); 
        overflow: hidden;
        .search_city_content{
            height: 25px;background-color: rgba(241, 234, 234, 0.986) ;width: 90%;margin:8px 5% 7px 5%;
            display: flex;position:relative;
            div{width: 43px;line-height: 25px;text-align: center;display: none};
            input{
               height: 100%;width: 100%;border: none;
                line-height: 35px;padding:0 25px;box-sizing: border-box;display:flex;
                }
            .iconfont{font-size: 13px;position:absolute;top:5px;left:6px;}
        };  
    };
    .search_result{
        display: none;
        li{
            width: 100%;height:50px;line-height: 50px;border-bottom:2px solid rgb(233, 227, 227);margin-left: 10px;
        }
    }
}
</style>