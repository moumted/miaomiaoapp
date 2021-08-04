<template>
    <div class="city_name">
        <mt-index-list ref="mylist" class="city_list">
            <mt-index-section :index="data.index" v-for="data in datalist" :key="data.list.cityId">
                <div @click="handlecitynum(city.cityId)" v-for="city in data.list" :key="city.cityId">
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
        }
    },
    mounted(){
        console.log(this.$refs.mylist.$el.style)
        this.$refs.mylist.$el.style.heigth = document.documentElement.scrollHeight - 300 + 'px',

        axios({
            url:`https://m.maizuo.com/gateway?k=7527648`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16253246714063236630511617","bc":"110100"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res=>{
            console.log(res.data.data.cities)
            this.handleCity(res.data.data.cities)
        })
    },
    methods:{
        handleCity(data){
            // console.log(data)
            var listArr = []
            for(var i=65;i<91;i++){
                listArr.push(String.fromCharCode(i))
            }
            // console.log(listArr)

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
            console.log(newArr) 
            this.datalist = newArr
        },
        handlecitynum(cityid){
            console.log("111",cityid)
            this.$store.commit("cityid",cityid)
            // this.$router.push(`/movie/nowplay`)
        }
    }
}
</script>

<style scoped>

</style>