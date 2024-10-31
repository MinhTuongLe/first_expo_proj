/**
 * @Description: Intro screen
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
import {
  Image,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";
/** COMMON */
import Services from "../../services";
import { ASSETS, CONFIG, LANG, KEY, COLOR } from "../../config";
import Helpers from "../../helpers";
import Modules from "../../config/modules";
/** STYLE */
import styles from "./style";
import Errors from "../../config/errors";
/** REDUX */
import * as loginActions from "../../redux/actions/login";
import * as socketActions from "../../redux/actions/socket";
import * as settingActions from "../../redux/actions/setting";
import * as notificationActions from "../../redux/actions/notification";
import * as languageActions from "../../redux/actions/language";
import * as loadingActions from "../../redux/actions/loading";
import * as schoolActions from "../../redux/actions/school";
import * as DeviceInfo from "expo-device";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
    };
  }

  /** FUNCTIONS */

  _initSocket = () => {
    console.log("INIT_SOCKET_IO");
    if (!this.props.io) {
      let io;
      if (socketIOClient.sails) {
        io = socketIOClient;
      } else {
        io = sailsIOClient(socketIOClient, { pingTimeout: 30000 });
      }
      io.sails.url = CONFIG.hostSocket;
      io.sails.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      io.sails.environment = "production";
      io.sails.transports = ["websocket"];
      io.sails.autoConnect = true;
      io.sails.useCORSRouteToGetCookie = false;
      io.sails.query = "nosession=true";
      io.sails.rejectUnauthorized = "-";
      io.sails.perMessageDeflate = "-";
      io.sails.agent = "-";
      io.sails.pfx = "-";
      io.sails.cert = "-";
      io.sails.ca = "-";
      io.sails.ciphers = "-";
      io.sails.reconnection = true;

      this.props.socketActions.initSocket({ io });
    }
  };

  _prepareData = async () => {
    await Helpers.setAsyncStorageSettings("");
    /** CHECK EX TOKEN */
    let oldJwt = await AsyncStorage.getItem("JWT");
    CONFIG.JWT_TOKEN = JSON.parse(oldJwt);
    let res = null;
    if (CONFIG.JWT_TOKEN) {
      res = await Services.JWT.expiredToken();
    }

    if (!res) {
      // console.log("INVALID TOKEN")
      let dataLogin = await AsyncStorage.getItem("userInfo");
      const deviceName = DeviceInfo.modelName;

      if (dataLogin) {
        // console.log("HAS DATA LOGIN")
        let params = {
          id: dataLogin.id,
          fcmToken: JSON.parse(oldJwt),
          device: deviceName || Platform.OS,
          platform: Platform.OS,
        };
        let resp = await Services.Logout.fetchUserLogout(params);
        if (resp) {
          if (resp.code === "USER_ERR_ID_REQUIRED") {
          } else if (resp.code === Errors.USER_ERR_NOT_FOUND.code) {
          } else if (resp.code == 200) {
            /* --- */
            CONFIG.USER_TYPE = "";
            CONFIG.JWT_TOKEN = "";
            CONFIG.settingLocal = null;

            /* Save user info */
            await AsyncStorage.setItem("userInfo", "");
            await AsyncStorage.setItem("JWT", "");
            await Helpers.setAsyStrClassChoosed("");
            await Helpers.setAsyStrStudentChoosed("");
          }
        }
        this._nextToScreen("Login", { type: "InvalidToken" });
      } else {
        // console.log("NO DATA LOGIN")
        this._nextToScreen("Login", null);
      }
    } else {
      /** GET DATA LOGIN */
      // console.log("VALID TOKEN")
      let userInfo = await AsyncStorage.getItem("userInfo");
      let reLoginWith = await AsyncStorage.getItem("reLoginWith");
      let jwt = await AsyncStorage.getItem("JWT");

      if (reLoginWith) {
        let dataReLogin = JSON.parse(reLoginWith);
        CONFIG.USER_TYPE = dataReLogin.type;
      }

      if (userInfo) {
        CONFIG.JWT_TOKEN = JSON.parse(jwt);
        let data = JSON.parse(userInfo);
        await this._getSettings(data.school);
        /** navigate to root */
        this._getInfoNotification(data);
      } else {
        this._nextToScreen("Login", null);
      }
    }
  };

  _getSettings = async (school) => {
    let params = {
      key: "app",
      school,
    };
    let setting = await Services.Setting.get(params);

    let tmpSettings = await Helpers.getAsyncStorageSettings();
    // console.log('LOCALSETTINGS', tmpSettings);
    let newSetting = null;

    if (tmpSettings && tmpSettings.value.buildNumber) {
      let buildNumberLive = setting.value.buildNumber;
      let buildNumberLocal = tmpSettings.value.buildNumber;
      // check version api & version async storage
      if (buildNumberLive > buildNumberLocal) newSetting = setting;
      else newSetting = tmpSettings;
    } else if (setting) newSetting = setting;
    else {
      this._nextToScreen("Login");
    }

    if (newSetting.value.hasOwnProperty("APIServer"))
      CONFIG.host = newSetting.value.APIServer;
    if (newSetting.value.hasOwnProperty("socketServer"))
      CONFIG.hostSocket = newSetting.value.socketServer;
    if (newSetting.value.hasOwnProperty("versionAPI"))
      CONFIG.versionAPI = newSetting.value.versionAPI;
    if (newSetting.value.hasOwnProperty("dateFormat"))
      CONFIG.formatDateSetting = newSetting.value.dateFormat;
    if (newSetting.value.hasOwnProperty("language")) {
      if (CONFIG.lang !== newSetting.value.language) {
        if (LANG.hasOwnProperty(newSetting.value.language)) {
          CONFIG.lang = newSetting.value.language;
          this.props.languageActions.changeLanguage(newSetting.value.language);
        } else {
          CONFIG.lang = "en";
          this.props.languageActions.changeLanguage("en");
        }
      } else {
        CONFIG.lang = "en";
        this.props.languageActions.changeLanguage("en");
      }
    } else {
      CONFIG.lang = "en";
      this.props.languageActions.changeLanguage("en");
    }
    if (newSetting.value.hasOwnProperty("paymentMethods")) {
      CONFIG.PAYMENT_METHODS = newSetting.value.paymentMethods;
    }
    if (newSetting.value.hasOwnProperty("cashMessage")) {
      CONFIG.CASH_MESSAGE = newSetting.value.cashMessage;
    }

    await Helpers.setAsyncStorageSettings(JSON.stringify(newSetting));
    this.props.settingActions.fetchSettingsSuccess(newSetting);

    /** Set data school to redux */
    if (setting && setting.school) {
      this.props.schoolActions.getSchoolSuccess(setting.school);
      if (typeof setting.school === "object" && setting.school.activeModules) {
        let modulesSchool = setting.school.activeModules;
        Modules.feeInvoice = modulesSchool.feeInvoice;
        Modules.attendance = modulesSchool.attendance;
        Modules.statistics = modulesSchool.statistics;
        Modules.messages = modulesSchool.messages;
        Modules.health = modulesSchool.health;
      }
    }
  };

  _getInfoNotification = async (dataLogin) => {
    let params = { id: dataLogin.id, school: dataLogin.school };
    let result = await Services.Notification.notRead(params);
    // console.log('result', result);
    if (result) this.props.notificationActions.setNotRead(result);
    /** Check settings local */
    let arrUserSetting = await Helpers.getAsyStrSettingsLocal();
    let dataUserSetting = {
      idUser: dataLogin.id,
      settings: { softName: "softname_first_last" },
    };

    if (arrUserSetting) {
      arrUserSetting = JSON.parse(arrUserSetting);
      let find = arrUserSetting.find((f) => f.idUser === dataLogin.id);
      if (find) CONFIG.settingLocal = find.settings;
      else arrUserSetting.push(dataUserSetting);
    } else arrUserSetting = [dataUserSetting];
    await Helpers.setAsyStrSettingsLocal(JSON.stringify(arrUserSetting));
    CONFIG.settingLocal = { softName: "softname_first_last" };
    this.props.loginActions.fetchUserSuccess(dataLogin);
    this.props.loadingActions.setLoading(true);
    if (CONFIG.USER_TYPE === KEY.DRIVER) {
      this._nextToScreen("RootDriver", null);
    } else {
      this._nextToScreen("RootDrawer", null);
    }
  };

  _nextToScreen = (screen, param) => {
    Helpers.resetNavigation(this.props.navigation, screen, param);
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._initSocket();
    this._prepareData();
  }

  /** RENDER */
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={ASSETS.imgBackground}
        blurRadius={Platform.OS === "android" ? 5 : 10}
      >
        <Image
          style={styles.img_logo}
          source={ASSETS.imgLogo}
          resizeMode={"contain"}
        />
        <ActivityIndicator
          style={styles.con_indicator}
          color={COLOR.placeholderTextColor}
          size={"small"}
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    io: state.io.io,
    setting: state.setting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    socketActions: bindActionCreators(socketActions, dispatch),
    settingActions: bindActionCreators(settingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
    languageActions: bindActionCreators(languageActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    schoolActions: bindActionCreators(schoolActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
