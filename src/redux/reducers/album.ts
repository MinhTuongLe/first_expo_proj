/**
 * Created by dang.le from 12/09/2018
 */
import * as actionTypes from "../actions/types";
import { KEY } from "../../config";

const initialState = {
  isFetch: false,
  data: [],
  dataAfterFetch: [],
  message: "",
};

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.FETCH_ALBUM_INFO:
      return {
        ...state,
        isFetch: true,
        dataAfterFetch: [],
        message: "",
      };
    case actionTypes.FETCH_ALBUM_SUCCESS:
      return {
        ...state,
        isFetch: false,
        data:
          action.typeFetchData == KEY.DATA_REFRESH
            ? action.data
            : state.data.concat(action.data),
        dataAfterFetch: action.data,
        message: "success",
      };
    case actionTypes.FETCH_ALBUM_FAILED:
      return {
        ...state,
        isFetch: false,
        dataAfterFetch: [],
        message: action.message,
      };
    default:
      return state;
  }
}
