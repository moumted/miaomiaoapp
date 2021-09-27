<template>
    <div>
        <div class="title">
            <span style="font-weight:normal;font-size:15px;height:20px;width:30px;border-radius:50%;background-color:grey;margin-right:10px" @click="back">返回</span>
            <span>密码修改</span>  
        </div>
        <div class="passwordFind">
            <div class="email">
                <span>邮箱：</span>
                <input type="text" v-model="email" placeholder="请输入你的邮箱" @input="handleInfo">
                <span class="sendVerify" v-if="verifyIsShow"  @click="handleVerify">发送验证码</span>
                <p v-if="!verifyIsShow">{{number}}</p>
            </div>
            <p v-if="emailinfo">请输入正确的邮箱 </p>
            <div class="verify">
                <span>验证码：</span>
                <input type="text" v-model="verify" placeholder="请输入验证码">
            </div>
            <div class="password">
                <span>密码：</span>
                <input type="text" v-model="password" placeholder="请输入你的重置密码">
            </div>
            
                <p v-if="verifyinfo">验证码发送失败</p>
            
            <div class="submit">
                <input type="submit" value="提交" @click="handlePassword">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'findPassword',
    data(){
        return{
            email : '',
            verify : '',
            password : '',
            number : '60',
            verifyinfo : false,
            emailinfo : false,
            verifyIsShow : true
        }
    },
    methods : {
        handleVerify(){
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
        handlePassword(){
            axios.post('/api/users/findPassword',{
                email:this.email,
                password : this.password,
                verify : this.verify
            }).then((res)=>{
                var status = res.data.status
                if(status === 0){
                    alert('修改成功')
                    this.$router.push('/mine/login')
                }else{
                    alert('修改失败')
                }
            })
        },
        back(){
            this.$router.back()
        },
        handleInfo(){
            this.verifyinfo = false;
            this.emailinfo = false;
        }
    }
}
</script>

<style lang="scss" scoped>
p{color: red;font-size: 15px;margin-bottom: 2px;}
.email{position: relative;}
.email input{padding-right: 100px;box-sizing: border-box;}
.email .sendVerify{width: fit-content;position: absolute;right: 20px;}
.email p{position: absolute;right: 20px;width: 70px;text-align: center;}
div{
    .title{height: 70px;line-height: 70px;font-size: 25px;font-weight: bold;padding-left: 20px;box-shadow: 0px 2px 20px 6px rgb(136, 135, 135);}
    .passwordFind{
        text-align:center;
        margin: 30px 10px 0 10px ;
        div{
            display: flex;align-items: center;
            width: 100%;height:45px;
            span{
                width: 70px;text-align: right;font-size: 15px;
                line-height: 0px
            };
            input{
                width: 90%;height: 28px;border: none;outline: none;border-bottom: 1px solid rgb(199, 196, 196);
            }
        };
        .submit{
            input{
                width: 100%;height:45px;background: rgb(243, 63, 63);box-shadow: 1px 1px 1px 1px black
                }
        }
    }
}
</style>