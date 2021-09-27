<template>
    <div>
        <div class="register_title">
            <span>全民影院</span>
            <span>已有账号？立即<router-link tag="a" to="/mine/login" style="color:rgb(238, 36, 36)">登陆</router-link></span>
        </div>
        <div class="form_register">
            <form action="">
                <div style="position:relative">
                    <label style="margin-top:3px">邮箱:</label>                   
                    <input type="text" v-model="email" @input="verifyInfo" style="width:50%;padding-right:75px">
                    <span style="width:85px;text-align:left;position:absolute;right:0px;top:5px;">
                        <a @touchstart="handletime" style="color:red;font-size:15px" v-if="verifyIsShow">发送验证码</a>
                        <span v-if="!verifyIsShow" >{{number}}</span>
                    </span>
                </div>
                <p  v-if="emailinfo" style="text-align:center;margin:5px 0;color:red">邮箱格式错误</p>
                <div>
                    <label>用户名:</label>
                    <input type="text" placeholder="输入你的用户名" v-model="username">
                </div>
                <div>
                    <label>密码:</label>
                    <input type="text" v-model="password">
                </div>
                <div>
                    <label>验证码:</label>
                    <input type="text" v-model="verify">
                </div>
                <p  v-if="verifyinfo" style="text-align:center;margin-bottom:10px;color:red">验证码发送失败</p>
                
                
                <input type="button" value="提交" @touchstart="handleregister" style="background-color:rgb(238, 36, 36);width:100%;height:45px;">
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'register',
    data(){
        return{
            email:'',
            username:'',
            password:'',
            verify:'',
            verifyinfo:'',
            number:'60',
            verifyIsShow : 'true',
            emailinfo:false,
           
        }
    },
    methods : {
        handletime(){
            if(this.disabled){return;}
            axios.get('/api/users/verify?email=' + this.email).then((res)=>{
                var status = res.data.status;
                if(status === -1){
                    var regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                    if(regex.test(this.email)){
                        this.verifyinfo = true
                    }else{
                        this.emailinfo = true;
                    }
                }else{
                    this.disabled = true
                    this.verifyIsShow = false
                        if(this.number >= 0 ){
                            var timer = setInterval(() => {
                                this.number --;
                                if(this.number <= 0){
                                    clearInterval(timer)
                                    
                                    this.verifyIsShow = true
                                    this.number = '60'
                                }
                            }, 1000);
                        }                   
                }
            })
        },
        handleregister(){
            axios.post('/api/users/register',{
                email : this.email,
                username : this.username,
                password : this.password,
                verify : this.verify
            }).then((res)=>{
                console.log("6666",res)
                var status = res.data.status;
                if(status === -3){
                    alert('验证码已过期')
                }else if(status === -2){
                    alert('验证码错误')
                }
                else if(status === -1){
                    alert('注册失败')
                }
                else if(status === -4){
                    alert('此邮箱已注册')
                }else{
                    this.$alert('注册成功')
                    this.$router.push('/mine/login')
                }
            })
        },
        verifyInfo(){
            this.verifyinfo = false
            this.emailinfo = false
        }
    },
}
</script>

<style lang="scss" scoped>
div{
    height: 100vh;
    background-color: rgb(228, 227, 227);
    .register_title{
        border-bottom: 1px solid rgb(212, 212, 212);
        background-color: white;
        padding: 10px;
        height: 50px;
        display: flex;justify-content:space-between;
        align-items: center;
        span{
            clear: both;
            &:nth-child(1){font-size: 32px;font-weight: bold};
            &:nth-child(2){font-size: 15px}
        }
    };
    .form_register{
        display: flex;
        padding: 10px 0 20px 0;margin-top: 5px;
        background-color: white;
        height: auto;
        form{
            width: 95%;
            margin: auto;
            div{
                height: 50px;width: 100%;
                background-color: white;
                label{display: inline-block;text-align: right;width: 70px};
                input{width: 70%;border: none;height: 35px;border-bottom: 1px solid rgb(243, 242, 242);;outline: none;margin-left:5px}
            }
        }
    }
}
</style>