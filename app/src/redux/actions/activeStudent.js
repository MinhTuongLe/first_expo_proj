/**
 * Created by dang.le from 04/09/2018
 */
import * as actionTypes from './types';

export const changeStudent = activeStudent => ({
  type: actionTypes.CHANGE_STUDENT,
  payload: activeStudent,
});
