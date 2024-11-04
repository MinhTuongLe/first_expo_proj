/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from "./types";

export const fetchHealthInfo = (params: any) => ({
  type: actionTypes.FETCH_HEALTH_INFO,
  payload: params,
});
export const fetchHealthSuccess = (data: any) => ({
  type: actionTypes.FETCH_HEALTH_SUCCESS,
  data: data,
});
export const fetchHealthFailed = (message: any) => ({
  type: actionTypes.FETCH_HEALTH_FAILED,
  message: message,
});
