<template>
    <div class="mine_content">
        <div class="user_info">
            <input type="text" placeholder="请输入手机号"></br>
            <input type="text" placeholder="请输入密码">
        </div>
        <button style="width: 50%;background-color: orange;">登陆</button>
    </div>
</template>

<script>
export default {
    name:'Login'
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