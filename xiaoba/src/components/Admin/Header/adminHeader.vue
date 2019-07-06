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
        <li v-if="userInfo.name">
          <a class="p-2 text-dark dropdown-toggle" data-toggle="dropdown" href="#">{{userInfo.name}}</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" @click="logout">退出</a>
          </div>
        </li>
        <li v-if="!userInfo.name">
          <a class="p-2 text-dark" href="#" @click="goTo('/login')">登录/注册</a>
        </li>
      </ul>
    </nav>
    <div v-if="!userInfo.name">
      <img src="./images/busflag.png">
    </div>
    <div v-if="userInfo.name">
      <img src="./images/busheader2.png">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted: function() {
    if (this.userInfo.role != 3) {
      this.goTo("/");
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser
    })
  },
  methods: {
    ...mapActions(["removeUserInfo"]),
    goTo(path) {
      this.$router.replace(path);
    },
    logout() {
      this.removeUserInfo();
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
