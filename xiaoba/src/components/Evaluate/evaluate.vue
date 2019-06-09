<template>
  <div>
    <div class="container" v-if="evaluateWindowDisply">
      <h5>您觉得视频怎么样？</h5>
      <form>
        <div class="form-group">
          <rate @changeRate="changeRate"/>
        </div>
        <el-input
        maxlength="100"
        show-word-limit
          type="textarea"
          :rows="6"
          placeholder="请尽可能详细描述您的学习经历，例如学习成果，老师讲课风格等(字数大小限制在5到100字)"
          v-model="postForm.evaluation"
        ></el-input>
      </form>
      <div style="margin: 20px 0;"></div>
      <el-button type="primary" :disabled="!this.canBeSubmit" @click="submitEvaluation">提交评价</el-button>
    </div>

    <div class="p-3">
      <small class="d-block text-right border-bottom padding-bottom">
        <el-button
          @click="displayEvaluateWindow"
          type="primary"
          round
          v-if="evaluateSubmitButtonDisplay"
        >我要评价</el-button>
      </small>
      <div v-for="evaluation in evaluationList" :key="evaluation.id">
        <div class="media padding-top">
          <el-button type="success" circle>{{evaluation.index}}楼</el-button>&nbsp;&nbsp;
          <p class="media-body text-left">
            <strong class="d-block">{{evaluation.accountName}}</strong>
            <rate :stars="evaluation.stars" :disabled="true"/>
            {{evaluation.content}}
          </p>
        </div>
        <div class="border-bottom">
          <div class="d-flex justify-content-between">
            <small class="text-muted">
              
            </small>
            <small class="text-muted">{{evaluation.createDateTime}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rate from "../Rate/Rate.vue";

export default {
  mounted() {
    this.getEvaluationList();
    this.getEvaluationCount();
  },
  watch: {
    totalCount(count) {
      this.getEvaluationCount();
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
      evaluateWindowDisply: false,
      evaluateSubmitButtonDisplay: true,
      textarea: "",
      postForm: {
        stars: null,
        evaluation: null
      },
      rules: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      evaluationList: state => state.evaluation.evaluationList.data,
      totalCount: state => {
        return state.evaluation.evaluationList.totalCount;
      },
      result: state => state.evaluation.result,
      canBeSubmit: function() {
        return (
          this.postForm.stars != null &&
          this.postForm.evaluation != null &&
          (this.postForm.evaluation.length >= 5 && this.postForm.evaluation.length<=100)
        );
      }
    })
  },
  methods: {
    ...mapActions(["getEffectiveEvaluationList", "addEvaluation"]),
    getEvaluationCount(){
      this.$emit('getEvaluationCount',this.totalCount);
    },
    changeRate(stars) {
      this.postForm.stars = stars;
    },
    displayEvaluateWindow() {
      this.evaluateWindowDisply = true;
      this.evaluateSubmitButtonDisplay = false;
    },
    getEvaluationList() {
      this.getEffectiveEvaluationList({
        videoId: this.$route.query.id,
        pageNum: this.currentPageNum,
        pagesize: this.pageSize
      });
    },
    async submitEvaluation() {
      await this.addEvaluation({
        videoId: this.$route.query.id,
        content: this.postForm.evaluation,
        stars: this.postForm.stars,
        accountId: this.userInfo.id
      });

      if (this.result.code != 0) {
        this.$message.error(this.result.message);
      } else {
        this.$message({
          message: "评论成功",
          type: "success"
        });
        this.getEvaluationList();
      }
      this.evaluateWindowDisply = false;
    }
  },
  components: {
    rate
  }
};
</script>

<style>
.ai-iconzan {
  font-size: 18px;
}

.padding-top {
  padding-top: 5px;
}
.padding-bottom {
  padding-bottom: 5px;
}
</style>
