/**
 * @Description: Services Login
 * @Created by ZiniTeam
 * @Date create: 29/01/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";

export default {
  fetchUserInfo: (params) => {
    try {
      let newUrl = sailsApi.login.entrance;
      let results = Api.put(newUrl, params);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
