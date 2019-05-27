<template>
  <div>
    <headerTop/>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">{{courseDetails.name}}</h1>
        <p class="lead text-muted">{{courseDetails.desc}}</p>
      </div>
    </section>

    <el-row :gutter="12" class="row_padding">
      <el-col :span="6" v-for="cmodule in courseModuleList" :key="cmodule.id">
        <el-card>
          <img :src="cmodule.imageList[0].url" class="image" @click="ToCourseList(cmodule.id)">
          <div>
            <span class="bottom clearfix">
              {{cmodule.name}}</span>
            <span class="bottom clearfix">
              共{{cmodule.videoCount}}个视频/{{cmodule.totalViewCount}}人观看/{{cmodule.totalPraiseCount}}点赞</span>
            <div class="bottom clearfix">
              <time class="time">{{cmodule.createDateTime}}</time>
              <el-button type="text" class="button" @click="ToCourseList(cmodule.id)">查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <footerGuide/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

export default {
  mounted() {
    this.getCourseDetails(this.$route.query.id);
    this.getAllEffectiveCourseModuleList(this.$route.query.id);
  },
  computed: {
    ...mapState({
      courseDetails: state => state.course.courseDetails,
      courseModuleList: state => state.course.courseModuleList
    })
  },
  methods: {
    ...mapActions(["getAllEffectiveCourseModuleList", "getCourseDetails"]),
    ToCourseList(coursemoduleid) {
      this.$router.push({path:'/courselist', query:{id:coursemoduleid}});
    }
  },
  components: {
    headerTop,
    footerGuide
  }
};
</script>

<style>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: no-repeat;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .row_padding{
padding:20px
  }

  .clearfix:after {
      clear: both
  }
</style>
