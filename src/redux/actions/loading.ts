/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from "./types";

export const setLoading = (params: boolean) => ({
  type: actionTypes.SET_LOADING,
  data: params,
});
