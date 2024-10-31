/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from './types';

export const fetchHealthInfo = (params) => ({ type: actionTypes.FETCH_HEALTH_INFO, payload: params });
export const fetchHealthSuccess = (data) => ({ type: actionTypes.FETCH_HEALTH_SUCCESS, data: data });
export const fetchHealthFailed = (message) => ({ type: actionTypes.FETCH_HEALTH_FAILED, message: message });