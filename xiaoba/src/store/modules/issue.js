/**
 * 问题模块
 */

import {
  REQUEST_ADD_ISSUE,
  REQUEST_RECEIVE_ISSUEALLLIST,
  REQUEST_ANSWER_ISSUE,
  REQUEST_RECEIVE_ANSWERALLLIST
} from "../mutation-types.js";

import {
  reqAddIssues,
  reqGetAllIssueList,
  reqGetUserAllIssueList,
  reqAnswerIssue,
  reqGetAllAnswerList
} from "../../api";

const state = {
  issue: {},
  issueList: {currentNum:1,data:[],totalCount:0},
  answerList: [],
  result: {}
};

const actions = {
  async addIssue({ commit }, issue) {
    const result = await reqAddIssues(
      issue.videoId,
      issue.name,
      issue.content,
      issue.questionerId
    );
    commit(REQUEST_ADD_ISSUE, { result: result });
  },

  async getAllIssueList({ commit }, { videoId, pageNum, pagesize }) {
    const result = await reqGetAllIssueList(videoId, pageNum, pagesize, "id");
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ISSUEALLLIST, { issueList: result.data });
    }
  },

  async getUserAllIssueList({ commit }, { userId, pageNum, pagesize }) {
    const result = await reqGetUserAllIssueList(
      userId,
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ISSUEALLLIST, { issueList: result.data });
    }
  },

  async answerIssue({ commit }, answer) {
    const result = await reqAnswerIssue(
      answer.issueId,
      answer.name,
      answer.answererId
    );
    commit(REQUEST_ANSWER_ISSUE, { result: result });
  },

  async getAllAnswerList({ commit }, issueId) {
    const result = await reqGetAllAnswerList(issueId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ANSWERALLLIST, { answerList: result.data });
    }
  }
};

const mutations = {
  [REQUEST_ADD_ISSUE](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_ISSUEALLLIST](state, { issueList }) {
    var _data = [];
    if (issueList.data != null && issueList.data.length>0) {
      for (var index in issueList.data) {
          var _item=issueList.data[index];
        _data.push({
          index: Number(index) + 1,
          id: _item.id,
          videoId: _item.videoId,
          name: _item.name,
          content: _item.content,
          status: _item.status,
          answerCount: _item.answerCount,
          questioner: _item.userResponseVo,
          createDateTime: _item.createDateTime
        });
      }
    }
    state.issueList.data=_data;
    state.issueList.totalCount=issueList.totalCount
    state.issueList.currentNum=issueList.currentNum
  },
  [REQUEST_ANSWER_ISSUE](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_ANSWERALLLIST](state, { answerList }) {
    var _data = [];
    if (issueList != null) {
      for (var index in answerList) {
        _data.push({
          index: Number(index) + 1,
          id: answerList[index].id,
          issueId: answerList[index].issueId,
          content: answerList[index].content,
          status: answerList[index].status,
          createDateTime: answerList[index].createDateTime,
          answerner: answerList[index].userResponseVo
        });
      }
    }
    state.answerList = _data;
  }
};

export default {
  state,
  actions,
  mutations
};
