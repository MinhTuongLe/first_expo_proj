/**
 * Created by dang.le from 04/09/2018
 */
/** LIBRARY */
import { filter, mergeMap } from "rxjs/operators";
import * as actionTypes from "../actions/types";

/** COMMON */
import { CONFIG } from "../../config";

/**
 *
 * @param {*} action$
 *
 * SOCKET REDUX
 */
export const initSocketEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.SOCKET_INIT),
    mergeMap(async (io: any) => {
      try {
        if (!io.sails) {
          io.sails.url = CONFIG.hostSocket;
          io.sails.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
          };
          io.sails.autoConnect = false;
          io.sails.useCORSRouteToGetCookie = false;
          io.sails.query = "nosession=true";
        }
      } catch (error) {
        console.log("Error: ", error);
      }

      return {
        type: actionTypes.SOCKET_INIT,
        io: io,
      };
    })
  );
