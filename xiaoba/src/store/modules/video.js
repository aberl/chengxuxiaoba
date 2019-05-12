/**
 * 视频模块
 */

import { REQUEST_ADD_VIDEO,
    REQUEST_RECEIVE_VIDEOALLLIST,
    REQUEST_RECEIVE_VIDEODETAILS
  } from "../mutation-types.js";

import { reqAddVideo,reqGetAllVideoList,reqGetVideo,reqGetCourseModuleDetails } from "../../api";

const state = {
  videoCourseModule:{},
  videoDetail:{},
  videoList: [],
  result: {}
};

const actions = {
  async addVideo({ commit }, video) {
    const result = await reqAddVideo(
      video.courseModuleId,
      video.video,
      video.name,
      video.attachments,
      video.duration,
      video.desc,
      video.status
    );

    commit(REQUEST_ADD_VIDEO, { video: result });
  },
  async getVideo({ commit }, videoId) {
    const result = await reqGetVideo(videoId);
    if (result.code == 0) {
      const courseModuleresult = await reqGetCourseModuleDetails(result.data.courseModuleId);
      commit(REQUEST_RECEIVE_VIDEODETAILS, { video: result.data, courseModule:courseModuleresult.data });
    }
  },
  async getAllVideoList({ commit }, {courseModuleId, pageNum}) {
    const result = await reqGetAllVideoList(courseModuleId, pageNum, 20, "-id");
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_VIDEOALLLIST, { videoList: result.data });
    }
  }
};

const mutations = {
  [REQUEST_ADD_VIDEO](state, { video }) {
    state.result = video;
  },
  [REQUEST_RECEIVE_VIDEODETAILS](state, { video,courseModule }) {
    state.videoDetail = 
    {
      courseModuleId:video.courseModuleId,
      video:video.file,
      name:video.name,
      attachments:video.attachmentMap,
      duration:video.duration,
      desc:video.description,
      status:String(video.status),
      statusDesc:video.statusDesc
    }
    state.videoCourseModule=courseModule
  },
  [REQUEST_RECEIVE_VIDEOALLLIST](state, { videoList }) {
      console.log(videoList.data)
    state.videoList = videoList.data;
  }
};

export default {
  state,
  actions,
  mutations
};
