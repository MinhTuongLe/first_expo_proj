/**
 * Created by dang.le from 14/09/2018
 */
import * as actionTypes from "../actions/types";

const initialState = {
  msgNotRead: 0,
};

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.SAVE_MESSAGES_DATA_NOT_READ:
      return {
        ...state,
        msgNotRead: action.data,
      };

    default:
      return state;
  }
}
