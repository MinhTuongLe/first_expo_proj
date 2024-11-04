/**
 * Created by dang.le from 12/09/2018
 */
import { filter, mergeMap } from "rxjs/operators";

import * as actionTypes from "../actions/types";
import Api from "../../services/api";

export const healthEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.FETCH_HEALTH_INFO),
    mergeMap((obj: any) => {
      let params = {
        id: obj.payload.id,
      };

      return Api.put("/student/getStudent", params).then((resp) => {
        if (resp) {
          if (resp.code === "ERR_STUDENT_004") {
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
    type: actionTypes.FETCH_HEALTH_FAILED,
    message: param,
  };
};

export const fetchSuccess = (param: any) => {
  return {
    type: actionTypes.FETCH_HEALTH_SUCCESS,
    data: param,
  };
};
