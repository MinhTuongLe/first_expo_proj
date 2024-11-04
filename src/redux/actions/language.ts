/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from "./types";

export const changeLanguage = (params: string) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  payload: params,
});
