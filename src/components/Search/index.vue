<template>
    <div class="film_search">
        <div class="search">
            <div class="search_content">
                <i class="iconfont icon--search1"></i>
                <input type="text" placeholder="输入电影/电影院名称" v-model="message" >
            </div>
        </div>
        <div>
            <ul>
                <li v-for="data in get" class="search_film">{{data}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'Search',
    data(){
        return{
            message:'',
            datalist:["111","222","433"]
        }
    },
    mounted(){
       
    },
    computed:{
        get(){
           return this.datalist.filter(item=>item.indexOf(this.message)>-1)
        }
    }
}
</script>

<style lang="scss">
.film_search{
    .search{
        height: 35px;
        background-color: rgba(241, 234, 234, 0.897); 
        overflow: hidden;
        .search_content{
            height: 20px;background-color: red ;width: 90%;margin:6px 5% ;
            display: flex;position:relative;
            input{
               height: 20px;width: 100%;border: none;
                line-height: 35px;padding:0 25px;box-sizing: border-box;display:flex;        
            };
            .iconfont{font-size: 13px;position:absolute;top:5px;left:6px;}
        }
    }
    
}
</style>