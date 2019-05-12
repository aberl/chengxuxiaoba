<template>
  <div>
    <el-select @change="courseSelected" v-model="courseId" placeholder="请选择课程">
      <el-option
        v-for="item in this.courseoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select @change="courseModuleSelected" v-model="courseModuleId" placeholder="请选择模块">
      <el-option
        v-for="item in this.coursemoduleoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createdatetime" label="创建日期"></el-table-column>
      <el-table-column fixed prop="name" label="视频名称"></el-table-column>
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
    this.getAllEffectCourseList();
  },
  computed: {
    ...mapState({
      tableData: state => {
        var _data = [];
        for (var index in state.video.videoList) {
          _data.push({
            id:state.video.videoList[index].id,
            name: state.video.videoList[index].name,
            courseName: state.video.videoList[index].courseName,
            createdatetime: state.video.videoList[index].createDateTime,
            status: state.video.videoList[index].statusDesc,
            courseModuleName:this.courseModuleName
          });
        }
        return _data;
      },
      courseoptions: state => {
        var _options = [];
        for (var index in state.course.courseList) {
          _options.push({
            value: state.course.courseList[index].id,
            label: state.course.courseList[index].name
          });
        }
        return _options;
      },
      coursemoduleoptions: state => {
        var _options = [];
        for (var index in state.course.courseModuleList) {
          _options.push({
            value: state.course.courseModuleList[index].id,
            label: state.course.courseModuleList[index].name
          });
        }
        return _options;
      }
    })
  },
  data() {
    return {
      courseId: "",
      courseModuleId: "",
      courseModuleName:""
    };
  },
  methods: {
    ...mapActions([
      "getAllEffectCourseList",
      "getAllCourseModuleList",
      "getAllVideoList"
    ]),
    courseSelected(val) {
      this.getAllCourseModuleList(val);
      this.courseModuleId = "";
    },
    courseModuleSelected(val) {
      this.getAllVideoList({courseModuleId:val, pageNum:1});
    }
  },
  components: {}
};
</script>

<style>
</style>
