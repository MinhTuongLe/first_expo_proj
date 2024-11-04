/**
 * Created by dang.le from 14/09/2018
 */
import { filter, mergeMap } from "rxjs/operators";

import * as actionTypes from "../actions/types";
import Api from "../../services/api";

export const notificationEpic = (action$: any) =>
  action$.pipe(
    filter(
      (action: any) => action.type === actionTypes.FETCH_NOTIFICATION_INFO
    ),
    mergeMap((obj: any) => {
      let params = {
        page: obj.payload.page,
        type: obj.payload.type,
      };

      return Api.put("/notification/newNote", params).then((resp) => {
        if (resp) {
          if (resp.code === "ERR_NOTIFICATION_001") {
            return fetchFailed(resp.message);
          } else if (resp.code === "SUCCESS_200") {
            return fetchSuccess(resp.data, params.type);
          } else {
            return fetchFailed("Lỗi không xác định");
          }
        } else {
          return fetchFailed("Lỗi không xác định");
        }
      });
    })
  );

export const fetchFailed = (param: any) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_FAILED,
    message: param,
  };
};

export const fetchSuccess = (param1: any, param2: any) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_SUCCESS,
    data: param1,
    typeFetchData: param2,
  };
};
