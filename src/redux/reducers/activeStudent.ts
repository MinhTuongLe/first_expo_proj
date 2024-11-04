/* eslint-disable prettier/prettier */
/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from "../actions/types";

const initialState = "";

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.CHANGE_STUDENT:
      return action.payload;
    default:
      return state;
  }
}
