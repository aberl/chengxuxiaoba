<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        学习的课程&nbsp;&nbsp;
        <img src="./images/history64.png">
        <div style="margin: 20px 0;"></div>

        <el-collapse
          accordion
          @change="spread(record.courseModuleId)"
          v-for="record in this.videoWatchingRecord"
          :key="record.courseModuleId"
        >
          <el-collapse-item
            :title="record.courseModuleName + ' (' +record.videoStatisticCount+'/'+record.totalcourseModuleVideoCount+')'"
          >
            <div
              class="media text-muted pt-3"
              v-for="video in this.videoRecordList"
              :key="video.id"
              @click="watchCourseVideo(video.id)"
            >
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark">{{video.name}}</strong>
                {{video.description}}
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
    {{videoWatchingRecord}}||{{videoRecordList}}
    <footerGuide/>
  </div>
</template>

<script>
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.getRecordStatistic(this.userInfo.id);
  },
  computed: mapState({
    userInfo: state => state.user.currentLoginUser,
    videoWatchingRecord: state => state.video.recordStatistic,
    videoRecordList: state => state.video.videoRecordList
  }),
  methods: {
    ...mapActions(["getRecordStatistic", "getVideoRecordList"]),
    spread(courseModuleId) {
      if (courseModuleId) {
        this.getVideoRecordList({
          accountId: this.userInfo.id,
          courseModuleId
        });
      }
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
