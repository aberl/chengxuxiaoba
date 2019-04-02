/**
 * 入口 js
 */

import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import "./assets/ali-icon/iconfont.css";

import store from "./store/index.js";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  store,
  render: h => h(App),
  router
});
