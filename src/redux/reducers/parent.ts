/**
 * Created by ZiniTeam from 22/03/2019
 */
import * as actionTypes from "../actions/types";

const initialState = {
  data: null,
};

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.GET_MASTER_PARENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
