<template>
    <div>
      <el-button slot="append" @click="testLogin" >登录</el-button>
        <el-container>
            <el-main>
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="个人信息" name="information">
              <br>

              <el-form ref="form" :model="form" label-width="160px">
                
                <el-row :gutter="20">
                  <el-col :span="6"><el-form-item label="昵称">
                      {{user.nickName}}
                  </el-form-item></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6"><el-form-item label="邮箱">
                      {{user.eMail}}
                  </el-form-item></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6"><el-form-item label="联系电话">
                      {{user.phoneNumber}}
                  </el-form-item></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6"><el-form-item label="个人简介">
                      {{user.profile}}
                  </el-form-item></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6"><el-form-item>
                    <el-button type="primary" @click="preEdit">修改</el-button>
                </el-form-item></el-col>
                </el-row>
                
                </el-form>

            <el-dialog
              title="修改个人信息"
              :visible.sync="updateVisible"
              width="30%"
              :before-close="handleClose">
              <el-form ref="form" :model="form" label-width="160px">
                <el-form-item label="昵称">
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.eMail"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
                <!-- <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.eMail"></el-input>
                </el-form-item> -->
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="editInformation">确 定</el-button>
              </span>
            </el-dialog>

                
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="follows" tab-click="followsInit">
                  <el-table
                    :data="follows"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="用户名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="handleCancel(scope.row)" type="text" size="small">取消关注</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="粉丝列表" name="fans">
                  <el-table
                    :data="fans"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="用户名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="我的评论列表" name="forth">
                  <el-table
                    :data="myCommentData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="用户名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论我的列表" name="fifth">
                  <el-table
                    :data="commentData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="用户名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        </el-main>
        </el-container>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'information',
        updateVisible:false,
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
        fans: [{
          name: '关注一',
        }, {
          name: '关注二',
        }],
        follows: [{
          name: '我的关注一',
        }, {
          name: '我的关注二',
        }],
        commentData: [{
          name: '评论一',
        }, {
          name: '评论二',
        }],
        myCommentData: [{
          name: '我的评论一',
        }, {
          name: '我的评论二',
        }],
      };
    },
    methods: {
      tabClick(tab, event) {
        console.log("1");
        //console.log(tab.value);
        //console.log(tab, event);
        console.log(this.activeName);
        if(this.activeName=='follows'){
          this.$axios({
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
        } else if(this.activeName=='fans'){
          this.$axios({
              url: 'http://39.108.73.165:8080/Blog/visitFans',
              method: 'get',
          })
          .then((response) => {
              console.log("get fans data!");
              console.log(response.data)
              this.fans=response.data;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        }
      },
      onSubmit() {
        console.log('submit!');
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
        this.$axios({
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
        this.$axios({
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


            this.$axios({
                url: 'http://39.108.73.165:8080/Blog/login',
                method: 'post',
                data: {
                    email: "123@qq.com",
                    password: "123",
                    code: "3"
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