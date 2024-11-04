/**
 * @Description: Services Login
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';

export default {
  expiredToken: () => {
		try{
			// let newUrl = sailsApi.checkExpiredToken.entrance;
			let newUrl = sailsApi.verifyToken.get;
			let results = Api.get(newUrl);
			// console.log('results: ', results)
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}
}
