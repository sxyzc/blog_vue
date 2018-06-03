


<template>
    <div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入标题" v-model="blogTitle">
                <el-button slot="append" @click="prePublish" >发布</el-button>
                <el-button slot="append" @click="testLabel" >添加标签</el-button>
                <el-button slot="append" @click="getTags" >输出标签</el-button>
                <el-button slot="append" @click="testLogin" >登录</el-button>
            </el-input>
        </div>
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

        <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <!-- <el-row>
            <el-col :span="6"> -->
        <h3 style="text-align:left">发布博客</h3>
        <!-- </el-col>
        </el-row> -->
        <br>
        <div>
            <el-row><el-col :span="4">
            <span style="float:left;">新建标签: </span>
            </el-col>
            <el-col :span="20">
        <el-tag
        size="mini" 
        :key="tag"
        v-for="tag in newTags"
        closable
        :disable-transitions="false"
        @close="handleCloseTag(tag)">
        {{tag}}
        </el-tag>
        <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ New Tag</el-button>
        </el-col></el-row>
        
        </div>
        <br>
        <div>
            <el-row><el-col :span="4">
            
        <span style="float:left;">已有标签: </span></el-col>    
        
            <el-col :span="20">
            <el-checkbox-group v-model="checkedTags" @change="handleCheckedTagsChange">
                <el-checkbox v-for="my_label in tags" :label="my_label" :key="my_label">{{my_label}}</el-checkbox>
            </el-checkbox-group></el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="publish">确 定</el-button>
        </span>
        </el-dialog>
        <br>
    <!-- <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor> -->
    <mavon-editor v-model="blogContent" ref=md @save="$save"></mavon-editor>
    </div>
</template>

<style>
  .el-tag + .el-tag {
    /* margin-left: 10px; */
    margin:2px 3px;
  }
  .button-new-tag {
    /* margin-left: 10px; */
    height: 20px;
    line-height: 18px;
    padding-top: 0;
    padding-bottom: 0;
    margin:2px 3px;
  }
  .input-new-tag {
    width: 90px;
    /* margin-left: 10px; */
    margin:2px 3px;
    /* height: 20px;
    line-height: 18px; */
    vertical-align: bottom;
  }
</style>
<script>

 // const labelOptions = ;
  export default {
    data() {
      return {
        dialogVisible: false,
        checkedTags: [],
        tags: [],
        
        newTags: [],
        newTagIds:[],
        tagIds:[],
        inputVisible: false,
        inputValue: '',
        blogContent:'',
        blogTitle:''
        
      };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            console.log(mavonEditor.markdownIt.render()+'@@');
        },
        prePublish(){
            this.dialogVisible = true;
        },
        publish(){
            console.log("publish!");
            this.dialogVisible = false;
            console.log(this.blogTitle);
            console.log(this.checkedTags);
            console.log(this.newTags);
            console.log(this.blogContent);

            if(this.newTags.length>0){
                this.$axios({
                    url: 'http://39.108.73.165:8080/Blog/createTag',
                    method: 'post',
                    data: {
                        tagContent: this.newTags,
                    }
                })
                .then((response) => {
                    console.log("create tag!");
                    console.log(response.data)
                    this.newTagIds=response.data;
                    this.createBlog();
                })
                .catch((error) => {
                    this.$notify({
                        title: '失败',
                        message: '创建标签失败: ' + '请重试!',
                        type: 'error'
                    });
                    console.log("【Error】:", error);
                });
            }
            else 
            this.createBlog();
        },
        createBlog(){
            console.log("create blog!");
            var allTags=[];
            for(var i=0;i<this.newTagIds.length;i++)
                allTags.push(this.newTagIds[i]);
            for(var i=0;i<this.checkedTags.length;i++){
                for(var j=0;j<this.tags.length;j++){
                    if(this.tags[j]==this.checkedTags[i])allTags.push(this.tagIds[j]);
                }
            }
            console.log("ok!");
            this.$axios({
                url: 'http://39.108.73.165:8080/Blog/createBlog',
                method: 'post',
                data: {
                    blogContent: this.blogContent,
                    blogTitle: this.blogTitle,
                    tags: allTags
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.$notify({
                        title: '成功',
                        message: '发布博客成功!',
                        type: 'success'
                    });
                }
            })
            .catch((error) => {
                this.$notify({
                    title: '失败',
                    message: '发布失败: ' + '请重试!',
                    type: 'error'
                });
                console.log("【Error】:", error);
            });
        },
        getTags(){
            console.log("get tags!");
            this.$axios({
                url: 'http://39.108.73.165:8080/Blog/tagById',
                method: 'get',
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.tags=[];
                    this.tagIds=[];
                    for(var i=0;i<response.data.length;i++){
                        this.tags.push(response.data[i]['tagContent']);
                        this.tagIds.push(response.data[i]['tagId']);
                    }
                }
            })
            .catch((error) => {
                this.$notify({
                    title: '失败',
                    message: '读取标签失败: ' + '请重试!',
                    type: 'error'
                });
                console.log("【Error】:", error);
            });
        },
        testLabel() {
            console.log('create Label!');

            this.$axios({
                url: 'http://39.108.73.165:8080/Blog/createTag',
                method: 'post',
                data: {
                    tagContent: "php",
                }
            })
            .then((response) => {
                console.log("create tag!");
                console.log(response);
                if (response.status === 200) {
                    this.$notify({
                        title: '成功',
                        message: '创建标签成功!',
                        type: 'success'
                    });
                } else {
                    console.log(response.status);
                }
            })
            .catch((error) => {
                this.$notify({
                    title: '失败',
                    message: '创建标签失败: ' + '请重试!',
                    type: 'error'
                });
                console.log("【Error】:", error);
            });
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
        $save(t_value, t_render){
            console.log('save markdown!');
            console.log(t_value);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleCheckedTagsChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.tags.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.tags.length;
        },
        handleCloseTag(tag) {
            this.newTags.splice(this.newTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.newTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
       
    },
    mounted(){
            console.log("mounted!");
            this.getTags();
    }
  };
</script>



