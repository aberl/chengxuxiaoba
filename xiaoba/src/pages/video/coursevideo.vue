<template>
  <div>
    <headerTop />
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
      <br />
      <section class="jumbotron text-center">
        <div class="container">
          <p class="lead text-muted">{{videoDetail.desc}}</p>
        </div>
        <div class="container">
          <el-image v-if="!this.userInfo.id" :src="nologin_image_src" @click="goto('/login')"></el-image>
          <el-image v-else-if="hasSurpassWatchLimitAlert" :src="nopermission_image_src"></el-image>
          <ali-player
            v-else-if="this.aliVideoInfo"
            ref="player"
            @play="play"
            :vid="this.aliVideoInfo.videoId"
            :playauth="this.aliVideoInfo.playAuth"
            :playsinline="true"
            :autoplay="false"
            :rePlay="false"
            :useH5Prism="true"
            :preload="false"
            :x5_fullscreen="true"
            format="mp4"
            width="80%"
            height="520px"
            :prism-cover="this.aliVideoInfo.cover"
            controlBarVisibility="click"
            showBarTime="6000"
            autoPlayDelayDisplayText="000"
          ></ali-player>
          <br />
          <div>
            <span
              style="float:left"
              class="el-icon-caret-left"
              v-if="this.preVideo"
              @click="goto('/coursevideo?id='+preVideo.id)"
            >{{this.preVideo.name}}</span>
            <span
              style="float:right"
              class="el-icon-caret-right"
              v-if="this.nextVideo"
              @click="goto('/coursevideo?id='+nextVideo.id)"
            >{{this.nextVideo.name}}</span>
          </div>
        </div>
      </section>
      <div class="container">共{{videoDetail.viewCount}}人次观看</div>
      <br />
    </main>
    <comment
      :videoId="this.$route.query.id"
      :accountId="videoDetail.accountId"
      :attachment="videoDetail.attachments"
    />
    <footerGuide />
  </div>
</template>
<script>
import VueAliplayer from "vue-aliplayer";
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import comment from "../../components/Evaluate/comment.vue";
import aliplayer from "../../components/Video/aliVideoPlay.vue";

export default {
  mounted() {
    this.getVideo(this.$route.query.id);
    this.getPreviousAndNextVideos(this.$route.query.id);
  },
  data() {
    return {
      nopermission_image_src: this.PROMPT.VIDEOWATCHINGLIMITATIONIMAGEURL,
      nologin_image_src: this.PROMPT.NOLOGINIMAGEURL
    };
  },
  inject: ["reload"],
  components: {
    headerTop,
    footerGuide,
    comment,
    "ali-player": aliplayer
  },

  watch: {
    $route(to, from) {
      window.location.reload();
    },
    aliVideoId(newVal, oldVal) {
      if (newVal != oldVal && newVal != "") {
        console.log(newVal);
        let aliVid = newVal.split(".")[1];
        this.getAliVideo(aliVid);
      }
      this.increaseVideoWatchRecord({
        videoId: this.$route.query.id,
        watchAccountId: this.userInfo.id
      });
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      videoDetail: state => state.video.videoDetail,
      aliVideoId: state => state.video.videoDetail.aliVideoId,
      aliVideoInfo: state => state.video.aliVideoDetail.data,
      courseModuleDetail: state => state.video.videoCourseModule,
      preVideo: state => state.video.preVideo,
      nextVideo: state => state.video.nextVideo,
      hasSurpassWatchLimitAlert: state => state.video.aliVideoDetail.code == -3
    })
  },
  methods: {
    ...mapActions([
      "getVideo",
      "increaseVideoWatchRecord",
      "getPreviousAndNextVideos",
      "getAliVideo"
    ]),
    play(event) {
      const player = this.$refs.player.instance;
    },
    goto(path) {
      this.$router.replace(path);
    }
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
