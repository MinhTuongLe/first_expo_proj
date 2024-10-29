/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from './types';

export const fetchUserInfo = (params) => ({ type: actionTypes.FETCH_USER_INFO, payload: params });
export const fetchUserSuccess = (data) => ({ type: actionTypes.FETCH_USER_SUCCESS, data: data });
export const fetchUserFailed = (message) => ({ type: actionTypes.FETCH_USER_FAILED, message: message });

export const fetchChangeInfo = (params) => ({ type: actionTypes.FETCH_CHANGE_INFO, payload: params });
export const fetchChangeSuccess = (data) => ({ type: actionTypes.FETCH_CHANGE_SUCCESS, data: data });
export const fetchChangeFailed = (message) => ({ type: actionTypes.FETCH_CHANGE_FAILED, message: message });

export const logOutUser = () => ({ type: actionTypes.LOG_OUT_USER });