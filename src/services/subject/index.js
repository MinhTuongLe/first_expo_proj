/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 20/03/2019
 */
/** API */
import Api from '../api';
import { CONFIG } from '../../config';

export default {
  getList: (params) => {
    try {
      let newUrl = '/subject?limit=' + params.limit + '&page=' + params.page + '&school=' + params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log('ERROR ASYNC: ', error);
      return null;
    }
  }
}
