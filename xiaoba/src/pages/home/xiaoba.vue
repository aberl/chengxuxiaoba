<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        小巴宣言&nbsp;&nbsp;
        <img src="./images/declaration.png" />
        <div style="margin: 20px;"></div>
        <div class="message">最纯粹的程序员技术梦工厂</div>
      </div>
    </div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        会员福利&nbsp;&nbsp;
        <img src="./images/vip2.png" />
        <div style="margin: 20px;"></div>
        <div  v-for="permission in this.role.permissionList" :key="permission.id" class="message">
          {{permission.description}}</div>
      </div>
    </div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        讲师介绍&nbsp;&nbsp;
        <img src="./images/vip2.png" />
        <div style="margin: 20px;"></div>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="./images/teacher.jpg" />
            </div>
          </el-col>
          <el-col :span="16">
            <div style="margin: 20px;"></div>
            <div class="grid-content bg-purple-light">就职于计算机世界，易车，优信，戴姆勒等公司</div>
            <div style="margin: 20px;"></div>
            <div class="grid-content bg-purple-light">11年后端开发经验熟悉.NET，JAVA</div>
            <div style="margin: 20px;"></div>
            <div class="grid-content bg-purple-light">熟悉MYSQL,MSSQL,Redis等各种类型数据库</div>
          </el-col>
        </el-row>
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
  mounted() {
    this.getrole(2);
  },
  data() {
    return {
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
