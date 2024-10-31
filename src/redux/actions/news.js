/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from './types';

export const fetchNewsInfo = (params) => ({ type: actionTypes.FETCH_NEWS_INFO, payload: params });
export const fetchNewsSuccess = (data) => ({ type: actionTypes.FETCH_NEWS_SUCCESS, data: data });
export const fetchNewsFailed = (message) => ({ type: actionTypes.FETCH_NEWS_FAILED, message: message });