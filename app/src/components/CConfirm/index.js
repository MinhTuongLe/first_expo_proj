/**
 * @Description: Custom Alert
 * @Created by ZiniTeam
 * @Date create: 22/01/2019
 */
/** LIBRARY */
import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import firebase from 'react-native-firebase';
/** COMPONENT */
import CText from "../CText";
/** COMMON **/
import Helper from "../../helpers";
import { CONFIG } from "../../config";
import Services from "../../services";
import Errors from "../../config/errors";
/** STYLE **/
import styles from "./style";

/** DECLARE CLASS */
class CConfirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this._bottom = 10;
  }

  /* FUNCTIONS */
  _onPressCamera = async () => {
    let agreeP = await Helper.askPermissionsCamera();
    if (agreeP) {
      try {
        let result = await Helper.choosePhotoFromCamera();
        if (result) {
          this._uploadImage(result);
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  };

  _onPressGalary = async () => {
    let agreeP = await Helper.askPermissionsCamera();
    if (agreeP) {
      try {
        let result = await Helper.choosePhotoFromGallery();

        if (result) {
          this._uploadImage(result);
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  };

  _uploadImage = (value) => {
    if (value) {
      this.props.receive(value);
    }
  };

  _logOutHandler = async () => {
    let params = {
      id: this.props.dataUser.id,
      fcmToken: CONFIG.FCM_TOKEN,
      deviceName: CONFIG.DEVICE_NAME,
      platform: Platform.OS,
    };
    let resp = await Services.Logout.fetchUserLogout(params);
    if (resp) {
      if (resp.code === "USER_ERR_ID_REQUIRED") {
      } else if (resp.code === Errors.USER_ERR_NOT_FOUND.code) {
      } else if (resp.code == 200) {
        /* Set default */
        this.props.loginActions.logOutUser();
        this.props.notificationActions.setNotRead(0);
        //firebase.notifications().setBadge(0);

        /* Set default */
        CONFIG.USER_TYPE = "";
        CONFIG.JWT_TOKEN = "";
        CONFIG.settingLocal = null;

        /* Set default */
        await AsyncStorage.setItem("userInfo", "");
        await AsyncStorage.setItem("reLoginWith", "");
        await AsyncStorage.setItem("JWT", "");
        await Helper.setAsyStrClassChoosed("");
        await Helper.setAsyStrStudentChoosed("");
        await Helper.setAsyncStorageSettings("");

        Helper.resetNavigation(this.props.navigation, "Login", {
          type: "Logout",
        });
      }
    }
  };
  _deleteAccountHandler = async () => {
    let params = {
      id: this.props.dataUser.id,
      type: CONFIG.USER_TYPE,
    };

    let resp = await Services.DeleteAccount.deleteAccount(params);
    if (resp) {
      if (resp.code == "OK") {
        /* Set default */
        this.props.loginActions.logOutUser();
        this.props.notificationActions.setNotRead(0);
        // firebase.notifications().setBadge(0);

        /* Set default */
        CONFIG.USER_TYPE = "";
        CONFIG.JWT_TOKEN = "";
        CONFIG.settingLocal = null;

        /* Set default */
        await AsyncStorage.setItem("reLoginWith", "");
        await AsyncStorage.setItem("userInfo", "");
        await AsyncStorage.setItem("JWT", "");
        await Helper.setAsyStrClassChoosed("");
        await Helper.setAsyStrStudentChoosed("");
        await Helper.setAsyncStorageSettings("");

        Helper.resetNavigation(this.props.navigation, "Login", {
          type: "Logout",
        });
      }
    }
  };

  /** LIFE CYCLE */
  UNSAFE_componentWillMount() {
    let tmpScr = Dimensions.get("screen").height;
    let tmpWin = Dimensions.get("window").height;
    this._bottom = tmpScr - tmpWin - StatusBar.currentHeight + 50;
  }

  /** RENDER */
  render() {
    let { closeModal, type, show } = this.props;

    return (
      <Modal
        visible={show}
        animationType={"fade"}
        transparent
        onRequestClose={() => {}}
      >
        <TouchableOpacity
          style={styles.content}
          onPress={closeModal}
          activeOpacity={1}
        >
          <View
            style={{
              position: "absolute",
              bottom: this._bottom,
              width: "100%",
            }}
          >
            <View style={styles.methodGroupBtn}>
              {type == "logout" && (
                <View>
                  <View style={styles.itemBtn}>
                    <CText
                      style={styles.txtBtnTitle}
                      i18nKey={"txtConfirmLogout"}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.itemBtn, { borderBottomWidth: 0 }]}
                    onPress={this._logOutHandler}
                  >
                    <CText style={styles.txtBtnAgree} i18nKey={"txtLogout"} />
                  </TouchableOpacity>
                </View>
              )}

              {type == "deleteAccount" && (
                <View>
                  <View style={styles.text}>
                    <CText
                      a
                      numberOfLines={4}
                      style={{ ...styles.text, textAlign: "center" }}
                      i18nKey={"txtConfirmDeleteAccount"}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.itemBtn, { borderBottomWidth: 0 }]}
                    onPress={this._deleteAccountHandler}
                  >
                    <CText style={styles.txtBtnAgree} i18nKey={"txtDelete"} />
                  </TouchableOpacity>
                </View>
              )}

              {type == "upload" && (
                <View>
                  <TouchableOpacity
                    style={styles.itemBtn}
                    onPress={this._onPressCamera}
                  >
                    <CText
                      style={styles.txtBtnUpload}
                      i18nKey={"txtTakePhoto"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.itemBtn, { borderBottomWidth: 0 }]}
                    onPress={this._onPressGalary}
                  >
                    <CText
                      style={styles.txtBtnUpload}
                      i18nKey={"txtChooseFromPhoto"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.cancelBtn}>
              <TouchableOpacity
                style={[styles.itemBtn, { borderBottomWidth: 0 }]}
                onPress={closeModal}
              >
                <CText style={styles.txtBtnClose} i18nKey={"txtClose"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default CConfirm;
