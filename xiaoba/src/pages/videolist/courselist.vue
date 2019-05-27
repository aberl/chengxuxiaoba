<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        {{courseModuleDetail.courseName}}&nbsp;&nbsp;{{courseModuleDetail.name}}
        <img
          src="../../common/images/busstation64.png"
        >
        <div v-for="video in videoList" :key="video.id">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark" style="font-size:15px">
              {{ video.index }} . {{video.name}}&nbsp;&nbsp;({{video.duration}}分钟/{{video.viewCount}}人观看)
              </strong>
            </p>
          </div>

          <el-alert :title="video.description" class="iconfont ai-iconbofang" type="info" :closable="false">
           
          </el-alert>
        </div>
      </div>
    </div>
    <MPages/>
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
    if (this.$route.query.id) {
      var id = this.$route.query.id;
      this.getCourseModuleDetails(id);
      this.getAllVideoList({ courseModuleId: id, pageNum: 1 });
    }
  },

  computed: {
    ...mapState({
      courseModuleDetail: state => state.course.courseModuleDetails,
      videoList: state => {
        var _data = [];
        for (var index in state.video.videoList) {
          var description = state.video.videoList[index].description;
          console.log(description.length)
          if (description.length > 110) {
            description = description.substring(0, 110) + "...";
          }
          _data.push({
            index:Number(index)+1,
            id: state.video.videoList[index].id,
            name: state.video.videoList[index].name,
            courseName: state.video.videoList[index].courseName,
            createdatetime: state.video.videoList[index].createDateTime,
            description: description,
            viewCount:state.video.videoList[index].viewCount,
            courseModuleName: this.courseModuleName,
            duration:state.video.videoList[index].duration
          });
        }
        return _data;
      }
    })
  },
  methods: {
    ...mapActions(["getCourseModuleDetails", "getAllVideoList"]),
    watchCourseVideo(id) {
      this.$router.replace("/coursevideo");
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
.row_padding {
  padding: 40px;
}
</style>
