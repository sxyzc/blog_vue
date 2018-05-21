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
                    :data="tableData"
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
        tableData: [{
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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