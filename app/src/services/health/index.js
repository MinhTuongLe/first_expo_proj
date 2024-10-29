/**
 * @Description: Services Change Info
 * @Created by ZiniTeam
 * @Date create: 25/02/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import {CONFIG} from '../../config';

export default {
  updateHeightWeightStudent: params => {
    try {
      let newUrl = sailsApi.updateStudent.heightWeight;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  updateHealthHistory: params => {
    try {
      let newUrl = sailsApi.updateStudent.healthHistory;
      let results = Api.put(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },
};
