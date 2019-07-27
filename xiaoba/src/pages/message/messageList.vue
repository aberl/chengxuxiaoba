<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        消息列表&nbsp;&nbsp;
        <img src="./images/message64.png" />
        <div style="margin: 20px;"></div>
        <el-row class="border-gray message">
          <el-col :span="8" class="message">
             系统消息
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">数据库课程更新啊</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">2017-06-15 23:09:54</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <MPages />
    <footerGuide />
  </div>
</template>

<script>
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
import MPages from "../../components/Pages/Pages.vue";

export default {
  methods: {
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
.title_font {
  font-family: "微软雅黑";
  font-size: 30px;
}
.message {
  font-family: "Helvetica Neue";
  font-size: 18px;
  color: 909399, blod;
}
</style>
