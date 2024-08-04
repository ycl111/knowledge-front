<template>
   
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>运维知识库</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" ><router-link v-router to="/uploadfile" class="router-link-active">知识库上传</router-link></el-menu-item>
          <el-menu-item index="1-2" ><router-link v-router to="/managefile" class="router-link-active">知识库列表</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link v-router to="/search" class="router-link-active">知识库检索</router-link></el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
      
    </el-menu>
  </el-aside>
  



</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .router-link-active {
  text-decoration: none;
  color: #000;
}
</style>

<script>
  export default {
    name: 'LeftHeaderView'
    }
</script>