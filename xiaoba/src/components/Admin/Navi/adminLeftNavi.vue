<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :default-active="activeIndex"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>课程管理
          </template>
          <el-submenu index="1-1">
            <template slot="title">模块</template>
            <el-menu-item index="/op/modulelist">模块列表</el-menu-item>
            <el-menu-item index="/op/addmodule">新增模块</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">课程</template>
            <el-menu-item index="/op/addcourse">新增课程</el-menu-item>
            <el-menu-item index="/op/addcourse">课程列表</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>
            视{{this.$router.path}}频管理
          </template>
          <el-submenu index="2-1">
            <template slot="title">视频</template>
            <el-menu-item index="2-1-1">新增视频</el-menu-item>
            <el-menu-item index="2-1-2">视频列表</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-menu-item index="3">
          <i class="el-icon-menu"></i>用户管理
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>消息管理
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>评论管理
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>问答管理
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    activeIndex: function() {
      if (this.$route.path) {
        return this.$route.path;
      } else return "";
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
</style>
