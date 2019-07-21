<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        个人提问&nbsp;&nbsp;
        <img src="./images/question64.png" />

        <el-collapse v-model="activeNames" v-for="issue in issueList" :key="issue.id">
          <el-collapse-item :name="issue.index">
            <template slot="title">
              {{issue.content}}&nbsp;<i  v-if="issue.answerList.length>0" class="header-icon el-icon-chat-line-square"></i>
            </template>
            <div class="media">
              <p class="media-body text-left">
                
                &#8195;<span><el-link class="iconfont ai-iconbofang" :underline="false" @click="gotoVideo(issue.videoId)">{{issue.videoName}}</el-link></span><br>
                &#8195;问题内容:{{issue.content}}
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <small class="text-muted"></small>
              <small class="text-muted">{{issue.createDateTime}}</small>
            </div>
            <div v-if="issue.answerList.length>0">
              <el-divider content-position="center">老师答复</el-divider>
              <div v-for="answer in issue.answerList" :key="answer.id">
                <el-row>
                  <el-col >
                   &#8195; <span class="iconfont ai-icondayihuifu"></span>&#8195;
                    {{answer.content}}</el-col>
                </el-row>
                <div class="d-flex justify-content-between">
                  <small class="text-muted"></small>
                  <small class="text-muted">{{answer.createDateTime}}</small>
                </div>
                <br />
              </div>
            </div>
            <div v-else>
              <el-divider content-position="center">暂无答复</el-divider>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="8">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPageNum"
            :page-sizes="pagesizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <footerGuide />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import MPages from "../../components/Pages/Pages.vue";
import rate from "../../components/Rate/Rate.vue";

export default {
  mounted() {
    this.getIssueList();
  },
  data() {
    return {
      activeNames: ["1"],
      currentPageNum: 1,
      pagesizes: [20, 40, 60, 80, 100],
      pageSize: 20
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      issueList: state => state.issue.issueList.data,
      totalCount: state => {
        return state.issue.issueList.totalCount;
      }
    })
  },
  methods: {
    ...mapActions(["getUserAllIssueList"]),
    gotoVideo(videoId){
       this.$router.push({path:'/coursevideo', query:{id:videoId}})
    },
    getIssueList() {
      this.getUserAllIssueList({
        userId: this.userInfo.id,
        pageNum: this.currentPageNum,
        pagesize: this.pageSize
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getIssueList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPageNum = val;
      this.getIssueList();
    },
    toQuestionList() {
      this.$router.replace({ path: "/questionlist" });
    }
  },
  components: {
    headerTop,
    footerGuide,
    MPages,
    rate
  }
};
</script>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
