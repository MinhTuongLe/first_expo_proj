/**
 * Created by dang.le from 14/09/2018
 */
import * as actionTypes from "./types";

export const setNotRead = (data: any) => ({
  type: actionTypes.SAVE_MESSAGES_DATA_NOT_READ,
  data: data,
});
