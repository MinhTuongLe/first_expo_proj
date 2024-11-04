/**
 * Created by ZiniTeam 20/03/2019
 */
import * as actionTypes from "../actions/types";

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
}
