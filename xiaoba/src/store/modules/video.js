/**
 * 视频模块
 */

import { REQUEST_ADD_VIDEO,
    REQUEST_RECEIVE_VIDEOALLLIST,
    REQUEST_RECEIVE_VIDEODETAILS,
    REQUEST_MODIFY_VIDEO
  } from "../mutation-types.js";

import { reqAddVideo,reqGetAllVideoList,reqGetVideo,reqGetCourseModuleDetails,reqModifyVideo } from "../../api";

const state = {
  videoCourseModule:{},
  videoDetail:{video:[]},
  videoList: {currentNum:1,data:[],totalCount:0},
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
  async modifyVideo({ commit }, video) {
    var _attachments = [];
    video.attachments.forEach(item => {
      _attachments.push(item.newname);
    });
    console.log(video)
    const result = await reqModifyVideo(
      video.id,
      video.video.newname,
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
      const courseModuleresult = await reqGetCourseModuleDetails(result.data.courseModuleId);
      commit(REQUEST_RECEIVE_VIDEODETAILS, { video: result.data, courseModule:courseModuleresult.data });
    }
  },
  async getAllVideoList({ commit }, {courseModuleId, pageNum, pagesize}) {
    const result = await reqGetAllVideoList(courseModuleId, pageNum, pagesize, "id");
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
    let _video = [{
      name: video.video.originName,
      newname: video.video.name,
      url: video.video.url
    }];
    let _attachments=[];
    if(video.attachmentList)
    {
    for (var index in video.attachmentList) {
      _attachments.push({
        name: video.attachmentList[index].originName,
        newname: video.attachmentList[index].name,
        url: video.attachmentList[index].url
      });
    }
  }
    state.videoDetail = 
    {
      id:video.id,
      courseModuleId:video.courseModuleId,
      video:_video,
      name:video.name,
      attachments:_attachments,
      duration:video.duration,
      desc:video.description,
      status:String(video.status),
      statusDesc:video.statusDesc,
      viewCount:video.viewCount,
      praiseCount:video.praiseCount
    }
    state.videoCourseModule=courseModule
  },
  [REQUEST_RECEIVE_VIDEOALLLIST](state, { videoList }) {
    state.videoList.data = videoList.data;
    state.videoList.totalCount=videoList.totalCount
    state.videoList.currentNum=videoList.currentNum
  },
  [REQUEST_MODIFY_VIDEO](state, { video }) {
    state.result = video;
  },
};

export default {
  state,
  actions,
  mutations
};
