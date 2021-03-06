import Vue from "vue";
import VueRouter from "vue-router";
import Mindex from "../pages/index/index.vue";
import CourseDetail from "../pages/videolist/coursedetail.vue";
import CourseList from "../pages/videolist/courselist.vue";
import CourseVideo from "../pages/video/coursevideo.vue";
import ViewHistory from "../pages/video/viewhistory.vue";
import MessageList from "../pages/message/messageList.vue";
import Login from "../pages/login/login.vue";
import Questionlist from "../pages/question/questionlist.vue";
import Ownerevaluatelist from "../pages/evaluate/ownerevaluatelist.vue";
import Ownerquestionlist from "../pages/question/ownerquestionlist.vue";
import Resource from "../pages/resource/resource.vue";
import Forgetpwd from "../pages/login/forgetpwd.vue";
import Userinfo from "../pages/user/userinfo.vue";
import Xiaoba from "../pages/home/xiaoba.vue";

import Admin_Mindex from "../pages/admin/adminIndex.vue";
import Admin_courselist from "../pages/admin/course/courselist.vue";
import Admin_addcourse from "../pages/admin/course/addcourse.vue";
import Admin_modulelist from "../pages/admin/course/modulelist.vue";
import Admin_addmodule from "../pages/admin/course/addmodule.vue";
import Admin_module from "../pages/admin/course/module.vue";
import Admin_modifycourse from "../pages/admin/course/modifycourse.vue";
import Admin_modifycoursemodule from "../pages/admin/course/modifycoursemodule.vue";
import Admin_addvideo from "../pages/admin/video/addvideo.vue";
import Admin_videolist from "../pages/admin/video/videolist.vue";
import Admin_modifyvideo from "../pages/admin/video/modifyvideo.vue";
import Admin_evaluationlist from "../pages/admin/evaluation/evaluationlist.vue";
import Admin_questionlist from "../pages/admin/question/questionlist.vue";

import Admin_userlist from "../pages/admin/user/userlist.vue";
import Admin_user from "../pages/admin/user/user.vue";

import Admin_addmaterial from "../pages/admin/material/addmaterial.vue";
import Admin_modifymaterial from "../pages/admin/material/modifymaterial.vue";
import Admin_materiallist from "../pages/admin/material/materiallist.vue";

import permission from "../constants/permission"
import prompt from "../constants/prompt"



Vue.use(VueRouter);
Vue.prototype.PERMISSION=permission;
Vue.prototype.PROMPT=prompt;

export default new VueRouter({
  routes: [
    {
      path: "/op",
      name: "op",
      component: Admin_Mindex,
      children: [
        {
          path: "/op/courselist",
          name: "courselist",
          component: Admin_courselist
        },
        {
          path: "/op/addcourse",
          name: "addcourse",
          component: Admin_addcourse
        },
        {
          path: "/op/modifycourse",
          name: "modifycourse",
          component: Admin_modifycourse
        },
        {
          path: "/op/module",
          name: "module",
          component: Admin_module
        },
        {
          path: "/op/modulelist",
          name: "modulelist",
          component: Admin_modulelist
        },
        {
          path: "/op/addmodule",
          name: "addmodule",
          component: Admin_addmodule
        },
        {
          path: "/op/modifycoursemodule",
          name: "modifycoursemodule",
          component: Admin_modifycoursemodule
        },
        {
          path: "/op/addvideo",
          name: "addvideo",
          component: Admin_addvideo
        },
        {
          path: "/op/videolist",
          name: "videolist",
          component: Admin_videolist
        },
        {
          path: "/op/modifyvideo",
          name: "modifyvideo",
          component: Admin_modifyvideo
        },
        {
          path: "/op/userlist",
          name: "userlist",
          component: Admin_userlist
        },
        {
          path: "/op/user",
          name: "user",
          component: Admin_user
        },
        {
          path: "/op/evaluationlist",
          name: "evaluationlist",
          component: Admin_evaluationlist
        },
        {
          path: "/op/questionlist",
          name: "questionlist",
          component: Admin_questionlist
        },
        {
          path: "/op/addmaterial",
          name: "addmaterial",
          component: Admin_addmaterial
        },
        {
          path: "/op/modifymaterial",
          name: "modifymaterial",
          component: Admin_modifymaterial
        },
        {
          path: "/op/materiallist",
          name: "materiallist",
          component: Admin_materiallist
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/index",
      name: "index",
      component: Mindex
    },
    {
      path: "/xiaoba",
      name: "xiaoba",
      component: Xiaoba
    },
    {
      path: "/",
      name: "default",
      component: Mindex
    },
    {
      path: "/coursedetail",
      name: "CourseDetail",
      component: CourseDetail
    },
    {
      path: "/courselist",
      name: "courselist",
      component: CourseList
    },
    {
      path: "/coursevideo",
      name: "CourseVideo",
      component: CourseVideo
    },
    {
      path: "/viewhistory",
      name: "ViewHistory",
      component: ViewHistory
    },
    {
      path: "/messagelist",
      name: "MessageList",
      component: MessageList
    },
    {
      path: "/questionlist",
      name: "questionlist",
      component: Questionlist
    },
    {
      path: "/ownerevaluatelist",
      name: "Ownerevaluatelist",
      component: Ownerevaluatelist
    },
    {
      path: "/ownerquestionlist",
      name: "Ownerquestionlist",
      component: Ownerquestionlist
    },
    {
      path: "/Resource",
      name: "Resource",
      component: Resource
    },
    {
      path: "/forgetpwd",
      name: "Forgetpwd",
      component: Forgetpwd
    },
    {
      path: "/userinfo",
      name: "Userinfo",
      component: Userinfo
    }
  ]
});
