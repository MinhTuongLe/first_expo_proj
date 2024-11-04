/**
 * Created by dang.le from 17/09/2018
 */
import { filter, mergeMap } from "rxjs/operators";

import * as actionTypes from "../actions/types";
import Api from "../../services/api";

export const homeEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.FETCH_HOME_INFO),
    mergeMap((obj: any) => {
      let params = {
        page: obj.payload.page,
      };

      return Api.put("/home/search", params).then((resp) => {
        if (resp) {
          if (resp.code === "ERR_HOME_001") {
            return fetchFailed(resp.message);
          } else if (resp.code === "SUCCESS_200") {
            return fetchSuccess(resp.data);
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
    type: actionTypes.FETCH_HOME_FAILED,
    message: param,
  };
};

export const fetchSuccess = (param: any) => {
  return {
    type: actionTypes.FETCH_HOME_SUCCESS,
    data: param,
  };
};
