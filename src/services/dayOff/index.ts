/**
 * @Description: Services Login
 * @Created by ZiniTeam
 * @Date create: 27/03/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  postInfoDayOff: (params: any) => {
    try {
      let newUrl = sailsApi.dayOff.postDayOff;
      let results = Api.post(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
