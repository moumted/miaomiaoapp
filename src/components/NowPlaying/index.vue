<template>
    <div ref="myactor" class="film_list">
        <transition name="film_list">
        <Loading v-if="isLoading" />
            <ul v-else
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="20"
                infinite-scroll-immediate-check="false"
                >
                <div v-for="data in datalist" :key="data.filmId" ref="myactor">
                    <li @click="clickChange(data.filmId)">
                        <div class="film_content">
                            <img :src="data.poster" alt="data.name">
                        </div>
                        <div class="cinema_detail">
                            <div class="cinema_maindetail">
                                <div style="font-size:0px;">
                                    <span style="font-size:14px;font-weight:bold">{{data.name}}</span>
                                    <span style="display:inline-block;height:14px;font-size:13px;line-height:14px;color:white;background-color:grey;margin-left:10px">{{data.item.name}}</span>
                                </div>
                                <div class="film_detail">
                                    <p v-if="data.grade">观众评分：<span style="color:orange">{{data.grade}}</span></p>
                                    <p v-if="data.actors" style="width:80%;white-space:nowrap;
                                    word-wrap: break-all;overflow:hidden;text-overflow:ellipsis">演员：{{data.actors| actorsfilter}}</p>
                                    <p>{{data.nation}}</p>
                                </div>                       
                            </div>
                        </div> 
                    </li>
                </div>
                <div v-if="isShow" class="end">——————已经到底了——————</div>
            </ul>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter("actorsfilter",function(data){
    var actorlist = data.map(item =>item.name)
    // console.log(data);
    return actorlist.join(" ")
})
export default {
    name:'NowPlaying',
    data(){
        return{
            datalist:[],
            cityId:" " ,
            id : "1",
            total:"",
            isShow:false,
            isLoading:true
        }
    },
    mounted(){
        this.cityId = localStorage.getItem("cityid")
        // console.log(localStorage,this.cityId);

        // console.log("33333",this.$store.state,this.$store);
        // console.log("111",this.$refs.myactor)
        // this.$refs.myactor.style.width = document.documentElement.scrollWidth - 50 +'px';
        // this.$refs.myactor.style.height = document.documentElement.scrollHeight -45 + 'px'
        // this.$refs.myac.$el.clientHeight = document.documentElement.scrollHeight - 45 +'px',
        axios({
            url:`https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.id}&pageSize=10&type=1&k=8373219`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            // console.log(res.data.data)
            this.datalist = res.data.data.films
            this.total = res.data.data.total
            this.isLoading = false
        })
    },
    methods:{
        clickChange(id){
            // console.log(id)
            this.$router.push(`/detail/${id}`)
        },
        loadMore() {
            // console.log("ending");
            this.loading = true;
            this.id ++;
            axios({
                url:`https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.id}&pageSize=10&type=1&k=5450470`,
                headers:{
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res=>{
                // console.log(res.data.data.films)
                this.datalist = [...this.datalist,...res.data.data.films]
                this.loading = false 
            });
            if(this.datalist.length === this.total){
                this.isShow = true
                return
            }
        }
    }
}
</script>


<style lang="scss" scoped>
// .film_list-enter-active{
//     animation: move 2s;
// };
// .film_list-leave-active{
//     animation: move 2s reverse;
// };
// @keyframes move{
//     0%{
//         transform: translateY(200px);
//         opacity: 0;
//     }
//     100%{
//         transform: translateY(20px);
//         opacity: 1;
//     }
// }
.film_list{
   overflow: hidden;
    ul{
        margin-bottom: 45px;
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
                width: 70%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .cinema_maindetail{
                    width: 100%;
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
        .end{text-align:center;color: rgb(211, 208, 208);}
    }

}
</style>