/**
 * @Description: Services News
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
/** API */
import Api from "../api";
import ApiWP from "../apiWp";
import ApiZini from "../apiZini";
import WPApi from "../../config/wp.api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  listCMS: (
    per_page = 10,
    page = 1,
    category = null,
    author = null,
    tag = null
  ) => {
    try {
      let newUrl = WPApi.news.list + "?page=" + page + "&per_page=" + per_page;
      if (category) newUrl += "&categories=" + category;
      if (author) newUrl += "&author=" + author;
      if (tag) newUrl += "&tag=" + tag;
      let results = ApiWP.get(newUrl, CONFIG.versionAPIWp);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  getCMS: (id: string) => {
    try {
      let newUrl = WPApi.news.get + id;
      let results = ApiWP.get(newUrl, CONFIG.versionAPIWp);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  listCMSRelated: (id: string) => {
    try {
      let results = ApiZini.get(WPApi.postsRelated.listPost + id);
      return results;
    } catch (error) {
      return null;
    }
  },
  list: (params: any) => {
    try {
      let newUrl =
        sailsApi.news.list +
        "?limit=" +
        params.limit +
        "&page=" +
        params.page +
        "&schoolId=" +
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
      let newUrl = sailsApi.news.get + params.id;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
