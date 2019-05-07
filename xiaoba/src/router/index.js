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

import Admin_Mindex from "../pages/admin/adminIndex.vue";
import Admin_courselist from "../pages/admin/course/courselist.vue";
import Admin_addcourse from "../pages/admin/course/addcourse.vue";
import Admin_modulelist from "../pages/admin/course/modulelist.vue";
import Admin_addmodule from "../pages/admin/course/addmodule.vue";
import Admin_module from "../pages/admin/course/module.vue";
import Admin_modifycourse from "../pages/admin/course/modifycourse.vue";
import Admin_modifycoursemodule from "../pages/admin/course/modifycoursemodule.vue";

Vue.use(VueRouter);

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
    }
  ]
});
