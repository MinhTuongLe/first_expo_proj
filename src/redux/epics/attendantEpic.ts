import { filter, mergeMap } from "rxjs/operators";

import * as actionTypes from "../actions/types";
import Api from "../../services/api";

export const attendantEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.FETCH_ATTENDANT_FAILED),
    mergeMap((obj: any) => {
      let params = {
        class: obj.payload.class,
      };

      return Api.put("/attendant/checkStudentByClass", params).then(
        (resp: any) => {
          // console.log("request attedant")
          if (resp) {
            if (resp.code === "ERR_ATTENDANT_004") {
              return fetchFailed(resp.message);
            } else if (resp.code === "SUCCESS_200") {
              return fetchSuccess(resp.data, params.type);
            } else {
              return fetchFailed("Lỗi không xác định");
            }
          } else {
            return fetchFailed("Lỗi không xác định");
          }
        }
      );
    })
  );

export const fetchFailed = (param: any) => {
  return {
    type: actionTypes.FETCH_ATTENDANT_FAILED,
    message: param,
  };
};

export const fetchSuccess = (param1: any, param2: any) => {
  // console.log("success")
  return {
    type: actionTypes.FETCH_ATTENDANT_SUCCESS,
    data: param1,
    typeFetchData: param2,
  };
};
