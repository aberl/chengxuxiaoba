/**
 * 文件模块
 */
import { REQUEST_UPLOAD_FILE, REQUEST_REMOVE_FILE } from "../mutation-types.js";

import { reqUploadFile, reqRemoveUploadFile } from "../../api";

const state = {
  currentUploadResult: { originname: "", newname: "" },
  uploadFiles: []
};

const actions = {
  async uploadFile({ commit }, uploader) {
    var form = new FormData();
    form.append("uploadFile", uploader.file);
    form.append("purpose", "COURSE_BACKGROUND");
    var config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        let percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        if (progressEvent.lengthComputable) {
          uploader.onProgress({
            percent: parseInt(percent)
          });
        }
      }
    };

    const result = await reqUploadFile(form, config);
    if (result.code == 0) {
      var uploadResult = {
        originname: uploader.file.name,
        newname: result.data.name
      };
      commit(REQUEST_UPLOAD_FILE, uploadResult);

      //this.ruleForm.images.push(image);
    }
  },

  async removeFile({ commit }, file) {
    var newname = "";
    var removeIndex = -1;
    for (var index in state.uploadFiles) {
      if ( state.uploadFiles[index].originname == file.name) {
        removeIndex = index;
        newname = state.uploadFiles[index].newname;
      }
    }
    if (removeIndex != -1) {
      const result = await reqRemoveUploadFile(newname);
      if (result.code == 0) {
        commit(REQUEST_REMOVE_FILE, removeIndex);
      } else {
        return false;
      }
    }
  }
};

const mutations = {
  [REQUEST_UPLOAD_FILE](state, uploadResult) {
    state.currentUploadResult.originname = uploadResult.originname;
    state.currentUploadResult.newname = uploadResult.newname;
    state.uploadFiles.push({
      originname: uploadResult.originname,
      newname: uploadResult.newname
    });
  },

  [REQUEST_REMOVE_FILE](state, removeIndex) {
    state.uploadFiles.splice(removeIndex, 1);
  }
};

export default {
  state,
  actions,
  mutations
};
