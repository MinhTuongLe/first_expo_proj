/**
 * @Description: get master data actions
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
import * as actionTypes from "./types";

export const getParentMasterDataSuccess = (data: any) => ({
  type: actionTypes.GET_MASTER_PARENTS_SUCCESS,
  data,
});
