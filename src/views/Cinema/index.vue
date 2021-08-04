<template>
    <div>
        <div class="cinema_header">
            <div class="cinema_title">
                <div class="cinema_city">
                    <span>上海</span>
                    <i class="iconfont icon-xiabiao"></i>
                </div>
                <span class="cinema_name">影院</span>
                <router-link tag="div" to="/cinema/search" class="cinema_search">
                    <i class="iconfont icon--search1"></i>
                </router-link>
            </div>
            <div class="cinema_menu">
                <div class="cinema_area">
                    <ul>
                        <span class="active">全城</span>
                        <i class="iconfont icon-xiabiao"></i>
                    </ul>
                </div>
                <div class="cinema_brand">
                 v   <span>品牌</span>
                    <i class="iconfont icon-xiabiao"></i>
                </div>
                <div class="cinema_feature">
                    <span>特色</span>
                    <i class="iconfont icon-xiabiao"></i>
                </div>
            </div>
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
    }
}
</script>

<style lang="scss" scoped>
    .cinema_header{position: fixed;top: 0;left: 0;width: 100%;height: 107px;}
    .cinema_title{display: flex;padding:0 30px 0 20px;align-items: center;text-align: center;}
    .cinema_title .cinema_city span{font-size: 13px;}
    .cinema_title .cinema_name{flex:2;margin-right: 30px;}
    .cinema_title{height: 60px;background-color: white;}
    .cinema_menu div{flex: 1;}
    .cinema_menu{
        background-color: white;
        display: flex;align-items: center;text-align: center;width: 100%;height: 45px;border: 1px solid rgba(223, 217, 217, 0.925);font-size: 13px;}
</style>
