<template>
    <div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入标题" v-model="input">
                <el-button slot="append" @click="dialogVisible = true" >发布</el-button>
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
            <span style="float:left;">新的标签: </span>
            </el-col>
            <el-col :span="20">
        <el-tag
        size="mini" 
        :key="tag"
        v-for="tag in dynamicTags"
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
            <el-checkbox-group v-model="checkedLabels" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="my_label in my_labels" :label="my_label" :key="my_label">{{my_label}}</el-checkbox>
            </el-checkbox-group></el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <br>
    <!-- <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor> -->
    <mavon-editor ref=md @save="$save"></mavon-editor>
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
        input: '',
        dialogVisible: false,
        checkedLabels: ['类一', '类二'],
        my_labels: ['类一', '类二', '类三', '类四'],
        
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
        
      };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            //console.log(mavonEditor.markdownIt)
            // this.$alert('<strong>这是 <i>HTML</i> 片段</strong><el-button type="primary">主要按钮</el-button>', 'HTML 片段', {
            //     dangerouslyUseHTMLString: true
            //     });
            console.log(mavonEditor.markdownIt.render()+'@@');
        },
        $save(t_value, t_render){
            console.log('111111');
            console.log(t_value);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.my_labels.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.my_labels.length;
        },
        handleCloseTag(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    //   $imgAdd(pos, $file){
    //         // 第一步.将图片上传到服务器.
    //        var formdata = new FormData();
    //        formdata.append('image', $file);
    //        axios({
    //            url: 'server url',
    //            method: 'post',
    //            data: formdata,
    //            headers: { 'Content-Type': 'multipart/form-data' },
    //        }).then((url) => {
    //            // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
    //            /**
    //            * $vm 指为mavonEditor实例，可以通过如下两种方式获取
    //            * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
    //            * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
    //            */
    //            $vm.$img2Url(pos, url);
    //        })
    //     }
    }
  };
</script>
