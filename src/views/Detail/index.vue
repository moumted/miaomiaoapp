<template>
    <div>
        <div v-if="datalist">
            {{datalist}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Detail',
    data(){
        return{
            datalist:null
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
            this.datalist = res.data.data.film
        })
    },
}
</script>

<style lang="scss" scoped>

</style>