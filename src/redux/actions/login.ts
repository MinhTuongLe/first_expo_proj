/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from "./types";

export const fetchUserInfo = (params: any) => ({
  type: actionTypes.FETCH_USER_INFO,
  payload: params,
});
export const fetchUserSuccess = (data: any) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  data: data,
});
export const fetchUserFailed = (message: any) => ({
  type: actionTypes.FETCH_USER_FAILED,
  message: message,
});

export const fetchChangeInfo = (params: any) => ({
  type: actionTypes.FETCH_CHANGE_INFO,
  payload: params,
});
export const fetchChangeSuccess = (data: any) => ({
  type: actionTypes.FETCH_CHANGE_SUCCESS,
  data: data,
});
export const fetchChangeFailed = (message: any) => ({
  type: actionTypes.FETCH_CHANGE_FAILED,
  message: message,
});

export const logOutUser = () => ({ type: actionTypes.LOG_OUT_USER });
