/**
 * @Description: Services Album
 * @Created by ZiniTeam
 * @Date create: 24/01/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  list: (params: any) => {
    try {
      let newUrl =
        sailsApi.album.list +
        params.classId +
        "/album?limit=" +
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

  create: (params: any) => {
    try {
      let newUrl = sailsApi.album.detail;
      let results = Api.post(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  get: (id: string) => {
    try {
      let newUrl = sailsApi.album.detail + "/" + id;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  comment: (params: any) => {
    try {
      let newUrl = sailsApi.album.detail + "/" + params.idAlbum;
      let newParams = {
        title: params.title,
        comments: params.comments,
      };
      let results = Api.put(newUrl, newParams, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  like: (params: any) => {
    try {
      let newUrl = sailsApi.album.detail + "/" + params.idAlbum;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
