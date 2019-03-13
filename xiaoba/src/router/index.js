import Vue from 'vue'
import VueRouter from 'vue-router'
import Mindex from '../pages/index/index.vue'
import CourseDetail from '../pages/videolist/coursedetail.vue'
import CourseList from '../pages/videolist/courselist.vue'
import CourseVideo from '../pages/video/coursevideo.vue'
import ViewHistory from '../pages/video/viewhistory.vue'
import MessageList from '../pages/message/messageList.vue'
import Login from '../pages/login/login.vue'
import Questionlist from '../pages/question/questionlist.vue'
import Ownerevaluatelist from '../pages/evaluate/ownerevaluatelist.vue'
import Ownerquestionlist from '../pages/question/ownerquestionlist.vue'
import Resource from '../pages/resource/resource.vue'
import Forgetpwd from '../pages/login/forgetpwd.vue'

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
            path: '/coursevideo',
            name: 'CourseVideo',
            component: CourseVideo
        },
        {
            path: '/viewhistory',
            name: 'ViewHistory',
            component: ViewHistory
        },
        {
            path: '/messagelist',
            name: 'MessageList',
            component: MessageList
        },
        {
            path: '/questionlist',
            name: 'questionlist',
            component: Questionlist
        },
        {
            path: '/ownerevaluatelist',
            name: 'Ownerevaluatelist',
            component: Ownerevaluatelist
        },
        {
            path: '/ownerquestionlist',
            name: 'Ownerquestionlist',
            component: Ownerquestionlist
        },
        {
            path: '/Resource',
            name: 'Resource',
            component: Resource
        },
        {
            path: '/forgetpwd',
            name: 'Forgetpwd',
            component: Forgetpwd
        }
    ]
});