<template>
  <div>
    <headerTop/>
    <main role="main">
      <div class="container">
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
      </div>
      <br>
      <section class="jumbotron text-center">
        <div class="container">
          <p class="lead text-muted">{{videoDetail.desc}}</p>
        </div>
        <videoPlay :videoSrc="videoSrc" :videoId="this.$route.query.id"/>
      </section>
      <div class="container">共{{videoDetail.viewCount}}人次观看</div>
      <br>
    </main>
    <comment
      :videoId="this.$route.query.id"
      :accountId="videoDetail.accountId"
      :attachment="videoDetail.attachments"
    />
    <footerGuide/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import comment from "../../components/Evaluate/comment.vue";
import videoPlay from "../../components/Video/videoPlay.vue";
export default {
  mounted() {
    this.increaseVideoWatchRecord({
      videoId: this.$route.query.id,
      watchAccountId: this.userInfo.id
    });
    this.getVideo(this.$route.query.id);
  },
  components: {
    headerTop,
    footerGuide,
    comment,
    videoPlay
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      videoDetail: state => state.video.videoDetail,
      courseModuleDetail: state => state.video.videoCourseModule,
      videoSrc: state => {
        if (state.video.videoDetail.video.length > 0) {
          return state.video.videoDetail.video[0].url;
        }
      }
    })
  },
  methods: {
    ...mapActions(["getVideo", "increaseVideoWatchRecord"])
  }
};
</script>

<style>
.nav_show {
  font-size: 20px;
  font-family: "Microsoft YaHei";
  font-weight: normal;
}
</style>
