import Cookies from "js-cookie";
import { Base64 } from "js-base64";
import { toParse } from "@/utils/common";
import { LoginInfoType, UserInfoType } from "@/services/modules/user";

const COOKIE_KEY = "Token";
const USER_INFO = "user_info";
const LOGIN_INFO = "login_info";

/** ==================================  存储Cookie  ================================== */
/** 获取Cookie */
export const getCookie = () => {
  return Cookies.get(COOKIE_KEY) || "";
};

/** 设置Cookie */
export const setCookie = (cookie: string) => {
  Cookies.set(COOKIE_KEY, cookie);
};

/** 移除Cookie */
export const removeCookie = () => {
  Cookies.remove(COOKIE_KEY);
};

/** ==================================  存储用户信息  ================================== */

/** 获取用户信息*/
export const getUserInfo = (): UserInfoType => {
  const data: UserInfoType = toParse(localStorage.getItem(USER_INFO) as string);
  return data;
};

/** 设置用户信息 */
export const setUserInfo = (userInfo: UserInfoType) => {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
};

/** 移除用户信息 */
export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO);
};

/** ==================================  存储登录信息  ================================== */

/** 获取登录信息*/
export const getLoginInfo = (): LoginInfoType => {
  const loginData = localStorage.getItem(LOGIN_INFO);
  const result = loginData ? Base64.decode(loginData) : "{}";
  return toParse(result);
};

/** 设置登录信息 */
export const setLoginInfo = (loginInfo: LoginInfoType) => {
  const loginData = JSON.stringify(loginInfo);
  const result = Base64.encode(loginData);
  localStorage.setItem(LOGIN_INFO, result);
};

/** 移除登录信息 */
export const removeLoginInfo = () => {
  localStorage.removeItem(LOGIN_INFO);
};
