/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from "../actions/types";

const initialState = {
  data: null
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_MASTER_TEACHERS_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
