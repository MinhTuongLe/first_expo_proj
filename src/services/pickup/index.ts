/**
 * @Description: Services Pickup
 * @Created by ZiniTeam
 * @Date create: 26/12/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  checkExisted: (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.checkExisted +
        "?classId=" +
        params.classId +
        "&date=" +
        params.date +
        "&school=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
  get: (params: any) => {
    try {
      let newUrl = sailsApi.attendance.get + "/" + params.id;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
  edit: (params: any) => {
    try {
      let newUrl = sailsApi.attendance.edit + "/" + params.id;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
