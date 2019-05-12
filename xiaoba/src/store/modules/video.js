/**
 * 视频模块
 */

import { REQUEST_ADD_VIDEO,
    REQUEST_RECEIVE_VIDEOALLLIST} from "../mutation-types.js";

import { reqAddVideo,reqGetAllVideoList } from "../../api";

const state = {
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
