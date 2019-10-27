/**
 * 视频模块
 */

import {
  REQUEST_ADD_VIDEO,
  REQUEST_RECEIVE_VIDEOALLLIST,
  REQUEST_RECEIVE_VIDEODETAILS,
  REQUEST_RECEIVE_PREANDNEXTVIDEOS,
  REQUEST_RECEIVE_ALIVIDEODETAILS,
  REQUEST_MODIFY_VIDEO,
  REQUEST_RECEIVE_RECORDSTATISTIC,
  REQUEST_RECEIVE_VIDEORECORDLIST
} from "../mutation-types.js";

import {
  reqAddVideo,
  reqGetAllVideoList,
  reqGetVideo,
  reqGetAliVideo,
  reqGetPreviousAndNextVideos,
  reqGetCourseModuleDetails,
  reqModifyVideo,
  reqIncreaseVideoWatchRecord,
  reqVideoWatchingRecordStatistic,
  reqVideoRecordList
} from "../../api";

const state = {
  videoCourseModule: {},
  videoDetail: {},
  aliVideoDetail: { data: { video: "" } },
  videoList: { currentNum: 1, data: [], totalCount: 0 },
  result: {},
  recordStatistic: [],
  videoRecordList: [],
  preVideo: {},
  nextVideo: {}
};

const actions = {
  async addVideo({ commit }, video) {
    const result = await reqAddVideo(
      video.courseModuleId,
      video.aliVideoId,
      video.name,
      video.attachments,
      video.duration,
      video.desc,
      video.status
    );

    commit(REQUEST_ADD_VIDEO, { video: result });
  },

  increaseVideoWatchRecord({ commit }, { videoId, watchAccountId }) {
    console.log(watchAccountId);
    reqIncreaseVideoWatchRecord(videoId, watchAccountId);
  },

  async modifyVideo({ commit }, video) {
    var _attachments = [];
    video.attachments.forEach(item => {
      _attachments.push(item.newname);
    });
    console.log(video);
    const result = await reqModifyVideo(
      video.id,
      video.aliVideoId,
      video.name,
      JSON.stringify(_attachments),
      video.duration,
      video.desc,
      video.status,
      video.viewCount,
      video.praiseCount
    );

    commit(REQUEST_MODIFY_VIDEO, { video: result });
  },
  async getVideo({ commit }, videoId) {
    const result = await reqGetVideo(videoId);
    if (result.code == 0) {
      const courseModuleresult = await reqGetCourseModuleDetails(
        result.data.courseModuleId
      );
      commit(REQUEST_RECEIVE_VIDEODETAILS, {
        video: result.data,
        courseModule: courseModuleresult.data
      });
    }
  },

  async getAliVideo({ commit }, alivid) {
    const result = await reqGetAliVideo(alivid);
    commit(REQUEST_RECEIVE_ALIVIDEODETAILS, {
      aliVideoInfo: result
    });
  },
  async getAllVideoList({ commit }, { courseModuleId, pageNum, pagesize }) {
    const result = await reqGetAllVideoList(
      courseModuleId,
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_VIDEOALLLIST, { videoList: result.data });
    }
  },
  async getPreviousAndNextVideos({ commit }, videoId) {
    const result = await reqGetPreviousAndNextVideos(videoId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_PREANDNEXTVIDEOS, { videoList: result.data });
    }
  },
  async getRecordStatistic({ commit }) {
    const result = await reqVideoWatchingRecordStatistic();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_RECORDSTATISTIC, {
        statistic: result.data
      });
    }
  },
  async getVideoRecordList({ commit }, { courseModuleId }) {
    const result = await reqVideoRecordList(courseModuleId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_VIDEORECORDLIST, {
        recordList: result.data
      });
    }
  }
};

const mutations = {
  [REQUEST_ADD_VIDEO](state, { video }) {
    state.result = video;
  },
  [REQUEST_RECEIVE_VIDEODETAILS](state, { video, courseModule }) {
    let _attachments = [];
    if (video.attachmentList) {
      for (var index in video.attachmentList) {
        _attachments.push({
          name: video.attachmentList[index].originName,
          newname: video.attachmentList[index].name,
          url: video.attachmentList[index].url
        });
      }
    }

    state.videoDetail = {
      id: video.id,
      aliVideoId: video.aliVideoId,
      courseModuleId: video.courseModuleId,
      name: video.name,
      attachments: _attachments,
      duration: video.duration,
      desc: video.description,
      status: String(video.status),
      statusDesc: video.statusDesc,
      viewCount: video.viewCount,
      praiseCount: video.praiseCount
    };
    state.videoCourseModule = courseModule;
  },
  [REQUEST_RECEIVE_ALIVIDEODETAILS](state, { aliVideoInfo }) {
    state.aliVideoDetail = aliVideoInfo;
  },
  [REQUEST_RECEIVE_VIDEOALLLIST](state, { videoList }) {
    state.videoList.data = videoList.data;
    state.videoList.totalCount = videoList.totalCount;
    state.videoList.currentNum = videoList.currentNum;
  },
  [REQUEST_RECEIVE_PREANDNEXTVIDEOS](state, { videoList }) {
    state.preVideo = videoList[0];
    state.nextVideo = videoList[1];
  },
  [REQUEST_MODIFY_VIDEO](state, { video }) {
    state.result = video;
  },
  [REQUEST_RECEIVE_RECORDSTATISTIC](state, { statistic }) {
    state.recordStatistic = statistic;
  },
  [REQUEST_RECEIVE_VIDEORECORDLIST](state, { recordList }) {
    state.videoRecordList = recordList;
  }
};

export default {
  state,
  actions,
  mutations
};
