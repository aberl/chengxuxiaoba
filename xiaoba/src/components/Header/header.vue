<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
  >
    <div class="my-0 mr-md-auto font-weight-normal" @click="goTo('/')">
      <img src="./images/bus.png" />
      <h5>程序小巴</h5>
    </div>
    <nav class="my-2 my-md-0 mr-md-3">
      <ul class="nav">
        <li>
          <a class="p-2 text-dark dropdown-toggle" data-toggle="dropdown" href="#">课程</a>
          <div class="dropdown-menu">
            <router-link
              v-for="course in courseList"
              :key="course.id"
              class="dropdown-item"
              :to="'/coursedetail?id='+course.id"
            >{{course.name}}</router-link>
             <router-link to="/index" class="dropdown-item">更多...</router-link>
          </div>
        </li>
        <li>
          <router-link class="p-2 text-dark" to="/xiaoba">小巴</router-link>
        </li>
        <li v-if="userInfo.name">
          <router-link class="p-2 text-dark" to="/messagelist">
            消息
            <span class="badge badge-danger" v-if="unReadMessageCount > 0">{{unReadMessageCount}}</span>
          </router-link>
        </li>
        <li v-if="userInfo.name">
          <a class="p-2 text-dark dropdown-toggle" data-toggle="dropdown" href="#">{{userInfo.name}}</a>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/viewhistory">学习的课程</router-link>
            <router-link class="dropdown-item" to="/ownerquestionlist">个人提问</router-link>
            <router-link class="dropdown-item" to="/resource">资料下载</router-link>
            <router-link class="dropdown-item" to="/userinfo">个人信息</router-link>
            <a class="dropdown-item" href="#" @click="logout">退出</a>
          </div>
        </li>
        <li v-if="!userInfo.name">
          <a class="p-2 text-dark" href="#" @click="goTo('/login')">登录/注册</a>
        </li>
      </ul>
    </nav>
    <div v-if="!userInfo.name">
      <img src="./images/busflag.png" />
    </div>
    <div v-if="userInfo.name">
      <img src="./images/busheader2.png" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getCurrentLoginUserInfo();
    this.getAllEffectCourseList();
    this.getUnReadMessageCount();
  },
  computed: mapState({
    courseList: state => {
      let showCourseList = [];
      if (state.course.courseList) {
        showCourseList = state.course.courseList.slice(0,4);
      }

      return showCourseList;
    },
    userInfo: state => state.user.currentLoginUser,
    unReadMessageCount: state => state.message.unReadMessageCount
  }),
  methods: {
    ...mapActions([
      "removeCurrentUserInfo",
      "getAllEffectCourseList",
      "getCurrentLoginUserInfo",
      "getUnReadMessageCount"
    ]),
    goTo(path) {
      this.$router.push(path);
    },
    logout() {
      this.removeCurrentUserInfo();
      this.goTo("/login");
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
