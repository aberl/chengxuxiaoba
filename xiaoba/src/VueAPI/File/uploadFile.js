import { Message } from 'element-ui';

import { reqUploadFile, reqRemoveUploadFile } from "../../api";

export function uploadFile(uploader, filepurpose) {
  var form = new FormData();
  form.append("uploadFile", uploader.file);
  form.append("purpose", filepurpose);
  var config = {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.lengthComputable) {
        let percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        uploader.onProgress({
          percent
        });
      }
    }
  };
  const result = reqUploadFile(form, config);
  return result;
}

export function isMatchFileSize(file, fileLimitSize)
{
  if (file.size / 1024 / 1024 > fileLimitSize) {
    Message.error(
      "只能上传jpg/png文件，且不超过" + fileLimitSize + "M"
    );
    return false;
  }

  return true;
}

export function isMatchUploaded(file, fileList){
  var _index=getIndex(file, fileList);

  if (_index >= 0) {
    Message.error(file.name + "已上传");
    return false;
  }

  return true;

}

export function getIndex(file, fileList){
  var removeIndex = -1;
  for (var index in fileList) {
    if (fileList[index].name == file.name) {
      removeIndex = index;
    }
  }
  return removeIndex;
}

export function removeFile(file, fileList)
{
  var _removeIndex=getIndex(file, fileList);

  if (_removeIndex != -1) {
    var newname=fileList[_removeIndex].newname;
    const result = reqRemoveUploadFile(newname);
    return result;
  }

  return null;
}