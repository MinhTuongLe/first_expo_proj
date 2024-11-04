/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from "./types";

export const fetchAlbumInfo = (params: any) => ({
  type: actionTypes.FETCH_ALBUM_INFO,
  payload: params,
});
export const fetchAlbumSuccess = (data: any) => ({
  type: actionTypes.FETCH_ALBUM_SUCCESS,
  data: data,
});
export const fetchAlbumFailed = (message: any) => ({
  type: actionTypes.FETCH_ALBUM_FAILED,
  message: message,
});
