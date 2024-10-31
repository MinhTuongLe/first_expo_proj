/**
 * Created by dang.le from 14/09/2018
 */
import * as actionTypes from './types';

export const fetchNotificationInfo = (params) => ({ type: actionTypes.FETCH_NOTIFICATION_INFO, payload: params });
export const fetchNotificationSuccess = (data) => ({ type: actionTypes.FETCH_NOTIFICATION_SUCCESS, data: data });
export const fetchNotificationFailed = (message) => ({ type: actionTypes.FETCH_NOTIFICATION_FAILED, message: message });

export const setNotRead = (data) => ({ type: actionTypes.SAVE_NOTIFICATION_DATA_NOT_READ, data: data });
