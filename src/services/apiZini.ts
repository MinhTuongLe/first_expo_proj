/**
 * @Description: Api
 * @Created by ZiniTeam
 * @Date create: 05/10/2020
 */
/** COMMON */
import { CONFIG } from "../config";

class Api {
  static headers() {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return headers;
  }

  static get(route: string) {
    return this.xhr(route, null, "GET");
  }

  static put(route: string, params: any) {
    return this.xhr(route, params, "PUT");
  }

  static post(route: string, params: any) {
    return this.xhr(route, params, "POST");
  }

  static delete(route: string, params: any) {
    return this.xhr(route, params, "DELETE");
  }

  static async xhr(route: string, params: any, verb: any) {
    let url = CONFIG.host + "/wp-json" + route;
    if (route.search("http") !== -1) {
      url = route;
    }
    let options = {
      method: verb,
      headers: Api.headers(),
      body: params ? JSON.stringify(params) : null,
    };
    console.log("=== Options " + route + " ===", options);

    try {
      let resp = await fetch(url, options);
      console.log("==== Resp " + route + " resp ===", resp);
      if (resp.ok) {
        let respJSON = await resp.json();
        console.log("==== RespJSON " + route + " respJSON ===", respJSON);
        return respJSON;
      } else {
        return null;
      }
    } catch (e) {
      console.log("==== Catch " + route + " ===", e);
      return null;
    }
  }
}

export default Api;
