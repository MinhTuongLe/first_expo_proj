/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 25/02/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  getParentsFromClass: (classId: string) => {
    try {
      let newUrl = sailsApi.parent.getParentsFromClass + classId + "/parent";
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
