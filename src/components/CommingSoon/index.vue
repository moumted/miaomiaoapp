<template>
    <div ref="myactor" class="filmlist">
        <ul>
            <div v-for="data in datalist" @click="handleChange(data.filmId)" :key="data.filmId">
                <li>
                    <div class="film_content">
                        <img :src="data.poster" alt="data.name">
                    </div>
                    <div class="cinema_detail" >
                        <div class="cinema_maindetail">
                            <div style="font-size:0px;">
                                <span style="font-size:14px;font-weight:bold">{{data.name}}</span>
                                <span style="display:inline-block;height:14px;font-size:14px;line-height:14px;color:white;background-color:grey;margin-left:10px">{{data.item.name}}</span>
                            </div>
                            <div class="film_detail">
                                <p v-if="data.grade">观众评分：<span style="color:orange">{{data.grade}}</span></p>
                                <p v-if="data.actors" style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">演员：{{data.actors| actorsfilter}}</p>
                                <p>{{data.nation}}</p>
                            </div>                       
                        </div>
                    </div> 
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter("actorsfilter",function(data){
    var actorlist = data.map(item =>item.name)
    return actorlist.join(" ")
})
export default {
    name:'NowPlaying',
    data(){
        return{
            datalist:[]
        }
    },
    mounted(){
        // console.log("111",this.$refs)
        this.$refs.myactor.style.width = document.documentElement.scrollWidth - 60 +'px'
        axios({
            url:'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=2235856',
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            console.log(res.data.data.films)
            this.datalist = res.data.data.films
        })
    },
    methods:{
        handleChange(id){
            console.log(id,this.$route)
            this.$router.push(`/detail/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.filmlist{
    overflow: hidden;
    ul{   
        margin-bottom: 46px;
        li{
            display: flex;
            align-items: center;
            overflow: hidden;
            padding: 10px;
            .film_content{
                img{
                    float:left;
                    width: 75px;
                    margin-right: 10px
                }
            }
            .cinema_detail{
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .cinema_maindetail{
                    width: 70%;
                    color: grey;
                    font-size: 13px;}
            }
            &::after{content: "购票";
                    width: 50px;
                    height: 25px;
                    color: orange;
                    border: 1px solid orange;
                    line-height: 25px;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 14px;
                    position: absolute;
                    right: 10px;
                    margin-right: 10px;}
        }
        }
}
</style>