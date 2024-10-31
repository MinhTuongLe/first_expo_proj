/**
 * Created by ZiniTeam from 17/07/2020
 */
import * as actionTypes from "../actions/types";

const initialState = {
  data: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_SCHOOL_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
