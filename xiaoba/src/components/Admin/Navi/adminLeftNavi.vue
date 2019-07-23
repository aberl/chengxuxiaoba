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
            <el-menu-item index="/op/addmodule">新增模块</el-menu-item>
            <el-menu-item index="/op/modifycoursemodule">模块修改</el-menu-item>
            <el-menu-item index="/op/modulelist">模块列表</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">课程</template>
            <el-menu-item index="/op/addcourse">新增课程</el-menu-item>
            <el-menu-item index="/op/modifycourse">课程修改</el-menu-item>
            <el-menu-item index="/op/courselist">课程列表</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>
            视频管理
          </template>
          <el-submenu index="2-1">
            <template slot="title">视频</template>
            <el-menu-item index="/op/addvideo">新增视频</el-menu-item>
            <el-menu-item index="/op/modifyvideo">视频修改</el-menu-item>
            <el-menu-item index="/op/videolist">视频列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">评论</template>
            <el-menu-item index="/op/evaluationlist">评论列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">问题</template>
            <el-menu-item index="/op/questionlist">问题列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <template slot="title">消息</template>
            <el-menu-item index="/op/addvideo">新增视频</el-menu-item>
            <el-menu-item index="/op/modifyvideo">视频修改</el-menu-item>
            <el-menu-item index="/op/videolist">视频列表</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>
            用户管理
          </template>
          <el-submenu index="3-1">
            <template slot="title">用户</template>
            <el-menu-item index="/op/user">用户修改</el-menu-item>
            <el-menu-item index="/op/userlist">用户列表</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>
            材料管理
          </template>
          <el-submenu index="3-1">
            <template slot="title">下载材料</template>
            <el-menu-item index="/op/addmaterial">新增修改</el-menu-item>
            <el-menu-item index="/op/modifymaterial">材料修改</el-menu-item>
            <el-menu-item index="/op/materiallist">材料列表</el-menu-item>
          </el-submenu>
        </el-submenu>
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
