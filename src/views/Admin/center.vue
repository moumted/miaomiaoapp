<template>
    <div>
        <el-container>
            <el-header>后台管理中心</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                       
                        class="el-menu-vertical-demo"         
                        >
                        <router-link tag="div" to="/admincenter/user">
                            <el-menu-item index="1">
                                <i class="el-icon-location"></i>
                                <span slot="title">用户管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link tag="div" to="/admincenter/cinema">
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">电影管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link tag="div" to="/admincenter/movie">
                            <el-menu-item index="3">
                                <i class="el-icon-document"></i>
                                <span slot="title">影院管理</span>
                            </el-menu-item>
                        </router-link>
                        </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'admincenter',
    beforeRouteEnter(to ,from ,next){
        axios.get('/api/users/getUser').then((res)=>{
            if(res.data.status === 0){
                next()
            }else{
                next('/mine/login')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    padding-left: 20px;
    line-height: 60px;
    font-size: 25px;
    font-weight: bold;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    // line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>