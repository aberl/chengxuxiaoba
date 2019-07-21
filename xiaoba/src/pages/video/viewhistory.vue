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
          v-model="courseModuleId"
        >
          <el-collapse-item
            :name="record.courseModuleId"
            :title="record.courseName+'-'+ record.courseModuleName + ' (' +record.videoStatisticCount+'/'+record.totalcourseModuleVideoCount+')'"
          >
            <div
              class="media text-muted pt-3"
              @click="watchCourseVideo(video.id)"
              v-for="video in videoRecordList"
              :key="video.id"
            >
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark">{{video.name}}</strong>
                {{video.description.length>110?(video.description.substr(0, 110) + "..."):video.description}}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
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
  data() {
    return {
      courseModuleId: -1
    };
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
    watchCourseVideo(videoId) {
      this.$router.replace("/coursevideo?id="+videoId);
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
