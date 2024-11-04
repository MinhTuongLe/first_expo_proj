/**
 * Created by dang.le from 12/09/2018
 */
import { filter, mergeMap } from "rxjs/operators";

import * as actionTypes from "../actions/types";
import Api from "../../services/api";

export const newsEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.FETCH_NEWS_INFO),
    mergeMap((obj: any) => {
      let params = {
        page: obj.payload.page,
        type: obj.payload.type,
      };

      return Api.put("/post/newPost", params).then((resp) => {
        if (resp) {
          if (resp.code === "ERR_NEWS_001") {
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
    type: actionTypes.FETCH_NEWS_FAILED,
    message: param,
  };
};

export const fetchSuccess = (param1: any, param2: any) => {
  return {
    type: actionTypes.FETCH_NEWS_SUCCESS,
    data: param1,
    typeFetchData: param2,
  };
};
