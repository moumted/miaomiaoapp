<template>
    <div>
        <ul >
            <li v-for="data in datalist">
                <p>{{data.name}}</p>
                <span>{{data.address}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'CinemaList',
    data(){
        return{
            datalist:[]
        }
    },
    mounted(){
        axios({
            url:`https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=9335601`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            console.log(res.data.data.cinemas)
            this.datalist = res.data.data.cinemas
        })
    }
}
</script>

<style lang="scss" scoped>
div{
    overflow: hidden;
    ul{
        margin-top: 109px;
        margin-bottom:50px;
        li{
            padding:10px ;
            border-bottom: 1px solid rgba(252, 248, 248, 0.966);
            
            p{
                font-size: 15px
            };
            span{
                font-size: 10px;
                color: grey;
            }
        }
    }
}
</style>