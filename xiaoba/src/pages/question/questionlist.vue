<template>
  <div class="text-center">
    <headerTop/>
      <!-- <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            <span class="nav_show">首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/coursedetail?id='+courseModuleDetail.courseId }">
            <span class="nav_show">{{courseModuleDetail.courseName}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/courselist?id='+courseModuleDetail.id }">
            <span class="nav_show">{{courseModuleDetail.name}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="nav_show">{{videoDetail.name}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
    <section class="jumbotron text-center">
      <div>
        <div class="media">
          <el-button type="warning" circle>楼主</el-button>&nbsp;&nbsp;
          <p class="media-body text-left">
            <strong class="d-block">{{issue.name}}</strong>
            {{issue.content}}
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <small class="text-muted">
            <span class="iconfont ai-iconshangxianjieda"></span>
            {{issue.answerCount}}个解答
          </small>
          <small class="text-muted">2019/03/08 22:53:22</small>
        </div>
      </div>
    </section>
    <div class="container">
      <div v-for="answer in answerList" :key="answer.id">
        <div class="media">
          <el-button type="warning" circle>{{answer.index}}楼</el-button>&nbsp;&nbsp;
          <p class="media-body text-left">
            <strong class="d-block">{{answer.answerner.name}}</strong>
            {{answer.content}}
          </p>
        </div>
        <div class="border-bottom">
          <div class="d-flex justify-content-between">
            <small class="text-muted"></small>
            <small class="text-muted">{{answer.createDateTime}}</small>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0;"></div>

    <div class="container">
      <form>
        <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          maxlength="100"
          show-word-limit
          :rows="6"
          placeholder="请输入回答内容"
          v-model="postForm.answer"
        ></el-input>
        <div style="margin: 20px 0;"></div>
        <el-button type="primary" :disabled="!this.canBeSubmit" @click="submitAnswer">提交回答</el-button>
      </form>
    </div>
    <footerGuide/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import MPages from "../../components/Pages/Pages.vue";
export default {
  mounted() {
    this.getIssue(this.$route.query.id);
    this.getAllAnswerList(this.$route.query.id);
  },
  data() {
    return {
      input: "",
      textarea: ""
    };
  },
  data() {
    return {
      postForm: {
        answer: null
      }
    };
  },
   watch: {
    videoId(val) {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      issue: state => state.issue.issue,
      answerList: state => state.issue.answerList,
      result: state => state.issue.result,
      videoId: state =>state.issue.issue.videoId
    }),
    canBeSubmit: function() {
      return (
        this.postForm.answer != null &&
        (this.postForm.answer.length >= 5 && this.postForm.answer.length <= 100)
      );
    }
  },
  inject: ["reload"],
  methods: {
    ...mapActions(["getIssue", "answerIssue", "getAllAnswerList"]),
    async submitAnswer() {
      await this.answerIssue({
        issueId: this.$route.query.id,
        content: this.postForm.answer
      });

      if (this.result.code != 0) {
        this.$message.error(this.result.message);
        return;
      } else {
        this.$message({
          message: "回答成功",
          type: "success"
        });
        this.reload();
      }
    }
  },
  components: {
    headerTop,
    footerGuide,
    MPages
  }
};
</script>

<style>
</style>
