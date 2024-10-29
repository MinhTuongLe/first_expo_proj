/**
 * Created by dang.le from 14/09/2018
 */
import * as actionTypes from '../actions/types';
import { KEY } from '../../config'

const initialState = {
  isFetch: false,
  data: [],
  dataNotRead: 0,
  dataAfterFetch: [],
  message: ''
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_NOTIFICATION_INFO:
      return {
        ...state,
        isFetch: true,
        dataAfterFetch: [],
        message: ''
      };
    case actionTypes.FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isFetch: false,
        data: action.typeFetchData == KEY.DATA_REFRESH ? action.data : state.data.concat(action.data),
        dataAfterFetch: action.data,
        message: 'success'
      };
    case actionTypes.FETCH_NOTIFICATION_FAILED:
      return {
        ...state,
        isFetch: false,
        dataAfterFetch: [],
        message: action.message
      };
    case actionTypes.SAVE_NOTIFICATION_DATA_NOT_READ:
      return {
        ...state,
        isFetch: false,
        dataNotRead: action.data,
        message: 'success'
      }

    default:
      return state;
  }
}
