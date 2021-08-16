<template>
    <div class="mine_content">
        <div class="user_info">
            <input type="text" placeholder="请输入手机号"></br>
            <input type="text" placeholder="请输入密码">
        </div>
        <button style="width: 50%;background-color: orange;">登陆</button>
        <div>
            {{handle(locationMsg)}}
        </div>
    </div>
</template>

<script>

export default {
    name:'Login',
    data(){
        return{
            locationMsg:''
        }
    },

    mounted() {
        // 获取位置信息
        this.getCity();
    },
  methods: {
    getCity() {
      const getLocation = new BMap.Geolocation();
      var _this = this;
      getLocation.getCurrentPosition((position) => {
        // position中存放所有的定位数据
        console.log(position);
        // 这里获取的是城市和省
        let city = position.address.city;
        let province = position.address.province;
        _this.locationMsg =  city;
      }, () => {
        _this.locationMsg = '定位失败!';
      }, {provider: 'baidu'});
    },
    handle(data){
        var isTrue = ""
        if(data.search("市") === -1){
            isTrue = 'false'
        }else{
            isTrue = 'ture'
        }
        // console.log("7777",isTrue,data.search("市"))
        // console.log(data.slice(0,data.search("市")))
        var newdata = ''
        if(isTrue === false){
            newdata = data
        }else{
            newdata = data.slice(0,data.search("市"))
        }
        console.log("7777",newdata);
        return newdata
    }
  }
}
</script>

<style lang="scss" scoped>
.mine_content{
    text-align: center;
    .user_info{
        margin: 20px;
        input{
            width: 70%;
        };
    }
}
</style>