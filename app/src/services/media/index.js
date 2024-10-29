/**
 * @Description: Services Album
 * @Created by ZiniTeam
 * @Date create: 28/02/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import { CONFIG } from '../../config';

export default {
  add: (params) => {
    try {
      let newUrl = sailsApi.media.add;
      let results = Api.upload(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  }
}
