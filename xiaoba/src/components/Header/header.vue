<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
  >
    <div class="my-0 mr-md-auto font-weight-normal" @click="goTo('/')">
      <img src="./images/bus.png">
      <h5>程序小巴</h5>
    </div>
    <nav class="my-2 my-md-0 mr-md-3">
      <ul class="nav">
        <li>
          <a class="p-2 text-dark dropdown-toggle" data-toggle="dropdown" href="#">课程</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" @click="goTo('/coursedetail')">JAVA</a>
            <a class="dropdown-item" href="#" @click="goTo('/coursedetail')">数据库</a>
            <a class="dropdown-item" href="#" @click="goTo('/coursedetail')">Node</a>
          </div>
        </li>
        <li>
          <a class="p-2 text-dark" href="#">小巴</a>
        </li>
        <li @click="goTo('/messagelist')" v-if="userInfo.name">
          <a class="p-2 text-dark" href="#">
            消息
            <span class="badge badge-danger">4</span>
          </a>
        </li>
        <li v-if="userInfo.name">
          <a class="p-2 text-dark dropdown-toggle" data-toggle="dropdown" href="#">{{userInfo.name}}</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" @click="goTo('/viewhistory')">学习的课程</a>
            <a class="dropdown-item" href="#" @click="goTo('/ownerevaluatelist')">个人评价</a>
            <a class="dropdown-item" href="#" @click="goTo('/ownerquestionlist')">个人提问</a>
            <a class="dropdown-item" href="#" @click="goTo('/resource')">资料下载</a>
            <a class="dropdown-item" href="#" @click="goTo('/login')">退出</a>
          </div>
        </li>
        <li v-if="!userInfo.name">
          <a  class="p-2 text-dark" href="#"  @click="goTo('/login')">登录/注册</a>
        </li>
      </ul>
    </nav>
    <div v-if="!userInfo.name"><img src="./images/busflag.png"></div>
    <div v-if="userInfo.name"><img src="./images/busheader2.png"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    }
  },
  components: {}
};
</script>

<style>
.middle {
  float: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
