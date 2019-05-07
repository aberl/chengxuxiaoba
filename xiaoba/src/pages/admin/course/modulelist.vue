<template>
  <div>
    <el-table :data="tableData" style="width: 100%" @row-click="getDetails">
      <el-table-column prop="createdatetime" label="创建日期"></el-table-column>
      <el-table-column fixed prop="courseName" label="所属课程"></el-table-column>
      <el-table-column fixed prop="name" label="名称"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
          <el-button @click.native.prevent="edit()" type="text" size="small">编辑</el-button>
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
        var _data=[];
        for(var index in state.course.courseModuleList)
        {
          _data.push({
            name:state.course.courseModuleList[index].name,
            courseName:state.course.courseModuleList[index].courseName,
            createdatetime:state.course.courseModuleList[index].createDateTime,
            status:state.course.courseModuleList[index].statusDesc
          });
        }
        return _data;
        }
    })
  },
  inject: ['reload'],
  methods: {
    ...mapActions(["getAllCourseModuleList"]),
    getDetails(row){
     this.rowSelected.name=row.name;
     this.rowSelected.createdatetime=row.createdatetime;
     this.rowSelected.status=row.status;
     this.rowSelected.desc=row.desc;
     console.log(this.rowSelected);
    },
    setDisable(modelId) {},
    edit() {
      this.dialogFormVisible = true;
    },
    cancelEdit() {
      this.dialogFormVisible = false;
    },
    submitForm(){
      this.reload()
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
