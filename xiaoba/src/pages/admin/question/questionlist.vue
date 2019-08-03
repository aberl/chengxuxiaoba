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
    <el-table :data="issueList" style="width: 100%">
      <el-table-column prop="createDateTime" label="创建日期"></el-table-column>
      <el-table-column fixed prop="questioner.name" label="提问人"></el-table-column>
      <el-table-column prop="answerCount" label="回复数"></el-table-column>
      <el-table-column prop="simpleContent" label="内容"></el-table-column>
      <el-table-column prop="statusDesc" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showContent(issueList[scope.$index].content, issueList[scope.$index].answerList)"
            type="text"
            size="small"
          >查看</el-button>
          <el-button
            @click="answerissueprompt(issueList[scope.$index].id)"
            type="text"
            size="small"
          >答复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="currentIssueContent" :visible.sync="dialogTableVisible">
      <el-table :data="answerList">
        <el-table-column property="createDateTime" label="回复时间" width="150"></el-table-column>
        <el-table-column property="content" label="回复内容"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      issueList: state => {
        var _data = [];
        for (var index in state.issue.issueList.data) {
          var _temp = state.issue.issueList.data[index];
          var _simpleContent = _temp.content;
          if (_simpleContent.length > 10)
            _simpleContent = _simpleContent.substr(0, 10) + "...";
          _data.push({
            id: _temp.id,
            questioner: _temp.questioner,
            courseName: _temp.courseName,
            statusDesc: _temp.statusDesc,
            content: _temp.content,
            simpleContent: _simpleContent,
            createDateTime: _temp.createDateTime,
            answerList: _temp.answerList,
            answerCount: _temp.answerCount
          });
        }
        return _data;
      },
      result: state => state.issue.result,
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
      dialogTableVisible: false,
      answerList: null,
      currentIssueContent: null,
      courseId: "",
      courseModuleId: "",
      courseModuleName: "",
      videoId: ""
    };
  },
  inject: ["reload"],
  methods: {
    ...mapActions([
      "getAllEffectCourseList",
      "getAllCourseModuleList",
      "getAllVideoList",
      "getAllIssueList",
      "answerIssue",
      "getAllAnswerList"
    ]),
    showContent(content, answerList) {
      this.currentIssueContent = content;
      this.answerList = answerList;
      this.dialogTableVisible = true;
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
      this.getAllIssueList({ videoId: val, pageNum: 1, pagesize: 1000 });
    },

    answerissueprompt(id) {
      this.$prompt("请输入答复", "", {
        showClose: false,
        inputType: "textarea",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S{1,10}$/,
        inputErrorMessage: "答复必须为1-10位"
      })
        .then(async ({ value }) => {
          console.log(id + "|!>" + value);
          await this.answerIssue({
            issueId: id,
            content: value
          });
          if (this.result.code != 0) {
            this.$message.error(this.result.message);
            return;
          } else {
            this.$message({
              message: "回答成功",
              type: "success"
            });
            this.getAllIssueList({
              videoId: this.videoId,
              pageNum: 1,
              pagesize: 1000
            });
          }
        })
        .catch(() => {});
    }
  },
  components: {}
};
</script>

<style>
</style>
