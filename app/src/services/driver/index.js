/* eslint-disable prettier/prettier */
/**
 * @Description: Services Driver
 * @Created by ZiniTeam
 * @Date create: 16/03/2020
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import { CONFIG } from '../../config';

export default {
  pickUp: (params) => {
    try {
      let newUrl = sailsApi.driver.pickUp + '/' + params.attendanceId;
      let results = Api.put(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },

  dropOff: (params) => {
    try {
      let newUrl = sailsApi.driver.dropOff + '/' + params.attendanceId;
      let results = Api.put(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  },
}