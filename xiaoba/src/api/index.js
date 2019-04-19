import ajax from "./ajax";

const BASE_URL = "/api";

/**
 * 发生验证码
 * @param {*} mobilePhoneNo
 * @param {*} category
 */
export const reqSendValidationCode = (mobilePhoneNo, category) =>
  ajax(BASE_URL + "/validation/code", { mobilePhoneNo, category }, "POST");

/**
 * 注册
 * @param {*} mobilePhoneNo
 * @param {*} validationCode
 * @param {*} password
 */
export const reqRegisterAccount = (mobilePhoneNo, validationCode, password) =>
  ajax(
    BASE_URL + "/users/account",
    { mobilePhoneNo, validationCode, password },
    "POST"
  );

/**
 * 根据用户手机号获取用户信息
 * @param {*} mobilePhoneNo
 */
export const reqGetUserInfoByMobilePhone = mobilePhoneNo =>
  ajax(BASE_URL + "/users/mobilephoneno/" + mobilePhoneNo);

/**
 * 用户登录
 * @param {*} mobilePhoneNo
 * @param {*} password
 */
export const reqLogin = (mobilePhoneNo, password) =>
  ajax(BASE_URL + "/users/token", { mobilePhoneNo, password }, "POST");

/**
 * 修改密碼
 * @param {*} mobilePhoneNo
 * @param {*} validationCode
 * @param {*} password
 */
export const reResetPassword = (mobilePhoneNo, validationCode, password) =>
  ajax(
    BASE_URL + "/users/password",
    { mobilePhoneNo, validationCode, password },
    "PUT"
  );

/**
 * 上传文件
 * @param {*} purpose 
 * @param {*} uploadFile 
 */
export const reqUploadFile = (form) =>
ajax(
  BASE_URL + "/uploadfile/file",
  form,
  "POST",
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
);