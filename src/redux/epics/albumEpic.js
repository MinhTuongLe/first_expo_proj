/**
 * Created by dang.le from 12/09/2018
 */
import { filter, mergeMap } from 'rxjs/operators';

import * as actionTypes from '../actions/types';
import Api from '../../services/api';


export const albumEpic = action$ => action$.pipe(
  filter(action => action.type === actionTypes.FETCH_ALBUM_INFO),
  mergeMap(obj => {
    let params = {
      page: obj.payload.page,
      type: obj.payload.type,
    }

    return Api.put('/album/list', params).then((resp) => {
      if (resp) {
        if (resp.code === 'ERR_ALBUM_004') {
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
    type: actionTypes.FETCH_ALBUM_FAILED,
    message: param
  })
}

export const fetchSuccess = (param1, param2) => {
  return ({
    type: actionTypes.FETCH_ALBUM_SUCCESS,
    data: param1,
    typeFetchData: param2
  })
}