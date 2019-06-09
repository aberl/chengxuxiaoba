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
    <el-select @change="courseVideoSelected" v-model="videoId" placeholder="请选择视频">
      <el-option
        v-for="item in this.coursevideooptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-table :data="evaluationlist" style="width: 100%">
      <el-table-column prop="createDateTime" label="创建日期"></el-table-column>
      <el-table-column fixed prop="accountName" label="评论人"></el-table-column>
      <el-table-column prop="stars" label="星级"></el-table-column>
      <el-table-column prop="simpleContent" label="内容"></el-table-column>
      <el-table-column prop="statusDesc" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showContent(evaluationlist[scope.$index].content)"
            type="text"
            size="small"
          >查看</el-button>
          <el-button
            @click="showContent(evaluationlist[scope.$index].content)"
            type="text"
            size="small"
          >注销</el-button>
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
      evaluationlist: state => {
        var _data = [];
        for (var index in state.evaluation.evaluationList.data) {
          var _temp = state.evaluation.evaluationList.data[index];
          var _simpleContent = _temp.content;
          if (_simpleContent.length > 10)
            _simpleContent = _simpleContent.substr(0, 10) + "...";
          _data.push({
            id: _temp.id,
            accountName: _temp.accountName,
            courseName: _temp.courseName,
            stars: _temp.stars,
            content: _temp.content,
            simpleContent: _simpleContent,
            createDateTime: _temp.createDateTime,
            statusDesc: _temp.statusDesc
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
      },
      coursevideooptions: state => {
        var _options = [];
        for (var index in state.video.videoList.data) {
          _options.push({
            value: state.video.videoList.data[index].id,
            label: state.video.videoList.data[index].name
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
      courseModuleName: "",
      videoId: ""
    };
  },
  methods: {
    ...mapActions([
      "getAllEffectCourseList",
      "getAllCourseModuleList",
      "getAllVideoList",
      "getAllEvaluationList"
    ]),
    showContent(content) {
      this.$alert(content, "", {
        confirmButtonText: "确定"
      });
    },
    courseSelected(val) {
      this.getAllCourseModuleList(val);
      this.courseModuleId = "";
      this.videoId = "";
    },
    courseModuleSelected(val) {
      this.getAllVideoList({ courseModuleId: val, pageNum: 1, pagesize: 1000 });
      this.videoId = "";
    },
    courseVideoSelected(val) {
      this.getAllEvaluationList({ videoId: val, pageNum: 1, pagesize: 1000 });
    }
  },
  components: {}
};
</script>

<style>
</style>
