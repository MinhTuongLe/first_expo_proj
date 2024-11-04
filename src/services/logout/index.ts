/**
 * @Description: Services Logout
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  fetchUserLogout: (params: any) => {
    try {
      let newUrl = sailsApi.logout.entrance;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
