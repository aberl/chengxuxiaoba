/**
 * 课程模块
 */
import {
  REQUEST_RECEIVE_COURSEALLLIST,
  REQUEST_RECEIVE_COURSEDETAILS,
  REQUEST_MODIFY_COURSEDETAILS,
  REQUEST_ADD_COURSEDETAILS,
  REQUEST_ADD_COURSEMODULE,
  REQUEST_RECEIVE_COURSEMODULEALLLIST,
  REQUEST_RECEIVE_COURSEMODULEDETAILS,
  REQUEST_MODIFY_COURSEMODULEDETAILS
  
} from "../mutation-types.js";

import {
  reqGetAllCourseList,
  reqGetCourseDetails,
  reqAddCourse,
  reqModifyCourse,
  reqAddCourseModule,
  reqGetAllEffectiveCourseList,
  reqGetAllCourseModuleList,
  reqGetCourseModuleDetails,
  reqModifyCourseModule,
  reqGetAllEffectiveCourseModuleList
} from "../../api";

const state = {
  courseDetails: { name: "", desc: "", status: 0, images: [] },
  courseList: [],
  courseModuleList:[],
  courseModuleDetails:{},
  result: {}
};

const actions = {
  async addCourse({ commit }, course) {
    const result = await reqAddCourse(
      course.name,
      course.desc,
      course.images,
      course.status
    );

    commit(REQUEST_ADD_COURSEDETAILS, { course: result });
  },
  async getAllCourseList({ commit }) {
    const result = await reqGetAllCourseList();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_COURSEALLLIST, { courseList: result.data });
    }
  },
  async getAllEffectCourseList({ commit }) {
    const result = await reqGetAllEffectiveCourseList();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_COURSEALLLIST, { courseList: result.data });
    }
  },
  async getCourseDetails({ commit }, courseId) {
    const result = await reqGetCourseDetails(courseId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_COURSEDETAILS, { course: result.data });
    }
  },

  async modifyCourseDetails({ commit }, { id, name, desc, images, status }) {
    const result = await reqModifyCourse(id, name, desc, images, status);
    commit(REQUEST_MODIFY_COURSEDETAILS, { course: result });
  },

  async addCourseModule({ commit }, coursemodule) {
    const result = await reqAddCourseModule(
      coursemodule.courseId,
      coursemodule.courseName,
      coursemodule.name,
      coursemodule.desc,
      coursemodule.images,
      coursemodule.status
    );

    commit(REQUEST_ADD_COURSEMODULE, { coursemodule: result });
  },
  async getCourseModuleDetails({ commit }, courseModuleId) {
    const result = await reqGetCourseModuleDetails(courseModuleId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_COURSEMODULEDETAILS, { courseModule: result.data });
    }
  },
  async getAllCourseModuleList({ commit },courseId) {
    const result = await reqGetAllCourseModuleList(courseId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_COURSEMODULEALLLIST, { courseModuleList: result.data });
    }
  },
  async getAllEffectiveCourseModuleList({ commit },courseId) {
    const result = await reqGetAllEffectiveCourseModuleList(courseId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_COURSEMODULEALLLIST, { courseModuleList: result.data });
    }
  },
  async modifyCourseModuleDetails({ commit }, { id, courseId,courseName,name, desc, images, status }) {
    const result = await reqModifyCourseModule(id, courseId,courseName,name, desc, images, status);
    commit(REQUEST_MODIFY_COURSEMODULEDETAILS, { coursemodule: result });
  },
};

const mutations = {
  [REQUEST_ADD_COURSEDETAILS](state, { course }) {
    state.result = course;
  },
  [REQUEST_RECEIVE_COURSEALLLIST](state, { courseList }) {
    state.courseList = courseList;
  },

  [REQUEST_RECEIVE_COURSEDETAILS](state, { course }) {
    if (course == null) return;

    let _id = course.id;
    let _name = course.name;
    let _desc = course.description;
    let _status = course.status;

    let _imageDetail = [];
    if (course.imageList != null && course.imageList.length > 0) {
      for (var index in course.imageList) {
        _imageDetail.push({
          name:  course.imageList[index].originName,
          newname:  course.imageList[index].name,
          url: course.imageList[index].url
        });
      }
    }

    state.courseDetails = {
      id: _id,
      name: _name,
      desc: _desc,
      status: String(_status),
      images: _imageDetail
    };
  },
  [REQUEST_MODIFY_COURSEDETAILS](state, { course }) {
    state.result = course;
  },
  [REQUEST_ADD_COURSEMODULE](state, { coursemodule }) {
    state.result = coursemodule;
  },

  [REQUEST_MODIFY_COURSEMODULEDETAILS](state, { coursemodule }) {
    state.result = coursemodule;
  },
  [REQUEST_RECEIVE_COURSEMODULEALLLIST](state,{courseModuleList}){
    state.courseModuleList=courseModuleList;
  },
  [REQUEST_RECEIVE_COURSEMODULEDETAILS](state, { courseModule }) {
    if (courseModule == null) return;

    let _id = courseModule.id;
    let _courseId = courseModule.courseId;
    let _courseName = courseModule.courseName;
    let _name = courseModule.name;
    let _desc = courseModule.description;
    let _status = courseModule.status;

    let _imageDetail = [];
    if (courseModule.imageList != null && courseModule.imageList.length > 0) {
      for (var index in courseModule.imageList) {
        _imageDetail.push({
          name:  courseModule.imageList[index].originName,
          newname:  courseModule.imageList[index].name,
          url: courseModule.imageList[index].url
        });
      }
    }
    state.courseModuleDetails = {
      id: _id,
      courseId:_courseId,
      courseName:_courseName,
      name: _name,
      desc: _desc,
      status: String(_status),
      images: _imageDetail
    };
  }
};

export default {
  state,
  actions,
  mutations
};
