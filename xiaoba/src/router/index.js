import Vue from 'vue'
import VueRouter from 'vue-router'
import Mindex from '../pages/index/index.vue'
import CourseDetail from '../pages/videolist/coursedetail.vue'
import CourseList from '../pages/videolist/courselist.vue'
import CourseVideo from '../pages/video/coursevideo.vue'
import MessageList from '../pages/message/messageList.vue'
import Login from '../pages/login/login.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/index',
            name: 'index',
            component: Mindex
        },
        {
            path: '/',
            name: 'default',
            component: Mindex
        },
        {
            path: '/coursedetail',
            name: 'CourseDetail',
            component: CourseDetail
        },
        {
            path: '/courselist',
            name: 'courselist',
            component: CourseList
        },
        {
            path: '/courseVideo',
            name: 'CourseVideo',
            component: CourseVideo
        },
        {
            path: '/messageList',
            name: 'MessageList',
            component: MessageList
        }
    ]
});