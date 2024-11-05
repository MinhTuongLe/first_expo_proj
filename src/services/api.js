/* eslint-disable prettier/prettier */
/**
 * @Description: Api
 * @Created by ZiniTeam
 * @Date create: 24/01/2019
 */
/** COMMON */
import { CONFIG } from "../config";
import Helpers from "../helpers";

class Api {
  static headers() {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return headers;
  }

  static get(route, version = "v1") {
    return this.xhr(route, null, "GET", version);
  }

  static put(route, params, version = "v1") {
    return this.xhr(route, params, "PUT", version);
  }

  static post(route, params, version = "v1") {
    return this.xhr(route, params, "POST", version);
  }

  static delete(route, params, version = "v1") {
    return this.xhr(route, params, "DELETE", version);
  }

  static async upload(route, params, version = "v1") {
    let url = CONFIG.host + "/api/" + version + "/mobile" + route;
    let _dataUpload;
    if (route.search("http") !== -1) {
      url = route;
    }
    if (params.typeChange === "Avatar") {
      let _avatarUpload = new FormData();
      _avatarUpload.append("file", {
        uri: params.uri,
        type: "image/jpeg", // or file.type
        name: params.id + params.uri.split("/").pop(),
      });
      _dataUpload = _avatarUpload;
    } else if (params.typeChange === "Media") {
      let _mediaUpload = new FormData();
      _mediaUpload.append("status", params.status);
      _mediaUpload.append("school", params.school);
      _mediaUpload.append("user", params.user);
      params.files.forEach((element, i) => {
        const newFile = {
          uri: element.node.image.uri,
          type: element.node.image.typeImage,
          name: element.node.image.fileName.toLowerCase(),
        };
        _mediaUpload.append("files[]", newFile);
      });
      _dataUpload = _mediaUpload;
    } else if (params.typeChange === "AvatarStudent") {
      let _avatarUpload = new FormData();
      _avatarUpload.append("file", {
        uri: params.uri,
        type: "image/jpeg", // or file.type
        name: params.id + params.uri.split("/").pop(),
      });
      _dataUpload = _avatarUpload;
    } else if (params.typeChange === "ImageMessage") {
      let _mediaUpload = new FormData();
      const newFile = {
        uri: params.file[0].node.image.uri,
        type: params.file[0].node.image.typeImage,
        name: params.file[0].node.image.fileName.toLowerCase(),
      };
      _mediaUpload.append("file", newFile);
      _dataUpload = _mediaUpload;
    } else {
      let _fileUpload = new FormData();
      _fileUpload.append("file", params.file);
      _dataUpload = _fileUpload;
    }

    let options = {
      method: "POST",
      // params.typeChange === 'Avatar' || params.typeChange === 'AvatarStudent'
      //   ? 'PUT'
      //   : 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: _dataUpload,
    };

    // console.log('options: ', options);

    if (CONFIG.JWT_TOKEN && CONFIG.JWT_TOKEN != "") {
      let newHeader = Object.assign(options.headers, {
        Authorization: "Bearer " + CONFIG.JWT_TOKEN,
      });

      options.headers = newHeader;
    }
    // console.log('options', options);
    try {
      let resp = await fetch(url, options);
      console.log(
        "============== Api.xhr.resp " + route + " resp =============",
        resp
      );
      let json = await resp.json();
      if (resp.ok) {
        console.log(
          "============== Api.xhr.resp " + route + " respJSON =============",
          json
        );
        return json;
      } else {
        return null;
      }
    } catch (e) {
      console.log(
        "============== Api.xhr.catch " + route + " =============",
        e
      );
      return null;
    }
  }

  static async xhr(route, params, verb, version = "v1") {
    let url = CONFIG.host + "/api/" + version + "/mobile" + route;

    if (route && route.search("http") !== -1) {
      url = route;
    }
    // console.log("============== Api.xhr.url =================", url);

    let options = {
      method: verb,
      headers: Api.headers(),
      body: params ? JSON.stringify(params) : null,
    };

    if (CONFIG.JWT_TOKEN && CONFIG.JWT_TOKEN != "") {
      let newHeader = Object.assign(options.headers, {
        Authorization: "Bearer " + CONFIG.JWT_TOKEN,
      });

      options.headers = newHeader;
    }

    try {
      let resp = await fetch(url, options);

      let respJSON = await resp.json();
      console.log("============== Api.xhr.resp =================", resp);
      if (resp.ok) {
        console.log(respJSON);
        return respJSON;
      } else {
        if (respJSON) {
          return respJSON;
        } else {
          return null;
        }
      }
    } catch (e) {
      console.log(
        "============== Api.xhr.catch " + route + " =============",
        e
      );
      return null;
    }
  }
}

export default Api;
