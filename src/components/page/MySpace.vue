<template>
    <div>
        <el-container>
            <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="first">
                <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="昵称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.old_pass"></el-input>
                </el-form-item>
                <el-form-item label="新的密码">
                    <el-input v-model="form.new_pass"></el-input>
                </el-form-item>
                
                <el-form-item label="自我介绍">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                </el-form>
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
        form: {
          name: '',
          old_pass: '',
          new_pass: '',
          desc: ''
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