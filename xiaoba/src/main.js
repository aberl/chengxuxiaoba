/**
 * 入口 js
 */

 import Vue from 'vue'
 import ElementUI from 'element-ui';
 import 'element-ui/lib/theme-chalk/index.css';
 import App from './App.vue'
 import router from './router'
 import './assets/ali-icon/iconfont.css'

 Vue.use(ElementUI);

 new Vue({
     el:'#app',
     render: h => h(App),
     router
 });