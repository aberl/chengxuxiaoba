<template>
  <div>
      <headerTop/>
       <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">课程列表</h1>
          <p class="lead text-muted"></p>
        </div>
      </section>
<el-row :gutter="12" class="row_padding">
  <el-col :span="6" v-for="course in courseList">
    <el-card>
      <img :src="course.imageList[0].url" class="image" @click="ToCourseDetail(course.id)">
      <div >
        <span>{{course.name}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ course.createDateTime }}</time>
          <el-button type="text" class="button" @click="ToCourseDetail(course.id)">查看</el-button>
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
import headerTop from '../../components/Header/header.vue'
import footerGuide from '../../components/Footer/footer.vue'

export default {
  mounted() {
    this.getAllEffectCourseList();
  },
  computed: mapState({
      courseList: state => state.course.courseList
  }),
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods:{
    ...mapActions(["getAllEffectCourseList"]),
    ToCourseDetail(courseId){
      this.$router.push({path:'/coursedetail', query:{id:courseId}});
    }
  },
components:{
    headerTop,
    footerGuide
}
}
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
