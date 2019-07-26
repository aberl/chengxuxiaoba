/**
 * 材料模块
 */
import {
  REQUEST_ADD_MATERIAL,
  REQUEST_MODIFY_MATERIAL,
  REQUEST_RECEIVE_MATERIAL,
  REQUEST_RECEIVE_MATERIALLIST
} from "../mutation-types.js";

import {
  reqAddMaterial,
  reqModifyMaterial,
  reqGetMaterial,
  reqGetAllMaterialList,
  reqGetEffectiveMaterialList,
  reqInactiveMaterial
} from "../../api";

const state = {
  material: {},
  materialList: [],
  result: {}
};

const actions = {
  async addMaterial({ commit }, material) {
    const result = await reqAddMaterial(
      material.name,
      material.file,
      material.desc
    );
    commit(REQUEST_ADD_MATERIAL, { result: result });
  },
  async modifyMaterial({ commit }, material) {
    //get material.file is array
    const result = await reqModifyMaterial(
      material.id,
      material.name,
      material.file[0].newname,
      material.description,
      material.status
    );
    commit(REQUEST_MODIFY_MATERIAL, { result: result });
  },
  async getMaterial({ commit }, materialId) {
    const result = await reqGetMaterial(materialId);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_MATERIAL, { material: result.data });
    }
  },
  async getMaterialAllList({ commit }) {
    const result = await reqGetAllMaterialList();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_MATERIALLIST, { materialList: result.data });
    }
  },
  async getMaterialEffectiveList({ commit }) {
    const result = await reqGetEffectiveMaterialList();

    if (result.code == 0) {
      commit(REQUEST_RECEIVE_MATERIALLIST, { materialList: result.data });
    }
  }
};

const mutations = {
  [REQUEST_ADD_MATERIAL](state, { result }) {
    state.result = result;
  },
  [REQUEST_MODIFY_MATERIAL](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_MATERIAL](state, { material }) {
    //set material.file is array
    let _material = [
      {
        name: material.fileDetail.originName,
        newname: material.fileDetail.name,
        url: material.fileDetail.url
      }
    ];
    material.file = _material;
    material.status = String(material.status)
    state.material = material;
  },
  [REQUEST_RECEIVE_MATERIALLIST](state, { materialList }) {
    var _data = [];
    for (var index in materialList) {
      _data.push({
        index: Number(index) + 1,
        id:materialList[index].id,
        name:materialList[index].name,
        createdatetime:materialList[index].createDateTime,
        status:materialList[index].statusDesc,
          description:materialList[index].description,
        file: {
          name:materialList[index].fileDetail.originName,
          downloadurl:materialList[index].fileDetail.url
        }
      });
    }
    state.materialList = _data;
  }
};

export default {
  state,
  actions,
  mutations
};
