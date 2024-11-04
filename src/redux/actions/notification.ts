/**
 * Created by dang.le from 14/09/2018
 */
import * as actionTypes from "./types";

export const fetchNotificationInfo = (params: any) => ({
  type: actionTypes.FETCH_NOTIFICATION_INFO,
  payload: params,
});
export const fetchNotificationSuccess = (data: any) => ({
  type: actionTypes.FETCH_NOTIFICATION_SUCCESS,
  data: data,
});
export const fetchNotificationFailed = (message: any) => ({
  type: actionTypes.FETCH_NOTIFICATION_FAILED,
  message: message,
});

export const setNotRead = (data: any) => ({
  type: actionTypes.SAVE_NOTIFICATION_DATA_NOT_READ,
  data: data,
});
