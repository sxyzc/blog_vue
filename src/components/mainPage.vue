<template>
  <div>
  
      <h1>最受欢迎的博客用户</h1>
    
        
    <el-row :gutter="20">
      <el-col :span="3"> &nbsp;</el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>user01</h1>
          <p>5000人关注|100篇文章</p>
          <el-button type="primary">进入Ta的博客</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>user02</h1>
          <p>5000人关注|100篇文章</p>
          <el-button type="primary">进入Ta的博客</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>user03</h1>
          <p>5000人关注|100篇文章</p>
          <el-button type="primary">进入Ta的博客</el-button>
        </el-card>
      </el-col>
      <el-col :span="3"> &nbsp;</el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="3"> &nbsp;</el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>user01</h1>
          <p>5000人关注|100篇文章</p>
          <el-button type="primary">进入Ta的博客</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>user02</h1>
          <p>5000人关注|100篇文章</p>
          <el-button type="primary">进入Ta的博客</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>user03</h1>
          <p>5000人关注|100篇文章</p>
          <el-button type="primary">进入Ta的博客</el-button>
        </el-card>
      </el-col>
      <el-col :span="3"> &nbsp;</el-col>
    </el-row>

<br><br>

      <h1>推荐文章</h1>
    
        
    <el-row :gutter="20">
      <el-col :span="3"> &nbsp;</el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>文章A</h1>
          <p>作者A</p>
          <el-button type="primary">查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>文章B</h1>
          <p>作者B</p>
          <el-button type="primary">查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>文章C</h1>
          <p>作者B</p>
          <el-button type="primary">查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="3"> &nbsp;</el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="3"> &nbsp;</el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>文章A</h1>
          <p>作者A</p>
          <el-button type="primary">查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>文章B</h1>
          <p>作者B</p>
          <el-button type="primary">查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h1>文章C</h1>
          <p>作者B</p>
          <el-button type="primary">查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="3"> &nbsp;</el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
