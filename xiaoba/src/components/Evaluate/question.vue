<template>
  <div>
    <div class="container" v-if="questionWindowDisply">
      <form>
        <div style="margin: 20px 0;"></div>
        <el-input type="textarea"
        maxlength="20"
        show-word-limit
         :rows="2"
         placeholder="请输入问题内容" v-model="postForm.issue"></el-input>
        <div style="margin: 20px 0;"></div>
        <el-button type="primary" :disabled="!this.canBeSubmit" @click="submitIssue">提交问题</el-button>
      </form>
    </div>
    <div>
      <div class="p-3">
        <small class="d-block text-right">
          <el-button
            @click="displayQuestionWindow"
            type="primary"
            round
            v-if="questionSubmitButtonDisplay"
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
              <small class="text-muted" @click="toQuestionList">
                <span class="iconfont ai-iconshangxianjieda"></span>
                解答
              </small>
              <small class="text-muted">{{issue.createDateTime}}</small>
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
      userInfo: state => state.user.userInfo,
      issue: state => state.issue.issue,
      issueList: state => state.issue.issueList.data,
      result: state => state.issue.result,
      totalCount: state => {
        return state.issue.issueList.totalCount;
      },
      canBeSubmit: function() {
        return (
          this.postForm.issue != null &&
          (this.postForm.issue.length >= 5 && this.postForm.issue.length<=20)
        );
      }
    })
  },
  methods: {
    ...mapActions(["addIssue", "getAllIssueList"]),
    getIssueCount(){
      this.$emit('getIssueCount',this.totalCount);
    },
    getIssueList() {
      this.getAllIssueList({
        videoId: this.$route.query.id,
        pageNum: this.currentPageNum,
        pagesize: this.pageSize
      });
    },
    toQuestionList() {
      this.$router.push({ path: "/questionlist" });
    },
    displayQuestionWindow() {
      this.questionWindowDisply = true;
      this.questionSubmitButtonDisplay = false;
    },
    async submitIssue() {
       await this.addIssue({
        videoId: this.$route.query.id,
        name: this.postForm.name,
        content: this.postForm.issue,
        questionerId: this.userInfo.id
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
