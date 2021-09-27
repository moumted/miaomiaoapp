<template>
    <div class="mine_content">
        <div class="content_title">
            登陆开启新世界
        </div>
        <div class="user_info"> 
            <input type="text" placeholder="请输入用户名" v-model="username" @input="changeInfo"></br>
                       
            <input type="password" placeholder="请输入密码" v-model="password" @input="changeInfo">
            <input type="text" placeholder="请输入验证码" v-model="imgCode">
            <img  src="/api/users/imgCode" @click="handletoVerifyImg">
            </br>
        </div>
        <!-- <div class="alert-danger" v-if="passwordalert">
        密码错误
        </div> -->
        <div class="alert-danger" v-if="useralert">
        请输入正确的用户名
        </div>
        <button style="width: 95%;height:45px;background-color: red;margin-top:20px" @click="handlelogin">登陆</button>
        <div class="login_detail">
            <router-link tag="span" to="/mine/register">立即注册</router-link>
            <router-link tag="span" to="/mine/findpassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
// import 'jquery/dist/jquery.slim.min.js'

// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/js/bootstrap.js';
// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { MessageBox } from 'mint-ui';
export default {
    name:'Login',
    data(){
        return{
            username:"",
            password:"",
            // passwordalert : "",
            useralert : "",
            imgCode : '',
            delatTime : 1
        }
    },
    watch:{
        info(data){
            console.log(data);
        },
    },
    // mounted(){
    //     var timer = setInterval(() => {
    //         axios.get('/api/users/imgCode?' + this.delatTime);

    //     }, 1000);
    // },
    methods:{
        handlelogin(){
            if(this.username === ""){
                // this.passwordalert = false
                this.useralert = true;
                return
            };
            axios.post('/api/users/login',{
                username : this.username,
                password : this.password,
                imgCode : this.imgCode
            }).then((res)=>{
                console.log("66666666666",res.data)
                this.$store.commit('LOGINSTATE',res.data)
                if(res.data.status === -1){
                    // this.passwordalert = true
                    MessageBox.alert('密码错误', '提示');
                }else if(res.data.status === -2){
                    this.$alert('此账号已冻结')
                }else if(res.data.status === -3){
                    this.$alert('验证码错误')
                }
                else{
                    axios.get('/api/users/getUser').then((res)=>{
                        console.log(res.data.data.isAdmin);
                        if(res.data.isAdmin){
                            this.$router.push('/admin')
                        }else{
                            this.$router.push('/mine/center')
                        }
                    })
                }
            });
            
        },
        changeInfo(data){
            // this.passwordalert = false
            this.useralert = false
            
        },
        handletoVerifyImg(data){
            // console.log(data);
            data.target.src = '/api/users/imgCode?' + Math.random();
            // this.$refs.imgCode.src = '/api/users/imgCode'
        }
    },
    beforeRouteEnter(to,from,next){
        axios.get('/api/users/getUser').then((res)=>{
            if(res.data.status === 0 ){
                next('/admin')
            }else{
                next()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.mine_content{
    margin-top: 50px;
    text-align: center;
    width: 100%;
    .content_title{
        height:45px;line-height: 45px;font-weight: bold;color: rgb(27, 19, 19);
        background: linear-gradient(to left,white,rgba(245, 201, 201, 0.5),rgb(218, 217, 217),rgba(243, 207, 207, 0.5),white);
    }
    .user_info{
        margin: 10px 5px;
        input{
            outline: none;
            width: 100%;
            height: 45px;
            border: none;
            border-bottom: 1px solid rgb(206, 205, 205)
        };
        img{height: 45px;width: fit-content;margin-bottom: -30px}
    };
    .alert-danger{
        color: red;font-size: 13px
    };
    .login_detail{
        margin: 5px 10px;
        font-size: 13px;
        color: rgb(156, 7, 7);display: flex;
        justify-content: space-between;
    }
}
</style>