/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from "./types";

export const initSocket = (params: any) => ({
  type: actionTypes.SOCKET_INIT,
  payload: params,
});
