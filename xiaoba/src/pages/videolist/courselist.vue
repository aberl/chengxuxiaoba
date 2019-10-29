<template>
  <div>
    <headerTop/>
    <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
      <span class="nav_show">首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/coursedetail?id='+courseModuleDetail.courseId }">
      <span class="nav_show">{{courseModuleDetail.courseName}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item><span class="nav_show">{{courseModuleDetail.name}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    </div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">{{courseModuleDetail.name}}</h1>
        <p class="lead text-muted">{{courseModuleDetail.desc}}</p>
      </div>
    </section>
    <div class="container">
      <div>
        <div v-for="video in videoList" :key="video.id">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong
                class="d-block text-gray-dark"
                style="font-size:15px"
              >{{ video.index }} . {{video.name}}&nbsp;&nbsp;({{video.duration}}分钟/{{video.viewCount}}人观看)</strong>
            </p>
          </div>
          <div @click="goto('/coursevideo?id='+video.id)">
          <el-alert
            :title="video.description"
            class="iconfont ai-iconbofang"
            type="info"
            :closable="false"
          ></el-alert>
          </div>
        </div>
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
    <footerGuide/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

export default {
  mounted() {
    if (this.$route.query.id) {
      var id = this.$route.query.id;
      this.getCourseModuleDetails(id);
    }
    this.getVideoList();
  },

  computed: {
    ...mapState({
      courseModuleDetail: state => state.course.courseModuleDetails,
      totalCount: state => {
        return state.video.videoList.totalCount;
      },
      videoList: state => {
        var _data = [];
        for (var index in state.video.videoList.data) {
          var description = state.video.videoList.data[index].description;
          if (description.length > 110) {
            description = description.substring(0, 110) + "...";
          }
          _data.push({
            index: Number(index) + 1,
            id: state.video.videoList.data[index].id,
            name: state.video.videoList.data[index].name,
            courseName: state.video.videoList.data[index].courseName,
            createdatetime: state.video.videoList.data[index].createDateTime,
            description: description,
            viewCount: state.video.videoList.data[index].viewCount,
            courseModuleName: this.courseModuleName,
            duration: state.video.videoList.data[index].duration
          });
        }
        return _data;
      }
    })
  },
  methods: {
    ...mapActions(["getCourseModuleDetails", "getAllVideoList"]),
    getVideoList() {
      this.getAllVideoList({
        courseModuleId: this.$route.query.id,
        pageNum: this.currentPageNum,
        pagesize: this.pageSize
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getVideoList();
    },
    handleCurrentChange(val) {
      this.currentPageNum = val;
      this.getVideoList();
    },
    goto(path){
      this.$router.push(path)
    }
    ,
    watchCourseVideo(id) {
      this.$router.push("/coursevideo");
    }
  },
  data() {
    return {
      currentPageNum: 1,
      pagesizes: [20, 40, 60, 80, 100],
      pageSize: 20
    };
  },
  components: {
    headerTop,
    footerGuide
  }
};
</script>

<style>
.row_padding {
  padding: 40px;
}
.nav_show{
   font-size: 20px;
   font-family:"Microsoft YaHei" ;
   font-weight:normal
}
</style>
