/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from './types';

export const changeClass = activeClass => ({
  type: actionTypes.CHANGE_CLASS,
  payload: activeClass,
});
