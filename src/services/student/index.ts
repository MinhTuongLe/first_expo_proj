/**
 * @Description: Services Change Info
 * @Created by ZiniTeam
 * @Date create: 25/02/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  getStudent: (id: string) => {
    try {
      let newUrl = sailsApi.student.info + "?id=" + id;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  getListStudentByClassId: (classId: string) => {
    try {
      let newUrl =
        sailsApi.student.getListStudentByClassId + classId + "/student";
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  edit: (params: any) => {
    try {
      let newUrl = sailsApi.student.edit + "/" + params.id;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
