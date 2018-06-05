<template>
    <div>
        <el-container>
            <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="first">
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
                    <el-button type="primary" @click="updateVisible = true">修改</el-button>
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
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.profile"></el-input>
                </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateVisible = false">确 定</el-button>
              </span>
            </el-dialog>

                
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="second">
                  <el-table
                    :data="myFollowData"
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
            <el-tab-pane label="粉丝列表" name="third">
                  <el-table
                    :data="followData"
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
        activeName: 'second',
        nickName:'user01',
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
        followData: [{
          name: '关注一',
        }, {
          name: '关注二',
        }],
        myFollowData: [{
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },
      handleClick(row) {
        console.log(row);
      },
      handleCancel(row) {
        console.log(row);
      }
    }
  };
</script>