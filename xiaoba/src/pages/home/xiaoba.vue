<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        会员福利&nbsp;&nbsp;
        <img src="./images/vip2.png" />
        <div style="margin: 20px;"></div>
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in 3" :key="item">
            <el-image :src="src"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        会员管理&nbsp;&nbsp;
        <img src="./images/vip2.png" />
        <div style="margin: 20px;"></div>
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 3" :key="item">
            <el-image :src="src"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        讲师介绍&nbsp;&nbsp;
        <img src="./images/vip2.png" />
        <div style="margin: 20px;"></div>
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 3" :key="item">
            <el-image :src="src"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        网站介绍&nbsp;&nbsp;
        <img src="./images/vip2.png" />
        <div style="margin: 20px;"></div>
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 3" :key="item">
            <el-image :src="src"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <footerGuide />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

export default {
  data() {
    return {
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    };
  },
  methods: {},
  components: {
    headerTop,
    footerGuide
  }
};
</script>

<style>
.title_font {
  font-family: "微软雅黑";
  font-size: 30px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
