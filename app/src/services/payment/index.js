/**
 * @Description: Services Payment
 * @Created by ZiniTeam
 * @Date create: 16/01/2020
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import { CONFIG } from '../../config';

export default {
  add: (params) => {
    try {
      let newUrl = sailsApi.payment.add;
      let results = Api.post(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  }
}