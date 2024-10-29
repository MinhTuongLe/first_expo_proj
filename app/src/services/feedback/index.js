/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 21/03/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import { CONFIG } from '../../config';

export default {
  getListFeedback: (params) => {
    try {
      let newUrl = sailsApi.feedback.list + `?page=${params.page}&limit=${params.per_page}&user=${params.user}&type=${params.type}`;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  getFeedback: (params) => {
    try {
      let newUrl = sailsApi.feedback.detail + `/${params.id}`;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  addFeedback: (params) => {
    try {
      let newUrl = sailsApi.feedback.add;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  editFeedback: (params) => {
    try {
      let newUrl = sailsApi.feedback.edit + `/${params.id}`;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },
}