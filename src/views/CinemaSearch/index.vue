<template>
    <div>
        <mt-search
            v-model="value"
            cancel-text="取消"
            placeholder="搜索"
            :result="cinemafilter">
        </mt-search>
    </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
export default {
    name:'City',
    data(){
        return{
            value:'',
            datalist:[],
        }
    },
    mounted(){
        axios({
            url:'https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=3932974',
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"310100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            // console.log(res.data.data.cinemas)
            this.cinemaname(res.data.data.cinemas)
        })
    },
    methods:{
        cinemaname(data){
            this.datalist = data.map(item => item.name)
            // console.log(this.list)
        }
    },
    computed:{
        cinemafilter(){
            // console.log(data)
            
            // this.datalist =  newarr
            // console.log(newarr)
        
            var errorlist = ["无搜索结果"]
            var newlist =  this.datalist.filter(value =>new RegExp(this.value,"ig").test(value))
            if(newlist.length > 0){
                return newlist;
            }else{
                return errorlist
            }   
        }
    }
}
</script>

<style scoped>

</style>