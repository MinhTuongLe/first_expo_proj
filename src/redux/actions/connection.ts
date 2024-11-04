/**
 * @Description: Connection actions
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
import * as actionTypes from "./types";

export const updateNetStatus = (status: boolean) => ({
  type: actionTypes.UPDATE_CONNECTION_STATUS,
  status,
});
