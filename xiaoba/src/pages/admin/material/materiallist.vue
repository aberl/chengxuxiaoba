<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createdatetime" label="创建日期"></el-table-column>
      <el-table-column fixed prop="courseName" label="所属课程"></el-table-column>
      <el-table-column fixed prop="name" label="名称"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="goToDetail('/op/modifycoursemodule', tableData[scope.$index].id)"
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
    this.getAllCourseModuleList(-1);
  },
  computed: {
    ...mapState({
      tableData: state => {
        var _data = [];
        for (var index in state.course.courseModuleList) {
          _data.push({
            id:state.course.courseModuleList[index].id,
            name: state.course.courseModuleList[index].name,
            courseName: state.course.courseModuleList[index].courseName,
            createdatetime: state.course.courseModuleList[index].createDateTime,
            status: state.course.courseModuleList[index].statusDesc
          });
        }
        return _data;
      }
    })
  },
  methods: {
    ...mapActions(["getAllCourseModuleList"]),
    goToDetail(path, id) {
      console.log(id)
      this.$router.replace({ path: path, query: { id: id } });
    }
  }
};
</script>

<style>
.el-main {
  text-align: center;
}

.el-table {
  height: 100%;
}

.el-table-column {
  width: 25%;
}
</style>
