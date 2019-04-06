/**
 * 用户模块
 */

import {REQUEST_RECEIVE_USERINFO} from "../mutation-types.js";

const state = {
  userInfo: {}
};

const actions = {
  receiveUserInfo({commit}, userInfo){
    commit(REQUEST_RECEIVE_USERINFO, {userInfo})
  }
};

const mutations = {
  [REQUEST_RECEIVE_USERINFO](state, {userInfo}) {
    state.userInfo=userInfo;
  }
};

export default {
  state,
  actions,
  mutations
};
