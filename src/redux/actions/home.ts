/**
 * Created by dang.le from 17/09/2018
 */
import * as actionTypes from "./types";

export const fetchHomeInfo = (params: any) => ({
  type: actionTypes.FETCH_HOME_INFO,
  payload: params,
});
export const fetchHomeSuccess = (data: any) => ({
  type: actionTypes.FETCH_HOME_SUCCESS,
  data: data,
});
export const fetchHomeFailed = (message: any) => ({
  type: actionTypes.FETCH_HOME_FAILED,
  message: message,
});
