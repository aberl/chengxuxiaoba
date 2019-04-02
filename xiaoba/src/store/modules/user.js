/**
 * 用户模块
 */

import mutation_type from "../mutation-types.js";
import { reqSendValidationCode } from "../../api";

const state = {
  validatetionCode: null
};

const actions = {
  async sendValidtionCode({ commit, state }, { mobilePhoneNo, category }) {
    const result = await reqSendValidationCode(mobilePhoneNo, category);
    console.log(result);
    commit(mutation_type.REQUEST_SENDVALIDATIONCODE, result);
  }
};

const mutations = {
  [mutation_type.REQUEST_SENDVALIDATIONCODE](state, { code, message }) {
    state.validatetionCode = { code, message };
    console.log(state.validatetionCode);
  }
};

export default {
  state,
  actions,
  mutations
};
