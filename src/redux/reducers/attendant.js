/**
 * Created by tuananh from 12/11/2018
 */
import * as actionTypes from '../actions/types';

const initialState = {
  isFetch: false,
  data: null,
  message: ''
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_ATTENDANT_INFO:
      return {
          ...state,
          isFetch: true,
          message: ''
      };
    case actionTypes.FETCH_ATTENDANT_SUCCESS:
      return {
          ...state,
          isFetch: false,
          data: action.data,
          message: 'success'
      };
    case actionTypes.FETCH_ATTENDANT_FAILED:
      return {
          ...state,
          isFetch: false,
          message: action.message
      };   
    default:
      return state;
  }
}