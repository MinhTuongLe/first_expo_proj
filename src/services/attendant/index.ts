/* eslint-disable prettier/prettier */
/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 25/03/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG, KEY } from "../../config";

export default {
  checkIn: async (params: any) => {
    try {
      let newUrl = sailsApi.attendance.checkIn + "/" + params.id;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  checkOut: async (params: any) => {
    try {
      let newUrl = sailsApi.attendance.checkOut + "/" + params.id;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  findOrCreate: async (params: any) => {
    try {
      let newUrl = sailsApi.attendance.findOrCreate;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  pushNotification: async (params: any) => {
    try {
      let newUrl = sailsApi.attendance.pushNotification;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  get: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.get + "/" + params.id + "?school=" + params.school;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      // console.log('results: ', results);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  edit: async (params: any) => {
    try {
      let newUrl = sailsApi.attendance.edit + "/" + params.id;
      let results = Api.put(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  history: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.history +
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

  classDiary: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.classDiary +
        "/" +
        params.classId +
        "/" +
        params.date +
        "?type=" +
        params.type;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  historyGet: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.historyGet +
        "?classId=" +
        params.classId +
        "&date=" +
        params.date +
        "&studentId=" +
        params.studentId;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  classDiaryGet: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.classDiaryGet +
        "/" +
        params.studentId +
        "/" +
        params.date;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  statistics: async (params: any, userType: string) => {
    try {
      let newUrl = sailsApi.attendance.statistics;
      newUrl +=
        userType === KEY.TEACHER
          ? "?classId=" + params.classId
          : "?studentId=" + params.studentId;

      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  trackingStudent: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.trackingStudent +
        "?classId=" +
        params.classId +
        "&date=" +
        params.date +
        "&studentId=" +
        params.studentId +
        "&school=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  checkExisted: async (params: any) => {
    try {
      let newUrl =
        sailsApi.attendance.checkExisted +
        "?classId=" +
        params.classId +
        "&date=" +
        params.date +
        "&school=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
