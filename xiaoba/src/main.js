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
import videoPlayer from 'vue-video-player'
import VueAliplayer from 'vue-aliplayer'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(ElementUI);
Vue.use(videoPlayer);
Vue.use(VueAliplayer);

new Vue({
  el: "#app",
  store,
  render: h => h(App),
  router
});
