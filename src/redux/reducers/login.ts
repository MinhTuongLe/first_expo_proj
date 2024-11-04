/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from "../actions/types";

const initialState = {
  isFetch: false,
  data: null,
  message: "",
  messageEdit: "",
};

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.FETCH_USER_INFO:
      return {
        ...state,
        isFetch: true,
        data: null,
        message: "",
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetch: false,
        data: action.data,
        message: "success",
      };
    case actionTypes.FETCH_USER_FAILED:
      return {
        ...state,
        isFetch: false,
        data: null,
        message: action.message,
      };
    case actionTypes.FETCH_CHANGE_INFO:
      return {
        ...state,
        isFetch: true,
        messageEdit: "",
      };
    case actionTypes.FETCH_CHANGE_SUCCESS:
      return {
        ...state,
        isFetch: false,
        data: action.data,
        messageEdit: "success",
      };
    case actionTypes.FETCH_CHANGE_FAILED:
      return {
        ...state,
        isFetch: false,
        messageEdit: action.message,
      };
    case actionTypes.LOG_OUT_USER:
      return {
        ...state,
        isFetch: false,
        message: "",
      };
    default:
      return state;
  }
}
