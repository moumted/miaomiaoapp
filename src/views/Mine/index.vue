<template>
    <div>
           <Header title="我的全民"></Header>
           <Login></Login>
           <Tabbar></Tabbar>
    </div>
</template>

<script>

import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import Login from '@/components/Login'
export default {
    name:'Mine',
    components:{
        Header,
        Tabbar,
        Login
    }
}
</script>

<style lang="scss">

</style>
