<template>
    <div>
        <ul >
            <li v-for="data in arealist">
                <div class="cinema_detail">
                    <p>{{data.name}}</p>
                    <span>{{data.address}}</span>
                </div>
                <div class="price">{{data.lowPrice|pricefilter}}元起</div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

Vue.filter("pricefilter",function(data){
    return Math.floor(data*0.01)
}) 

export default {
    name:'CinemaList',
    data(){
        return{
            datalist:[],
            arealist:[],
            cityid:"",
            price:[]
        }
    },
    mounted(){
        console.log(localStorage.getItem("cityid"));
        this.cityid = localStorage.getItem("cityid")
        axios({
            url:`https://m.maizuo.com/gateway?cityId=${this.cityid}&ticketFlag=1&k=9335601`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            // this.datalist = res.data.data.cinemas
            // console.log(res.data.data.cinemas)
            this.areaFilter(res.data.data.cinemas)
        })
    },
    methods:{
        areaFilter(data){
            var area = localStorage.getItem("area")
            if(localStorage.getItem("area") === "全城"){
                this.arealist = data
            }else{
                var arr = data.filter(item=>new RegExp(area,"ig").test(item.districtName))
                this.arealist = arr
            }
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    overflow: hidden;
    ul{
        
        margin-bottom:50px;
        li{ 
            overflow: hidden;
            padding:10px ;
            border-bottom: 1px solid rgba(252, 248, 248, 0.966);
            .cinema_detail{
                white-space: nowrap;
                width: 70%;
                float: left;
                text-overflow: ellipsis;
               p{
                font-size: 15px；
                }; 
                span{
                    font-size: 10px;
                    color: grey;
                }
            };
            .price{
                width: 70px;
                float: right;
                color: red
            }
        }
    }
}
</style>