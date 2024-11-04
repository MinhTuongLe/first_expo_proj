/* eslint-disable prettier/prettier */
/**
 * Created by dang.le from 04/09/2018
 */
/** LIBRARY */
import { filter, mergeMap } from "rxjs/operators";
import AsyncStorage from "@react-native-async-storage/async-storage";
/** COMMON */
import Services from "../../services";
import { CONFIG, KEY } from "../../config";
import Errors from "../../config/errors";
import * as actionTypes from "../actions/types";

/**
 *
 * @param {*} action$
 *
 * LOGIN REDUX
 */
export const loginEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.FETCH_USER_INFO),
    mergeMap(async (obj: any) => {
      let params = {
        username: obj.payload.emailAddress,
        password: obj.payload.password,
        type: obj.payload.type,
        fcmToken: obj.payload.fcmToken,
        deviceName: obj.payload.deviceName,
        platform: obj.payload.platform,
      };

      let resp = await Services.Login.fetchUserInfo(params);

      if (resp) {
        if (resp.code === Errors.USER_ERR_NOT_FOUND.code) {
          return loginFailed(Errors.USER_ERR_NOT_FOUND.message);
        } else if (resp.code === Errors.USER_ERR_PASSWORD_WRONG.code) {
          return loginFailed(Errors.USER_ERR_PASSWORD_WRONG.message);
        } else if (resp.code === Errors.AUTH_ERR_ACCOUNT_NOTREADY.code) {
          if (obj.payload.type === KEY.DRIVER)
            return loginFailed("authErrDriverNotReady");
          else return loginFailed(Errors.AUTH_ERR_ACCOUNT_NOTREADY.message);
        } else if (resp.code === Errors.USER_ERR_USER_INPUT_REQUIRED.code) {
          return loginFailed(Errors.AUTH_ERR_PARENT_NOTREADY.message);
        } else if (resp.code === Errors.USER_ERR_STUDENT_NOT_FOUND.code) {
          return loginFailed(Errors.USER_ERR_STUDENT_NOT_FOUND.message);
        } else {
          /* The first, setting user will get notification */
          if (resp.data.userType) {
            let find = CONFIG.userType.find((f) => f.id === resp.data.userType);
            if (find?.name !== obj.payload.type) {
              return loginFailed(Errors.USER_ERR_NOT_FOUND.message);
            }
          }
          CONFIG.USER_TYPE = obj.payload.type;
          CONFIG.JWT_TOKEN = resp.token;
          resp.data.isGetNotification = true;

          /* info re-login */
          let reLoginWith = {
            userName: resp.data.userName ?? resp.data.phone,
            type: CONFIG.USER_TYPE,
          };

          /* Save user info */
          await AsyncStorage.setItem("userInfo", JSON.stringify(resp.data));
          await AsyncStorage.setItem(
            "reLoginWith",
            JSON.stringify(reLoginWith)
          );
          await AsyncStorage.setItem("JWT", JSON.stringify(resp.token));

          /** Done prepare */
          return loginSuccess(resp.data);
        }
      } else {
        return loginFailed("serverError");
      }
    })
  );

const loginFailed = (param: any) => {
  return {
    type: actionTypes.FETCH_USER_FAILED,
    message: param,
  };
};

const loginSuccess = (param: any) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    data: param,
  };
};
/**
 *
 * @param {*} action$
 *
 * CHANGE INFO REDUX
 */
export const changeInfoEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === actionTypes.FETCH_CHANGE_INFO),
    mergeMap(async (obj: any) => {
      let params = null;
      // console.log('obj', obj);
      if (obj.payload.typeChange === "password") {
        params = {
          emailAddress: obj.payload.email,
          passwordNow: obj.payload.passwordNow,
          passwordNew: obj.payload.passwordNew,
          school: obj.payload.school,
          userName: obj.payload.username,
        };

        let resp = await Services.ChangeInfo.changePassword(params);
        if (resp) {
          if (resp.code === Errors.CHANGE_PASS_ERR_CURRENT_PASS_WRONG.code) {
            return changeFailed(
              Errors.CHANGE_PASS_ERR_CURRENT_PASS_WRONG.message
            );
          } else {
            let user = await AsyncStorage.getItem("userInfo");
            let userJSON = JSON.parse(user || "");
            return changeSuccess(userJSON);
          }
        } else {
          return changeFailed("serverError");
        }
      } else if (obj.payload.typeChange === "info") {
        let params;
        if (obj.payload.userType == KEY.PARENT) {
          params = {
            id: obj.payload.id,
            firstName: obj.payload.firstName,
            lastName: obj.payload.lastName,
            allowNotification: obj.payload.allowNotification,
            phone: obj.payload.phone,
            emailAddress: obj.payload.email,
            currentAddress: obj.payload.address,
            userName: obj.payload.username,
          };
        } else {
          params = {
            id: obj.payload.id,
            firstName: obj.payload.firstName,
            lastName: obj.payload.lastName,
            allowNotification: obj.payload.allowNotification,
            phone: obj.payload.phone,
            emailAddress: obj.payload.email,
            address: obj.payload.address,
            school: obj.payload.school,
            userName: obj.payload.username,
          };
        }

        // console.log('CHANGE INFO: ', params)
        let resp;
        if (obj.payload.userType == KEY.PARENT) {
          resp = await Services.ChangeInfo.changeInfoParent(params);
        } else {
          resp = await Services.ChangeInfo.changeInfo(params);
        }

        if (resp) {
          if (resp.code === Errors.PARENT_ERR_EMAIL_PARENT_EXISTED.code) {
            return changeFailed(Errors.PARENT_ERR_EMAIL_PARENT_EXISTED.message);
          } else if (
            resp.code === Errors.PARENT_ERR_PHONE_PARENT_EXISTED.code
          ) {
            return changeFailed(Errors.PARENT_ERR_PHONE_PARENT_EXISTED.message);
          } else {
            await AsyncStorage.setItem("userInfo", JSON.stringify(resp.data));
            return changeSuccess(resp.data);
          }
        } else {
          return changeFailed("serverError");
        }
      } else if (obj.payload.typeChange === "Avatar") {
        params = {
          typeChange: obj.payload.typeChange,
          id: obj.payload.idUser,
          uri: obj.payload.uri,
          school: obj.payload.schoolId,
        };
        let resp;
        if (obj.payload.userType == KEY.PARENT) {
          resp = await Services.ChangeInfo.changeAvatarParent(params);
        } else {
          resp = await Services.ChangeInfo.changeAvatar(params);
        }
        if (resp) {
          let data = resp.user;
          await AsyncStorage.setItem("userInfo", JSON.stringify(data));
          return changeSuccess(data);
        } else {
          return changeFailed("serverError");
        }
      } else if (obj.payload.typeChange === "infoStudent") {
        let dataLogin = obj.payload.dataLogin;
        return changeSuccess(dataLogin);
      } else if (obj.payload.typeChange === "AvatarStudent") {
        params = {
          typeChange: obj.payload.typeChange,
          id: obj.payload.idStudent,
          uri: obj.payload.uri,
          school: obj.payload.dataParent.school,
        };
        let resp = await Services.ChangeInfo.changeAvatarStudent(params);
        if (resp) {
          let data = resp.student;
          let dataParent = obj.payload.dataParent;
          let find = dataParent.students.findIndex(
            (f: any) => f.id === data.id
          );
          if (find != -1) dataParent.students[find] = data;

          await AsyncStorage.setItem("userInfo", JSON.stringify(dataParent));
          return changeSuccess(dataParent);
        } else {
          return changeFailed("serverError");
        }
      }
    })
  );

const changeFailed = (param: any) => {
  return {
    type: actionTypes.FETCH_CHANGE_FAILED,
    message: param,
  };
};

const changeSuccess = (param: any) => {
  return {
    type: actionTypes.FETCH_CHANGE_SUCCESS,
    data: param,
  };
};
