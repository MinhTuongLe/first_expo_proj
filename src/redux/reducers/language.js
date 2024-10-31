/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from '../actions/types';

const initialState = {
  language: 'en'
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    default:
      return state;
  }
}
