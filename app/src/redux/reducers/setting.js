/**
 * @copyright 2019 @ ZiniMedia Team
 * @author dungha
 * @create 2019/07/01
 */

/** ACTION TYPE */
import * as actionTypes from '../actions/types';

const initialState = {
  config: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        config: action.data
      };

    default:
      return state;
  }
}
