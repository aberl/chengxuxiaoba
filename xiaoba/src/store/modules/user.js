/**
 * 用户模块
 */
import {
  reqGetUserList,
  reqGetUserInfo,
  reqGetRoleList,
  reqModifyUser,
  reqGetRole,
  reqGetRolePaymentList,
  reqUpdateUserRoleRelationship
} from "../../api";

import {
  REQUEST_RECEIVE_USERALLLIST,
  REQUEST_RECEIVE_USERINFO,
  REQUEST_CONSERVE_USERINFO,
  REQUEST_REMOVE_USERINFO,
  REQUEST_RECEIVE_CURRENT_LOGIN_USERINFO,
  REQUEST_RECEIVE_ROLEALLLIST,
  REQUEST_UPDATE_USERINFO,
  REQUEST_RECEIVE_ROLE,
  REQUEST_RECEIVE_ROLEPAYMENTLIST
} from "../mutation-types.js";

const state = {
  usercount: 0,
  userlist: { currentNum: 1, data: [], totalCount: 0 },
  userInfo: {},
  currentLoginUser: {},
  roles: [],
  result: {},
  role: {},
  rolePaymentList: []
};

const actions = {
  async loginWithPhonePassword({ commit }, { mobilephone, password }) {},

  async refreshCurrentUserInfo({ commit }) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      return;
    }
    var userId = userInfo.id;
    const result = await reqGetUserInfo(userId);
    if (result.code == 0) {
      commit(REQUEST_CONSERVE_USERINFO, { userInfo: result.data });
    }
  },
  async getrole({ commit }, id) {
    const result = await reqGetRole(id);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ROLE, { role: result.data });
    }
  },
  async getrolelist({ commit }) {
    const result = await reqGetRoleList();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ROLEALLLIST, { roles: result.data });
    }
  },
  async getrolepaymentlist({ commit }, roleId) {
    const result = await reqGetRolePaymentList(roleId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ROLEPAYMENTLIST, { rolePaymentList: result.data });
    }
  },
  async updateUserRoleRelationship({ commit }, { userId, roleId }) {
    const result = await reqUpdateUserRoleRelationship(userId, roleId);
    commit(REQUEST_UPDATE_USERINFO, { result });
  },
  async getuserlist({ commit }, { pageNum, pagesize, query }) {
    const result = await reqGetUserList(pageNum, pagesize, "-id", query);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_USERALLLIST, { userlist: result.data });
    }
  },
  async getuserinfo({ commit }, id) {
    const result = await reqGetUserInfo(id);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_USERINFO, { userInfo: result.data });
    }
  },
  async updateUserInfo({ commit }, userInfo) {
    const result = await reqModifyUser(userInfo);
    commit(REQUEST_UPDATE_USERINFO, { result });
  },
  receiveUserInfo({ commit }, userInfo) {
    commit(REQUEST_RECEIVE_USERINFO, { userInfo });
  },
  conserveCurrentUserInfo({ commit }, userInfo) {
    commit(REQUEST_CONSERVE_USERINFO, { userInfo });
  },
  getCurrentLoginUserInfo({ commit }) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      return;
    }

    commit(REQUEST_RECEIVE_CURRENT_LOGIN_USERINFO, { userInfo });
  },
  removeCurrentUserInfo({ commit }) {
    commit(REQUEST_REMOVE_USERINFO);
  }
};

const mutations = {
  [REQUEST_RECEIVE_ROLE](state, { role }) {
    state.role = role;
  },
  [REQUEST_RECEIVE_ROLEALLLIST](state, { roles }) {
    state.roles = roles;
  },
  [REQUEST_UPDATE_USERINFO](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_USERALLLIST](state, { userlist }) {
    state.userlist.data = userlist.data;
    state.userlist.totalCount = userlist.totalCount;
    state.userlist.currentNum = userlist.currentNum;
  },
  [REQUEST_RECEIVE_USERINFO](state, { userInfo }) {
    state.userInfo = userInfo;
  },
  [REQUEST_RECEIVE_CURRENT_LOGIN_USERINFO](state, { userInfo }) {
    state.currentLoginUser = userInfo;
  },
  [REQUEST_CONSERVE_USERINFO](state, { userInfo }) {
    state.currentLoginUser = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  [REQUEST_REMOVE_USERINFO](state) {
    state.currentLoginUser = {};
    localStorage.removeItem("userInfo");
  },
  [REQUEST_RECEIVE_ROLEPAYMENTLIST](state, { rolePaymentList }) {
    state.rolePaymentList = rolePaymentList;
  }
};

export default {
  state,
  actions,
  mutations
};
