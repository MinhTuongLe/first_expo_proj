/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from './types';

export const fetchAlbumInfo = (params) => ({ type: actionTypes.FETCH_ALBUM_INFO, payload: params });
export const fetchAlbumSuccess = (data) => ({ type: actionTypes.FETCH_ALBUM_SUCCESS, data: data });
export const fetchAlbumFailed = (message) => ({ type: actionTypes.FETCH_ALBUM_FAILED, message: message });