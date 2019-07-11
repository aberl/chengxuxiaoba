<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        学习的课程&nbsp;&nbsp;
        <img src="./images/history64.png" />
        <div style="margin: 20px 0;"></div>

        <el-collapse accordion @change="spread" v-for="record in this.videoWatchingRecord" :key="record.courseModuleId">
          <el-collapse-item :title="record.courseModuleName + ' (' +record.videoStatisticCount+'/'+record.totalcourseModuleVideoCount+')'">
            <div class="media text-muted pt-3" @click="watchCourseVideo(1)">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark">Hello JAVA</strong>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
            </div>
            <div class="media text-muted pt-3" @click="watchCourseVideo(1)">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark">Hello JAVA</strong>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
            </div>
            <div class="media text-muted pt-3" @click="watchCourseVideo(1)">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark">Hello JAVA</strong>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    {{videoWatchingRecord}}
    <footerGuide />
  </div>
</template>

<script>
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.getrRecordStatistic(this.userInfo.id);
  },
  computed: mapState({
    userInfo: state => state.user.currentLoginUser,
    videoWatchingRecord:state => state.video.recordStatistic
  }),
  methods: {
    ...mapActions(["getrRecordStatistic"]),
    spread(courseModuleId){
      console.log(courseModuleId)
    },
    watchCourseVideo(id) {
      this.$router.replace("/coursevideo");
    }
  },
  components: {
    headerTop,
    footerGuide
  }
};
</script>

<style>
</style>
