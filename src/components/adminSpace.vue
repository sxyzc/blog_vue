<template>
    <div>
      <el-button slot="append" @click="testLogin" >登录</el-button>
        <el-container>
            <el-main>
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="用户管理" name="users">
                <br>
                  <el-table
                    :data="users"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="nickName"
                    label="用户名"
                    width="">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="">
                    <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="checkUser(scope.row)">查看</el-button>
                            <el-button
                            size="mini" type="danger"
                            @click="deleteUser(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>

                <el-pagination @current-change="userChange"
                background
                layout="prev, pager, next"
                :page-size=5
                :total="userNum">
                </el-pagination>

                <el-dialog
                title="用户详细信息"
                :visible.sync="userVisible"
                width="30%"
                :before-close="handleClose">
                    <el-form ref="form" :model="form" label-width="160px">
                        
                        <el-form-item label="昵称">
                            {{user.nickName}}
                        </el-form-item>
                        <el-form-item label="邮箱">
                            {{user.eMail}}
                        </el-form-item>
                        
                        <el-form-item label="联系电话">
                            {{user.phoneNumber}}
                        </el-form-item>
                        
                       
                        <el-form-item label="个人简介">
                            {{user.profile}}
                        </el-form-item>
                        
                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="userVisible = false">取 消</el-button> -->
                        <el-button type="primary" @click="userVisible = false">关 闭</el-button>
                    </span>
                </el-dialog>

            </el-tab-pane>
        </el-tabs>
        </el-main>
        </el-container>
    </div>
</template>
<script>
    import axios from "axios";
  export default {
    data() {
      return {
        userNum:200,
        activeName: 'users',
        userVisible:false,
        form: {
          nickName: '',
          password: '',
          phoneNumber: '',
          profile: null,
          eMail:''
        },
        user: {
          nickName: '',
          phoneNumber: '',
          profile: null,
          eMail:''
        },
        users:[]
      };
    },
    methods: {
      tabClick() {
        console.log("1");
        //console.log(tab.value);
        //console.log(tab, event);
        console.log(this.activeName);
        if(this.activeName=='follows'){
          axios({
              url: 'http://39.108.73.165:8080/Blog/visitFollows',
              method: 'get',
          })
          .then((response) => {
              console.log("get follows data!");
              console.log(response.data)
              this.follows=response.data;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        } else if(this.activeName=='users'){
          axios({
              url: 'http://39.108.73.165:8080/Blog/admin/numberOfUser',
              method: 'get',
          })
          .then((response) => {
              console.log("get userNum data!");
              console.log(response.data)
              this.userNum=response.data;
              this.userChange(1);
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        }
      },
      checkUser(row) {
        console.log('submit!');
        this.userVisible=true;
        this.user=row;
      },
      userChange(page){
          console.log("now change to"+page);
          axios({
              url: 'http://39.108.73.165:8080/Blog/admin/allUsers/'+page,
              method: 'get',
          })
          .then((response) => {
              console.log("get user data!");
              console.log(response.data);
              this.users=response.data;
              console.log("get ok");
              console.log(this.users);
              console.log("done");
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
      },
      deleteUser(row) {
        console.log("delete blog!");
        this.$confirm('是否删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/admin/deleteUser/'+row.userId,
              method: 'get',
          })
          .then((response) => {
              console.log("delete success!");
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.tabClick();
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleClick(row) {
        console.log("1");
        console.log(row);
        console.log(row.value);
        console.log("2");
      },
      handleCancel(row) {
        console.log(row);
      },
      handleClose(){
        console.log("close");
      },
      followsInit(){
        console.log("follows");
      },
      getInformation(){
        axios({
              url: 'http://39.108.73.165:8080/Blog/getUserData',
              method: 'get',
          })
          .then((response) => {
              console.log("get user data!");
              console.log(response.data)
              this.user=response.data;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
      },
      preEdit(){
        this.form=this.user;
        this.updateVisible=true;
      },
      editInformation(){
        this.form.userId=3;
        console.log("update user!");
        axios({
              url: 'http://39.108.73.165:8080/Blog/updateUserData',
              method: 'post',
              data:this.form
          })
          .then((response) => {
              console.log("get user data!");
              console.log(response)
              this.user=this.form;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
          this.updateVisible=false;
      },
      testLogin() {
            console.log('login!');


            axios({
                url: 'http://39.108.73.165:8080/Blog/login',
                method: 'post',
                data: {
                    email: "123456@qq.com",
                    password: "123456",
                    code: "1"
                }
            })
            .then((response) => {
                console.log("response: ");
                console.log(response);
                if (response.status === 200) {
                    this.$notify({
                        title: '成功',
                        message: '登录成功!',
                        type: 'success'
                    });
                } else {
                    console.log("no 200!");
                    console.log(response.status);

                }
            })
            .catch((error) => {
                this.$notify({
                    title: '失败',
                    message: '登录失败: ' + '请重试!',
                    type: 'error'
                });
                console.log("【Error】:", error);
            });
        },
    },
    mounted(){
            console.log("mounted!");
            this.getInformation();
    }
  };
</script>