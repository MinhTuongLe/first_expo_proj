/**
 * Created by dang.le from 17/09/2018
 */
import * as actionTypes from "../actions/types";

const initialState = {
  isFetch: false,
  data: null,
  message: "",
};

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.FETCH_HOME_INFO:
      return {
        ...state,
        isFetch: true,
        message: "",
      };
    case actionTypes.FETCH_HOME_SUCCESS:
      return {
        ...state,
        isFetch: false,
        data: action.data,
        message: "success",
      };
    case actionTypes.FETCH_HOME_FAILED:
      return {
        ...state,
        isFetch: false,
        message: action.message,
      };
    default:
      return state;
  }
}
