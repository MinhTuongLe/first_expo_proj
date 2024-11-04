/**
 * @Description: Services Notification
 * @Created by ZiniTeam
 * @Date create: 24/01/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  notRead: (params: any) => {
    try {
      let newUrl =
        sailsApi.notification.notRead +
        "/" +
        params.id +
        "?school=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  list: (params: any) => {
    try {
      let newUrl =
        sailsApi.notification.list +
        "?limit=" +
        params.limit +
        "&page=" +
        params.page +
        "&id=" +
        params.id +
        "&school=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  read: (params: any) => {
    try {
      let newUrl = sailsApi.notification.read;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
