/**
 * @Description: Services News
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import { CONFIG } from "../../config";

export default {
  getListGroup: (params: any) => {
    try {
      let tmp = "?";
      if (params.classId) tmp += "classId=" + params.classId;
      else {
        tmp += "teacherId=" + params.teacherId;
        tmp += "&parentId=" + params.parentId;
      }
      let newUrl = sailsApi.message.listGroup + tmp;
      // console.log('Url message', newUrl);
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  getSeenMessage: (params: any) => {
    try {
      let newUrl =
        sailsApi.message.getMessage +
        params.messageId +
        "/getSeenMessage" +
        "?userId=" +
        params.userId;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  getListMessages: (params: any) => {
    try {
      let newUrl =
        sailsApi.message.getMessage +
        params.messageId +
        "/getListMessages?messageId=" +
        params.messageId +
        "&page=" +
        params.page;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
  countUnreadMessage: (params: any) => {
    try {
      let newUrl =
        sailsApi.message.getMessage +
        params.messageId +
        "/getCountUnreadMessages-user/" +
        params.userId +
        "?lastSeen=" +
        params.lastSeen;
      //   console.log('URL Count Unread', newUrl);
      let results = Api.get(newUrl, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
  fileSendMessage: (params: any) => {
    try {
      let newUrl = sailsApi.message.fileSendMessage;
      let results = Api.upload(newUrl, params, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
