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
  reqModifyCourseModule
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
    let _images = JSON.parse(course.images);
    let _imageDetail = [];
    if (_images != null && _images.length > 0) {
      let nameIndex = -1;
      for (var index in _images) {
        nameIndex = _images[index].lastIndexOf("/");
        var _imagename = _images[index].substr(nameIndex + 1);
        _imageDetail.push({
          name: _imagename,
          newname: _imagename,
          url: _images[index]
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
    let _images = JSON.parse(courseModule.images);
    let _imageDetail = [];
    if (_images != null && _images.length > 0) {
      let nameIndex = -1;
      for (var index in _images) {
        nameIndex = _images[index].lastIndexOf("/");
        var _imagename = _images[index].substr(nameIndex + 1);
        _imageDetail.push({
          name: _imagename,
          newname: _imagename,
          url: _images[index]
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
