import ajax from "./ajax";

const BASE_URL = "/api";

/**
 * 发生验证码
 * @param {*} mobilePhoneNo 
 * @param {*} category 
 */
export const reqSendValidationCode = (mobilePhoneNo, category) =>
  ajax(BASE_URL+"/validation/code", { mobilePhoneNo, category }, "POST");
