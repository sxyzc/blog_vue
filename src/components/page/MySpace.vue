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
            <el-tab-pane label="我的关注" name="follows" tab-click="followsInit"><br>
                  <el-table
                    :data="follows"
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
                            @click="handleEdit(scope.row)">查看</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="deleteFollow(scope.row)">取消关注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="粉丝列表" name="fans"><br>
                  <el-table
                    :data="fans"
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
                            @click="handleEdit(scope.row)">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="我的评论列表" name="comments"><br>
                  <el-table
                    :data="comments"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="content"
                    label="评论内容"
                    width="">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">查看</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="deleteComment(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @current-change="commentChange"
                background
                layout="prev, pager, next"
                :page-size=5
                :total="commentNum">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="标签管理" name="tags">
                <br>
                  <el-table
                    :data="tags"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="tagContent"
                    label="标签名"
                    width="">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="">
                    <template slot-scope="scope">
                            <el-button
                            size="mini" type="danger"
                            @click="deleteTag(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="博客管理" name="blogs">
                <br>
                  <el-table
                    :data="blogs"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="blogTitle"
                    label="博客标题"
                    width="">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="">
                    <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">查看</el-button>
                            <el-button
                            size="mini"
                            @click="updateBlog(scope.row)">编辑</el-button>
                            <el-button
                            size="mini" type="danger"
                            @click="deleteBlog(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>

                <el-pagination @current-change="blogChange"
                background
                layout="prev, pager, next"
                :page-size=5
                :total="blogNum">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="trashBin">
                <br>
                  <el-table
                    :data="trashes"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="blogTitle"
                    label="博客标题"
                    width="">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="">
                    <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="recoverTrash(scope.row)">还原</el-button>
                            <el-button
                            size="mini" type="danger"
                            @click="deleteTrash(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>

                <el-pagination @current-change="blogChange"
                background
                layout="prev, pager, next"
                :page-size=5
                :total="trashNum">
                </el-pagination>
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
        commentNum:2000,
        blogNum:200,
        trashNum:200,
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
        fans: [],
        follows: [],
        comments: [],
        tags: [],
        blogs:[],
        trashes:[]
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
        } else if(this.activeName=='fans'){
          axios({
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
        } else if(this.activeName=='comments'){
          axios({
              url: 'http://39.108.73.165:8080/Blog/theNumberOfCommentYouMake',
              method: 'get',
          })
          .then((response) => {
              console.log("get commentNum data!");
              console.log(response.data)
              this.commentNum=response.data;
              this.commentChange(1);
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        } else if(this.activeName=='tags'){
          axios({
              url: 'http://39.108.73.165:8080/Blog/tagById',
              method: 'get',
          })
          .then((response) => {
              console.log("get tags data!");
              console.log(response.data)
              this.tags=response.data;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        } else if(this.activeName=='blogs'){
          axios({
              url: 'http://39.108.73.165:8080/Blog/numberOfBlog',
              method: 'get',
          })
          .then((response) => {
              console.log("get blogNum data!");
              console.log(response.data)
              this.blogNum=response.data;
              this.blogChange(1);
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        } else if(this.activeName=='trashBin'){
          axios({
              url: 'http://39.108.73.165:8080/Blog/numberOfTrashBinBlog',
              method: 'get',
          })
          .then((response) => {
              console.log("get blogNum data!");
              console.log(response.data)
              this.trashNum=response.data;
              this.trashChange(1);
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        }
      },
      onSubmit() {
        console.log('submit!');
      },
      commentChange(page){
          console.log("now change to"+page);
          axios({
              url: 'http://39.108.73.165:8080/Blog/allCommentYouMade/'+page,
              method: 'get',
          })
          .then((response) => {
              console.log("get comment data!");
              console.log(response.data);
              this.comments=response.data;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
      },
      blogChange(page){
          console.log("now change to"+page);
          axios({
              url: 'http://39.108.73.165:8080/Blog/blog/'+page,
              method: 'get',
          })
          .then((response) => {
              console.log("get blog data!");
              console.log(response.data);
              this.blogs=response.data;
              console.log("get ok");
              console.log(this.blogs);
              console.log("done");
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
      },
      trashChange(page){
          console.log("now change to"+page);
          axios({
              url: 'http://39.108.73.165:8080/Blog/trashBinBlog/'+page,
              method: 'get',
          })
          .then((response) => {
              console.log("get trash data!");
              console.log(response.data);
              this.trashes=response.data;
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
      },
      deleteFollow(row) {
        console.log("delete follow!");
        this.$confirm('是否关注此人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/deleteFollow/'+row.userId,
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
      deleteComment(row) {
        console.log("delete comment!");
        this.$confirm('是否删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/deleteComment/'+row.commentId,
              method: 'get',
          })
          .then((response) => {
              console.log("delete success!");
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.commentChange(1);
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
      deleteTag(row) {
        console.log("delete tag!");
        this.$confirm('是否删除此标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/deleteTag/'+row.tagId,
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
      deleteBlog(row) {
        console.log("delete blog!");
        this.$confirm('是否删除此博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/deleteBlogToTrashBin/'+row.blogId,
              method: 'get',
          })
          .then((response) => {
              console.log("delete success!");
                this.$message({
                    type: 'success',
                    message: '删除成功，已放入回收站!'
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
      updateBlog(row) {
        console.log("update blog!");
        console.log(row.blogId);
        this.$router.push({name:'editblog',params:{blogId:row.blogId}});
      },
      deleteTrash(row) {
        console.log("delete trash!");
        this.$confirm('是否永久删除此博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/deleteBlog/'+row.blogId,
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
      recoverTrash(row) {
        console.log("recover trash!");
        this.$confirm('是否恢复此博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              url: 'http://39.108.73.165:8080/Blog/undoDeleteBlog/'+row.blogId,
              method: 'get',
          })
          .then((response) => {
              console.log("recover success!");
                this.$message({
                    type: 'success',
                    message: '恢复成功!'
                });
                this.tabClick();
          })
          .catch((error) => {
              console.log("【Error】:", error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
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