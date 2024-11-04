/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 20/03/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  getList: (params: any) => {
    try {
      //api/v1/mobile/food
      let newUrl =
        "/food?limit=" +
        params.limit +
        "&page=" +
        params.page +
        "&school=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
