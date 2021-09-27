<template>
        <div>
            <div class="user_title">
                <div class="user_pic"></div>
                <p>管理员</p>
            </div>
            <div class="film_order">
                <router-link tag="span" to="/admincenter">
                    <p>进入管理中心</p>
                    <i>&gt</i>
                </router-link>
            </div>
            <div class="film_version">APP版本信息</div>
            <div class="user_exit" @touchstart="handleTologin">退出登录</div>
            <Tabbar></Tabbar>
        </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
import axios from 'axios'
export default {
    name : 'admin',
    components : {
        Tabbar
    },
    methods:{
        handleTologin(){
            let out = confirm('确认退出')
            if(out){
                axios.get('/api/users/logout').then((res)=>{
                    if(res.data.status === 0){
                        console.log(res.data)
                        this.$router.push('/mine/login')
                    }
                })
            }else{
                return
            }
        },
    },
    beforeRouteEnter(to ,from ,next){
            axios.get('/api/users/getUser').then((res)=>{
                console.log("654564564",res.data)
                // res.data.data.isAdmin;
                if(!res.data.isAdmin){
                    next('/mine/center')
                    return;
                }else{
                    next()
                    
                
                    // if(res.data.data.isAdmin){
                    //     next('/admin')
                    //     return;
                    // }
                    // else{
                    //     next('/mine/center')
                    //     return;
                    // }
                }
            })
        },
}
</script>

<style lang="scss" scoped>
div{
    height: 100vh;
    background-color: rgb(229, 226, 226);
    .user_title{
        background: linear-gradient(to bottom,rgb(7, 7, 7),rgb(131, 130, 130),white);
        height: 200px;
        display: flex;       
        .user_pic{
           margin: 50px 0 0 15px;
           border: 5 px solid black;
           width: 100px;height: 100px;
           background: white;
           border-radius: 50%;           
        };
        p{
            margin-top: 85px;margin-left: 15px;
            font-size: 20px
        }
    };
    .film_order{
        background-color: white;
        padding: 10px 15px 0 15px;
        box-sizing: border-box;
        height: fit-content;
        span{
            display: flex;justify-content: space-between;
            height: 35px;line-height: 35px;
            border-bottom: 1px solid rgb(211, 211, 211);
        }
    };
    .film_version{
        padding: 0px 15px 0 15px;
        box-sizing: border-box;
        background-color: white;
        height: 35px;line-height: 35px;
        margin-top: 20px
    };
    .user_exit{
        margin-top: 20px;color: rgb(199, 91, 91);
        padding: 0px 15px 10px 15px;
        box-sizing: border-box;
        background-color: white;
        height: 35px;line-height: 35px;
    }
}
</style>