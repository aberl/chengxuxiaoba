<template>
  <div>
    <el-table v-bind:data="tableData" style="width: 100%">
      <el-table-column fixed prop="createDateTime" label="创建日期"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="statusDesc" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="goToDetail('/op/modifycourse', tableData[scope.$index].id)"
            type="text"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.getAllCourseList();
  },
  computed: {
    ...mapState({
      tableData: state => state.course.courseList
    })
  },
  methods: {
    ...mapActions(["getAllCourseList"]),
    handleClick() {
    },
    goToDetail(path,id) {
      this.$router.replace({path:path, query:{id:id}});
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
.el-main {
  text-align: center;
}
</style>
