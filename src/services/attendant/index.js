/* eslint-disable prettier/prettier */
/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 25/03/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import {CONFIG, KEY} from '../../config';

export default {
  checkIn: async params => {
    try {
      let newUrl = sailsApi.attendance.checkIn + '/' + params.id;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  checkOut: async params => {
    try {
      let newUrl = sailsApi.attendance.checkOut + '/' + params.id;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  findOrCreate: async params => {
    try {
      let newUrl = sailsApi.attendance.findOrCreate;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  pushNotification: async params => {
    try {
      let newUrl = sailsApi.attendant.pushNotification;
      let results = Api.post(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  get: async params => {
    try {
      let newUrl =
        sailsApi.attendance.get + '/' + params.id + '?school=' + params.school;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      // console.log('results: ', results);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  edit: async params => {
    try {
      let newUrl = sailsApi.attendance.edit + '/' + params.id;
      let results = Api.put(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  history: async params => {
    try {
      let newUrl =
        sailsApi.attendant.history +
        '?classId=' +
        params.classId +
        '&date=' +
        params.date +
        '&school=' +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  classDiary: async params => {
    try {
      let newUrl =
        sailsApi.attendance.classDiary +
        '/' +
        params.classId +
        '/' +
        params.date +
        '?type=' +
        params.type;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  historyGet: async params => {
    try {
      let newUrl =
        sailsApi.attendant.historyGet +
        '?classId=' +
        params.classId +
        '&date=' +
        params.date +
        '&studentId=' +
        params.studentId;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  classDiaryGet: async params => {
    try {
      let newUrl =
        sailsApi.attendance.classDiaryGet +
        '/' +
        params.studentId +
        '/' +
        params.date;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  statistics: async (params, userType) => {
    try {
      let newUrl = sailsApi.attendant.statistics;
      newUrl +=
        userType === KEY.TEACHER
          ? '?classId=' + params.classId
          : '?studentId=' + params.studentId;

      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  trackingStudent: async params => {
    try {
      let newUrl =
        sailsApi.attendant.trackingStudent +
        '?classId=' +
        params.classId +
        '&date=' +
        params.date +
        '&studentId=' +
        params.studentId +
        '&school=' +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  checkExisted: async params => {
    try {
      let newUrl =
        sailsApi.attendance.checkExisted +
        '?classId=' +
        params.classId +
        '&date=' +
        params.date +
        '&school=' +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },
};
