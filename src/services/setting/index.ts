/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 01/07/2019
 */
/** API */
import { CONFIG } from "../../config";
import Api from "../api";
import sailsApi from "../../config/sails.api";

export default {
  get: (params: any) => {
    try {
      let newUrl =
        sailsApi.setting.get + params.key + "?school=" + params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
