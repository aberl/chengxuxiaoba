/**
 * 问题模块
 */

import {
  REQUEST_ADD_ISSUE,
  REQUEST_RECEIVE_ISSUEDETAILS,
  REQUEST_RECEIVE_ISSUEALLLIST,
  REQUEST_ANSWER_ISSUE,
  REQUEST_RECEIVE_ANSWERALLLIST
} from "../mutation-types.js";

import {
  reqAddIssues,
  reqGetIssue,
  reqGetAllIssueList,
  reqGetUserAllIssueList,
  reqAnswerIssue,
  reqGetAllAnswerList
} from "../../api";

const state = {
  issue: {},
  issueList: { currentNum: 1, data: [], totalCount: 0 },
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

  async getIssue({ commit }, issueId) {
    const result = await reqGetIssue(issueId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ISSUEDETAILS, { issue: result.data });
    }
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
      answer.content,
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
  [REQUEST_RECEIVE_ISSUEDETAILS](state, { issue }) {
    var _issue = {
      id: issue.id,
      videoId: issue.videoId,
      name: issue.name,
      content: issue.content,
      status: issue.status,
      answerCount: issue.answerCount,
      questioner: issue.userResponseVo,
      createDateTime: issue.createDateTime
    };
    state.issue = _issue;
  },
  [REQUEST_RECEIVE_ISSUEALLLIST](state, { issueList }) {
    var _data = [];
    if (issueList.data != null && issueList.data.length > 0) {
      for (var index in issueList.data) {
        var _item = issueList.data[index];
        var _answerList=[]
        if (_item.answerResponseVoList != null) {
            for (var index in _item.answerResponseVoList) {
                _answerList.push({
                index: Number(index) + 1,
                id: _item.answerResponseVoList[index].id,
                issueId: _item.answerResponseVoList[index].issueId,
                content: _item.answerResponseVoList[index].content,
                status: _item.answerResponseVoList[index].status,
                createDateTime: _item.answerResponseVoList[index].createDateTime,
                answerner: _item.answerResponseVoList[index].userResponseVo
              });
            }
          }

        _data.push({
          index: Number(index) + 1,
          id: _item.id,
          videoId: _item.videoId,
          name: _item.name,
          content: _item.content,
          status: _item.status,
          answerCount: _item.answerCount,
          questioner: _item.userResponseVo,
          createDateTime: _item.createDateTime,
          answerList:_answerList
        });
      }
    }
    state.issueList.data = _data;
    state.issueList.totalCount = issueList.totalCount;
    state.issueList.currentNum = issueList.currentNum;
  },
  [REQUEST_ANSWER_ISSUE](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_ANSWERALLLIST](state, { answerList }) {
    var _data = [];
    if (answerList != null) {
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
