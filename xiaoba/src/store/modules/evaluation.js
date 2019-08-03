/**
 * 评价模块
 */
import {
  REQUEST_ADD_EVALUATION,
  REQUEST_DELETE_EVALUATION,
  REQUEST_RECEIVE_EVALUATIONALLLIST
} from "../mutation-types.js";

import {
  reqAddEvaluate,
  reqGetAllEvaluatesList,
  reqGetUserAllEvaluatesList,
  reqGetEffectiveEvaluatesList,
  reqRemoveEvaluate
} from "../../api";

const state = {
  evaluation: {},
  evaluationList: { currentNum: 1, data: [], totalCount: 0 },
  result: {}
};

const actions = {
  async addEvaluation({ commit }, evaluation) {
    const result = await reqAddEvaluate(
      evaluation.videoId,
      evaluation.content,
      evaluation.stars
    );

    commit(REQUEST_ADD_EVALUATION, { result: result });
  },
  async removeEvaluation({ commit }, evaluationId) {
    const result = await reqRemoveEvaluate(evaluationId);

    commit(REQUEST_DELETE_EVALUATION, { result: result });
  },
  async getAllEvaluationList({ commit }, { videoId, pageNum, pagesize }) {
    const result = await reqGetAllEvaluatesList(
      videoId,
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_EVALUATIONALLLIST, {
        evaluationList: result.data
      });
    }
  },
  async getEffectiveEvaluationList({ commit }, { videoId, pageNum, pagesize }) {
    const result = await reqGetEffectiveEvaluatesList(
      videoId,
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_EVALUATIONALLLIST, {
        evaluationList: result.data
      });
    }
  },
  async getAllUserEvaluationList({ commit }, { pageNum, pagesize }) {
    const result = await reqGetUserAllEvaluatesList(
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_EVALUATIONALLLIST, {
        evaluationList: result.data
      });
    }
  }
};

const mutations = {
  [REQUEST_ADD_EVALUATION](state, { result }) {
    state.result = result;
  },
  [REQUEST_DELETE_EVALUATION](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_EVALUATIONALLLIST](state, { evaluationList }) {
    var _data = [];
    if (evaluationList.data != null && evaluationList.data.length > 0) {
      for (var index in evaluationList.data) {
        _data.push({
          index: Number(index) + 1,
          id: evaluationList.data[index].id,
          videoId: evaluationList.data[index].videoId,
          content: evaluationList.data[index].content,
          stars: evaluationList.data[index].stars,
          status: evaluationList.data[index].status,
          accountName: evaluationList.data[index].accountName,
          accountId: evaluationList.data[index].accountId,
          praiseCount: evaluationList.data[index].praiseCount,
          statusDesc: evaluationList.data[index].statusDesc,
          createDateTime: evaluationList.data[index].createDateTime
        });
      }
    }
    state.evaluationList.data = _data;
    state.evaluationList.totalCount = evaluationList.totalCount;
    state.evaluationList.currentNum = evaluationList.currentNum;
  }
};

export default {
  state,
  actions,
  mutations
};
