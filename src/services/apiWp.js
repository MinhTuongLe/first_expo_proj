/**
 * @Description: Api
 * @Created by ZiniTeam
 * @Date create: 05/10/2020
 */
/** COMMON */
import {CONFIG} from '../config';

class Api {
  static headers() {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return headers;
  }

  static get(route, version = 'v2') {
    return this.xhr(route, null, 'GET', version);
  }

  static put(route, params, version = 'v2') {
    return this.xhr(route, params, 'PUT', version);
  }

  static post(route, params, version = 'v2') {
    return this.xhr(route, params, 'POST', version);
  }

  static delete(route, params, version = 'v2') {
    return this.xhr(route, params, 'DELETE', version);
  }

  static async xhr(route, params, verb, version = 'v2') {
    let url = CONFIG.hostNews + '/wp-json/wp/' + version + route;
    if (route.search('http') !== -1) {
      url = route;
    }
    let options = {
      method: verb,
      headers: Api.headers(),
      body: params ? JSON.stringify(params) : null,
    };
    // console.log('=== Options ' + route + ' ===', options);

    try {
      let resp = await fetch(url, options);
      // console.log('==== Resp ' + route + ' resp ===', resp);
      if (resp.ok) {
        let respJSON = await resp.json();
        // console.log('==== RespJSON ' + route + ' respJSON ===', respJSON);
        return respJSON;
      } else {
        return null;
      }
    } catch (e) {
      console.log('==== Catch ' + route + ' ===', e);
      return null;
    }
  }
}

export default Api;
