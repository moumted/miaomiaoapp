<template>
    <div>
        <el-table :data="newTableData" stripe style="width: 100%">
            <el-table-column
            prop="date"
            label="注册日期">
            </el-table-column>
            <el-table-column
            prop="userHead"
            label="用户头像"
            width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.userHead" style="width:50px">
                </template>
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            prop="prograss"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row,scope.$index)" type="success" size="small">{{scope.row.isFreeze?'已冻结':'未冻结'}}</el-button>
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small"> 
                    删除
                </el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            background
            :page-size ='pageSize'
            :current-page.sync="currentPage1"
            layout="prev, pager, next"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
import datetime from 'silly-datetime'
import Element from 'element-ui';
import axios from 'axios'
export default {
    name : 'admincenterUser',
    data() {
      return {
          tableData: [],
          currentPage1 : 1,
          pageSize : 5
      }
    },
    mounted(){
        axios.get('/api/admin/userList').then((res)=>{
            console.log("zzzzzzzzzzz",res.data.data.userlist)
            this.handleDate(res.data.data.userlist)
        })
        // axios.get('/api/admin/updateFreeze',{email:'13@qq.com',isFreeze : 'true'}).then((res)=>{
        //     console.log(res.data)
        // })
    },
    computed:{
        newTableData(){
            return this.tableData.slice((this.currentPage1 -1)*this.pageSize ,this.currentPage1*this.pageSize ) || []
        }
    },
    methods:{
        handleDate(data){
            var newlist = [];
            for(var i = 0;i<data.length;i++){
                data[i].date = datetime.format(data[i].date , "YYYY-MM-DD HH:mm:ss")
            }
            // console.log(data);
            this.tableData = data
        },
        handleClick(data,index){
            console.log(data ,index)
            axios.post('/api/admin/updateFreeze',{
                email : data.email,
                isFreeze : !data.isFreeze
            }).then((res)=>{
                if(res.data.status === 0){
                    this.$alert('账号已冻结', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData[index].isFreeze = !data.isFreeze
                        }
                    });
                }else{
                    this.$alert('账号冻结失败', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            })
        },
        deleteRow(index, rows) {
            console.log(index, rows);
            axios.post('/api/admin/deleteList',{
                username : rows[index].username,
                email : rows[index].email
            }).then((res)=>{
                if(res.data.status === 0){
                    this.$alert('删除成功')
                    rows.splice(index, 1);
                }
                else{
                    this.$alert('删除失败')
                }
            })
        }
    }
}
</script>

<style lang="scss">
.page{margin-top:20px}
</style>