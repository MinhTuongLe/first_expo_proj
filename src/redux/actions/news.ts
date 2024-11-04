/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from "./types";

export const fetchNewsInfo = (params: any) => ({
  type: actionTypes.FETCH_NEWS_INFO,
  payload: params,
});
export const fetchNewsSuccess = (data: any) => ({
  type: actionTypes.FETCH_NEWS_SUCCESS,
  data: data,
});
export const fetchNewsFailed = (message: any) => ({
  type: actionTypes.FETCH_NEWS_FAILED,
  message: message,
});
