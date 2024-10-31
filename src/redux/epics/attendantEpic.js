import { filter, mergeMap } from 'rxjs/operators';

import * as actionTypes from '../actions/types';
import Api from '../../services/api';

  
export const attendantEpic = action$ => action$.pipe(
    filter(action => action.type === actionTypes.FETCH_ATTENDANT_FAILED),
    mergeMap(obj => {
      let params = {
        class: obj.payload.class,
      }
  
      return Api.put('/attendant/checkStudentByClass', params).then((resp) => {
        // console.log("request attedant")
        if (resp) {
          if (resp.code === 'ERR_ATTENDANT_004') {

            return fetchFailed(resp.message);
          } else if (resp.code === 'SUCCESS_200') {
            return fetchSuccess(resp.data, params.type);
          } else {
            return fetchFailed('Lỗi không xác định');
          }
        } else {
          return fetchFailed('Lỗi không xác định');
        }
      })
    })
  )

export const fetchFailed = (param) => {
    return ({
      type: actionTypes.FETCH_ATTENDANT_FAILED,
      message: param
    })
  }
  
  export const fetchSuccess = (param1, param2) => {
    // console.log("success")
    return ({
      type: actionTypes.FETCH_ATTENDANT_SUCCESS,
      data: param1,
      typeFetchData: param2
    })
  }