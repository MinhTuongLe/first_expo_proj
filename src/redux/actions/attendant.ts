/**
 * Created by tuananh from 12/11/2018
 */
import * as actionTypes from "./types";

export const fetchAttendanInfo = (params: any) => ({
  type: actionTypes.FETCH_ATTENDANT_INFO,
  payload: params,
});
export const fetchAttendanSuccess = (data: any) => ({
  type: actionTypes.FETCH_ATTENDANT_SUCCESS,
  data: data,
});
export const fetchAttendanFailed = (message: any) => ({
  type: actionTypes.FETCH_ATTENDANT_FAILED,
  message: message,
});
