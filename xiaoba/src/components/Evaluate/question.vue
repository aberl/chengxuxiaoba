<template>
  <div>
    <div class="container" v-if="questionWindowDisply">
      <form>
        <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          maxlength="20"
          show-word-limit
          :rows="2"
          placeholder="请输入向老师提问的内容"
          v-model="postForm.issue"
        ></el-input>
        <div style="margin: 20px 0;"></div>
        <el-button type="primary" :disabled="!(this.canBeSubmit && this.userInfo.permissions[this.PERMISSION.SUBMITISSUE])" @click="submitIssue">提交问题</el-button>
      </form>
    </div>
    <div>
      <div class="p-3">
        <small class="d-block text-right">
          <el-button
            @click="displayQuestionWindow"
            type="primary"
            round
            v-if="questionSubmitButtonDisplay && this.userInfo.permissions[this.PERMISSION.SUBMITISSUE]"
          >我要提问</el-button>
        </small>
        <div v-for="issue in issueList" :key="issue.id">
          <div class="media">
            <el-button type="warning" circle>{{issue.index}}楼</el-button>&nbsp;&nbsp;
            <p class="media-body text-left">
              <strong class="d-block">{{issue.questioner.name}}</strong>
              {{issue.content}}
            </p>
          </div>
          <div class="border-bottom">
            <div class="d-flex justify-content-between">
              <small class="text-muted">
                <!-- <el-badge :value="issue.answerCount" class="item" v-if="issue.answerCount>0">
                  <span class="iconfont ai-icondayihuifu" @click="getAnswerList(issue.id)"></span>
                </el-badge> 
                <span class="iconfont ai-icondayihuifu" v-else></span>-->
              </small>
              <small class="text-muted">{{issue.createDateTime}}</small>
            </div>
            <div v-if="issue.answerList.length>0">
              <el-divider content-position="center">老师答复</el-divider>
              <div v-for="answer in issue.answerList" :key="answer.id">
                <el-row>
                  <el-col :span="4">
                    <el-badge :value="answer.index" class="item">
                      <span class="iconfont ai-icondayihuifu"></span>
                    </el-badge>
                  </el-col>
                  <el-col :span="20">{{answer.content}}</el-col>
                </el-row>
                <div class="d-flex justify-content-between">
                  <small class="text-muted"></small>
                  <small class="text-muted">{{answer.createDateTime}}</small>
                </div>
                <br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getIssueList();
    this.getIssueCount();
  },
  watch: {
    totalCount(count) {
      this.getIssueCount();
    }
  },
  props: {
    videoId: String
  },
  data() {
    return {
      currentPageNum: 1,
      pagesizes: [20, 40, 60, 80, 100],
      pageSize: 10000,
      questionWindowDisply: false,
      questionSubmitButtonDisplay: true,
      postForm: {
        name: "",
        issue: null
      },
      input: "",
      textarea: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      issue: state => state.issue.issue,
      issueList: state => state.issue.issueList.data,
      result: state => state.issue.result,
      totalCount: state => {
        return state.issue.issueList.totalCount;
      },
      canBeSubmit: function() {
        return (
          this.postForm.issue != null &&
          (this.postForm.issue.length >= 5 && this.postForm.issue.length <= 20)
        );
      }
    })
  },
  methods: {
    ...mapActions(["addIssue", "getAllIssueList", "getAllAnswerList"]),
    getIssueCount() {
      this.$emit("getIssueCount", this.totalCount);
    },
    getIssueList() {
      this.getAllIssueList({
        videoId: this.$route.query.id,
        pageNum: this.currentPageNum,
        pagesize: this.pageSize
      });
    },
    displayQuestionWindow() {
      this.questionWindowDisply = true;
      this.questionSubmitButtonDisplay = false;
    },
    getAnswerList(issueId) {
      this.getAllAnswerList(issueId);
    },
    async submitIssue() {
      await this.addIssue({
        videoId: this.$route.query.id,
        name: this.postForm.name,
        content: this.postForm.issue
      });

      if (this.result.code != 0) {
        this.$message.error(this.result.message);
      } else {
        this.$message({
          message: "提问成功",
          type: "success"
        });
        this.getIssueList();
      }
      this.questionWindowDisply = false;
    }
  }
};
</script>

<style>
.ai-iconwodejieda {
  font-size: 18px;
}
</style>
