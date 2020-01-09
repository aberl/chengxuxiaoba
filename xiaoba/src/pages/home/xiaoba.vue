<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        小巴宣言&nbsp;&nbsp;
        <div style="margin: 20px;"></div>
        <div class="message">最纯粹的程序员技术梦工厂</div>
      </div>
    </div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        讲师介绍&nbsp;&nbsp;
        <div style="margin: 20px;"></div>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
               <el-image :src="instructor_001" ></el-image>
            </div>
          </el-col>
          <el-col :span="16">
            <div style="margin: 20px;"></div>
            <div class="grid-content bg-purple-light">资深JAVA架构师,10余年 JAVA 、.NET 等架构设计研发经验,以及多年全栈研发经验,曾就职于汽车相关行业等互联网大厂,
              担任Team Leader、高级研发经理、基础组件架构师等核心职位，擅长系统架构，应用架构和基础组件相关设计，对高并发，高可用，分布式系统有这丰富的理解和实战经验，精通
              互联网各类主流技术。</div>
          </el-col>
        </el-row>
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
  mounted() {
    this.getrole(2);
  },
  data() {
    return {
      instructor_001: this.PROMPT.INSTRUCTOR_001,
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    };
  },
  methods: {
    ...mapActions(["getrole"])
  },
  computed: {
    ...mapState({
      role: state => state.user.role
    })
  },
  components: {
    headerTop,
    footerGuide
  }
};
</script>

<style>
.message {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 40px;
  color: 909399, blod;
}
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
