/**
 * @Description: Services Menu
 * @Created by ZiniTeam
 * @Date create: 30/01/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import { CONFIG } from '../../config';

export default {
	get: (params) => {
		try {
			let newUrl = sailsApi.menu.get + '?dateUse=' + params.dateUse + '&classId=' + params.classId;
			let results = Api.get(newUrl, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	}
}
