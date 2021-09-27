<template>
<div>
    <Loading v-if="this.isLoading"></Loading>
    <div v-else>
        <transition name="animation">
        <div class="film_detail" v-if="isShow">
            <div v-if="datalist">
                <div class="back" @click="back">back</div>
                <div class="film_title">
                    <div class="poster">
                        <img :src="datalist.poster" alt="">
                    </div>
                    <div class="film_detail">
                        <h4>{{datalist.name}}</h4>
                    </div>
                </div>
            </div>
            <div class="photo_title_bar">
                <div class="photo_title">
                    <span>剧照</span>
                    <span @click="handlePhoto()">全部
                        <span v-if="datalist.photos">({{datalist.photos.length}})&gt</span> </span>
                </div>
                <div class="swiper">
                    <Swiper>
                        <div class="swiper-slide" v-for="(data,index) in datalist.photos" :key="index">
                            <img :src="data" alt="" style="width:150px;">
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
        <div class="film_detail_photos" v-else>
            <div class="photos_all">
                <span @click="goback">&lt</span>
                <span>剧照<p v-if="datalist.photos.length">({{datalist.photos.length}})</p> </span>
            </div>
            <div class="photos">
                <ul>
                    <Swiperphotos>
                        <li class="swiper-slide" v-for="data in datalist.photos">
                            <img :src="data" alt="">
                        </li>
                    </Swiperphotos>
                </ul>
            </div>
        </div>
        </transition>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Swiper from '@/components/Swiper'
import Swiperphotos from '@/components/Swiperphotos'
export default {
    name:'Detail',
    components:{
        Swiper,
        Swiperphotos,
        
    },
    data(){
        return{
            datalist:[],
            isShow:true,
            isLoading:true
        }
    },
    mounted(){
        // console.log("1111",this.$route.params),    
        axios({
            url:`https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=9248571`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res=>{
            console.log(res.data.data.film);
            if(res.data.data.film){
                this.datalist = res.data.data.film
                this.isLoading = false
            }
        })
    },
    methods:{
        handlePhoto(){
            this.isShow = false
        },
        goback(){
            this.isShow = true
        },
        back(){
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    .animation-enter-active{
        animation:move 2s
    }
    .animation-enter-active{
        animation:move 2s reverse
    }
    @keyframes move{
        0%{
            transform : translateY(100px);
            opacity: 0;
        }
        100%{
            transform : translateY(0px);
            opacity: 1;
        }
    }
    .film_detail{
        background-color: rgb(238, 235, 235);position: relative;
        .back{position: fixed;top: 5px;left: 5px;width: fit-content;z-index: 1;height: fit-content;background-color: rgb(122, 121, 121);}
        .film_title{
            .poster{         
                height:200px;position: relative;overflow:hidden;           
                img{
                    display: block;
                    position: absolute;
                    top: -100px;
                    width: 100%;}
            };
            .film_detail{
                margin-top: 10px;
                height: 200px;
                padding: 10px 10px;
                background-color: white
            }
        };
        .photo_title_bar{
            margin-top: 10px;
            .photo_title{
                background-color: white;
                display: flex;justify-content: space-between;padding:15px 15px;
            };
            .swiper{
                background-color: white;
                margin-bottom: 20px;padding-left:15px;
                padding-right:15px;
                .swiper-slide{width: 150px;display: flex;align-items: center;justify-content: center;}
            }
        }

    };
    .film_detail_photos{
        width: 100%;
        height: 100vh;
       
        background-color: black;
        .photos_all{
            color: white;
            margin-bottom: 10px;
            span{
                &:nth-child(1){
                    position: absolute;left:10px
                }
            }
            text-align: center;
            padding:10px 5px 0 5px
            };
        .photos{
            width: 100%;
            display: flex;align-items: center;
            ul{
                
                li{
                                         
                    img{   
                        transform-origin: center center;
                          width: 100%;
                             
                    }
                }
            }
        }
    }
}  
</style>