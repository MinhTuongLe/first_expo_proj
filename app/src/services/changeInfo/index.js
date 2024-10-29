/* eslint-disable prettier/prettier */
/**
 * @Description: Services Change Info
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
/** API */
import Api from '../api';
import sailsApi from '../../config/sails.api';
import { CONFIG } from '../../config';

export default {
	changeInfo: async (params) => {
		try {
			let newUrl = sailsApi.changeInfo.info;
			let results = Api.put(newUrl, params, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	changeInfoParent: async (params) => {
		try {
			let newUrl = sailsApi.changeInfoParent.info;
			let results = Api.put(newUrl, params, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	changeAvatarParent: async (params) => {
		try {
			let newUrl = sailsApi.changeInfoParent.avatar + '?id=' + params.id  + '&school=' + params.school;;
			let results = Api.upload(newUrl, params, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	changePassword: async (params) => {
		try {
			let newUrl = sailsApi.changeInfo.password;
			let results = Api.put(newUrl, params, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	changeAvatar: async (params) => {
		try {
			let newUrl = sailsApi.changeInfo.avatar + '?id=' + params.id + '&school=' + params.school;
			let results = Api.upload(newUrl, params, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},

	changeAvatarStudent: async (params) => {
		try {
			let newUrl = sailsApi.student.avatar + '?id=' + params.id  + '&school=' + params.school;;
			let results = Api.upload(newUrl, params, CONFIG.versionAPI);
			return results;
		} catch (error) {
			console.log('ERROR ASYNC: ', error);
			return null;
		}
	},
}
