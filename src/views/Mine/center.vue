<template>
    <div>
        <div class="user_title">
            <div class="user_pic">
                <img :src="this.$store.state.Mine.userHead" @click="actionsheet" alt="">
                <mt-actionsheet
                    :actions="actions"
                    v-model="sheetVisible">
                </mt-actionsheet>
            </div>
            <p>{{this.$store.state.Mine.name}}</p>
        </div>
        <div class="film_order">
            <span>
                <p>电影订单</p>
                <i>&gt</i>
            </span>
            <span>
                <p>商品订单</p>
                <i>&gt</i>
            </span>
            <span>
                <p>余额</p>
                <i>&gt</i>
            </span>
            <span>
                <p>设置</p>
                <i>&gt</i>            
            </span>
        </div>
        <div class="userHead" style="display:none">
            <input type="file" name="file" @change="handleToUpload">
        </div>
        <div class="film_version">APP版本信息</div>
        <div class="user_exit" @touchstart="handleTologin">退出登录</div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
    name : 'center',
    data(){
        return{
            actions : [
                {
                    name : '选取图片',
                    method : this.getPicture
                }
            ],
            sheetVisible : false,
            file : ''
        }
    },
    methods:{
        handleTologin(){
            let out = confirm('确认退出')
            if(out){
                axios.get('/api/users/logout').then((res)=>{
                    if(res.data.status === 0){
                        console.log(res.data)
                        this.$store.commit('USERNAME',{
                            name : '',
                            userHead : ''
                        });
                        this.$router.push('/mine/login')
                    }
                })
            }else{
                return
            }
        },
        actionsheet(){
            this.sheetVisible = true
        },
        getPicture(){
            // console.log(document.querySelectorAll('input')[0]);
           document.querySelectorAll('input')[0].click()
        },
        handleToUpload(ev){
            this.file = ev.target.files[0];
            console.log(ev.target);
            var param = new FormData();
            param.append('file', this.file);
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            };

           
            axios.post('/api/users/uploadUserHead', param , config).then((res)=>{
                console.log(res.data)
                var status = res.data.status;
                if(status === 0){
                    MessageBox.alert('头像上传成功').then(action => {
                        if(action === 'confirm'){
                            this.$store.commit('USERNAME',{
                                userHead : res.data.data.userHead + '?' + Math.random(),
                                name : this.$store.state.Mine.name
                            })
                        }
                    });
                }
                else{
                    MessageBox.alert('头像上传失败')
                }
            })
        }
    },
    beforeRouteEnter(to , from ,next){
        axios.get('/api/users/getUser').then((res)=>{
            var status = res.data.status;
            console.log("1231231231231",res.data.data)
            if(status === 0){
                next(vm =>{
                    vm.$store.commit('USERNAME',{
                        name :res.data.data.username ,
                        userHead : res.data.data.userHead
                        })
                })  
            }else{
                next('/mine/login')
            }
        })
    }
}
</script>

<style lang="scss" scoped>

div{
    
    .user_title{
        background: linear-gradient(to bottom,rgb(209, 1, 1),rgb(238, 100, 100),white);
        height: 200px;
        display: flex;       
        .user_pic{
           margin: 50px 0 0 15px;
           border: 5 px solid black;
           width: 100px;height: 100px;
           background: white;
           border-radius: 50%;   
           img{height: 100px;width:100px;border-radius: 50%}      
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
    .userHead{
        height: 50px;
    };
    .film_version{
        margin: 0px 15px 0 15px;
        box-sizing: border-box;
        background-color: white;
        height: 35px;line-height: 35px;
        margin-top: 20px;
        border-bottom: 1px solid rgb(211, 211, 211);
    };
    .user_exit{
        margin-top: 20px;color: rgb(199, 91, 91);
        margin: 0px 15px 10px 15px;
        box-sizing: border-box;
        background-color: white;
        height: 35px;line-height: 35px;
        border-bottom: 1px solid rgb(211, 211, 211);
    }
}
</style>