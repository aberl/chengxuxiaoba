/**
 * 用户模块
 */

import {
  REQUEST_RECEIVE_USERINFO,
  REQUEST_CONSERVE_USERINFO,
  REQUEST_REMOVE_USERINFO
} from "../mutation-types.js";

const state = {
  userInfo: {} //|| JSON.parse(localStorage.getItem("userInfo"))
};

const actions = {
  receiveUserInfo({ commit }, userInfo) {
    commit(REQUEST_RECEIVE_USERINFO, { userInfo });
  },
  conserveUserInfo({ commit }, userInfo) {
    commit(REQUEST_CONSERVE_USERINFO, { userInfo });
  },
  getUserInfo({ commit }) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      return;
    }
    
    commit(REQUEST_RECEIVE_USERINFO, { userInfo });
  },
  removeUserInfo({ commit }) {
    commit(REQUEST_REMOVE_USERINFO);
  }
};

const mutations = {
  [REQUEST_RECEIVE_USERINFO](state, { userInfo }) {
    state.userInfo = userInfo;
  },
  [REQUEST_CONSERVE_USERINFO](state, { userInfo }) {
    state.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  [REQUEST_REMOVE_USERINFO](state) {
    state.userInfo = {};
    localStorage.removeItem("userInfo");
  }
};

export default {
  state,
  actions,
  mutations
};
