/* eslint-disable prettier/prettier */
/**
 * @Description: Login Screen Logic
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Linking, Keyboard, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
// import firebase from 'react-native-firebase'
/** COMMON **/
import Helpers from "../../helpers";
import { LANG, CONFIG, KEY, ASSETS, COLOR } from "../../config";
import Services from "../../services";
import Modules from "../../config/modules";
/** COMPONENTS **/
import ViewLogin from "./render";
/** STYLES **/
import styles from "./style";
/** REDUX */
import * as loginActions from "../../redux/actions/login";
import * as loadingActions from "../../redux/actions/loading";
import * as notificationActions from "../../redux/actions/notification";
import * as languageActions from "../../redux/actions/language";
import * as settingActions from "../../redux/actions/setting";
import * as schoolActions from "../../redux/actions/school";
// import messaging from '@react-native-firebase/messaging';

// const Analytics = firebase.analytics();

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    // Analytics.setCurrentScreen('LOGIN_SCREEN');
    this.state = {
      _loadingLogin: false,
      _session: false,
      _showReLogin: false,
      _getSetting: true,
      _errorText: "",
      _typeUser: KEY.PARENT,
      _typeNav: props.route.params?.type ?? "",
      _acceptTerm: true,
    };
    this._arrRadioButtonItem = [
      {
        id: 1,
        name: LANG[CONFIG.lang].txtParent,
        value: KEY.PARENT,
        image: ASSETS.imgParent,
        bgColor: COLOR.primaryApp,
      },
      {
        id: 2,
        name: LANG[CONFIG.lang].txtTeacher,
        value: KEY.TEACHER,
        image: ASSETS.imgTeacher,
        bgColor: COLOR.primaryApp,
      },
      {
        id: 3,
        name: LANG[CONFIG.lang].driver,
        value: KEY.DRIVER,
        image: ASSETS.imgDriver,
        bgColor: COLOR.primaryApp,
      },
    ];
    this._emailRef = null;
    this._passRef = null;
    this._infoUser = null;
    this._fcmToken = "";
    this._platform = "";
    this._deviceName = "";
  }

  /** FUNCTIONS */
  _handlerSavePassword = () =>
    this.setState({ _isSavePassword: !this.state._isSavePassword });

  _handlerGoForgetPass = () => this.props.navigation.navigate("ForgetPass");

  _handlerCall = () =>
    Linking.openURL("tel:" + LANG[CONFIG.lang].txtPhoneNumber).catch((error) =>
      console.log("Error call", error)
    );

  _onPressTypeUser = (value) => this.setState({ _typeUser: value });

  _handlerLogin = (isContinue) => {
    this.setState({ _errorText: "" });
    Keyboard.dismiss();
    let emailRef =
      typeof isContinue == "boolean" && isContinue && this._infoUser
        ? this._infoUser.userName
        : this.refs.viewLogin.refs.email;

    let passRef =
      typeof isContinue == "boolean" && isContinue && this._infoUser
        ? this.refs.viewLogin.refs.passContinue
        : this.refs.viewLogin.refs.password;

    let tmp = typeof emailRef == "object";

    if (
      tmp
        ? emailRef.value == "" || passRef.value == ""
        : emailRef == "" || passRef.value == ""
    ) {
      this.setState({ _errorText: "errUserInputRequired" });
    } else if (!this.state._acceptTerm) {
      this.setState({ _errorText: "errNotAcceptTerm" });
    } else {
      this.setState({ _loadingLogin: true });
      this.props.loadingActions.setLoading(true);
      this._emailRef = tmp ? emailRef.value : emailRef;
      this._passRef = passRef.value;

      // console.log('CURRENT FCMTOKEN: ', CONFIG.FCM_TOKEN);
      /** If validation ok -> Go to fetch info user */
      let params = {
        emailAddress: tmp
          ? emailRef.value.toLowerCase()
          : emailRef.toLowerCase(),
        password: passRef.value,
        type: this.state._typeUser,
        fcmToken: CONFIG.FCM_TOKEN,
        deviceName: CONFIG.DEVICE_NAME,
        platform: Platform.OS,
      };
      this.props.loginActions.fetchUserInfo(params);
    }
  };

  _getLocalData = async () => {
    let reLoginWith = await AsyncStorage.getItem("reLoginWith");
    // console.log(reLoginWith);
    if (reLoginWith) {
      reLoginWith = JSON.parse(reLoginWith);
      this._infoUser = {
        userName: reLoginWith.userName,
        userNameHide: "",
      };
      this._handlerContinue(reLoginWith);
    } else this.setState({ _session: false });
  };

  _handlerContinue = (dataLogin) => {
    /** Convert string username */
    let pos = dataLogin.userName.length;
    let str1 = dataLogin.userName.slice(0, 4);
    let str2 = dataLogin.userName.slice(-4, pos);
    this._infoUser.userNameHide = str1 + "******" + str2;

    this.setState({
      _session: true,
      _typeUser: dataLogin.type,
      _showReLogin: !this.state._showReLogin,
    });

    this.props.loadingActions.setLoading(false);
  };

  _handlerShowLogin = () => {
    this.setState({
      _showReLogin: false,
      _session: false,
      _errorText: "",
      _typeUser: KEY.PARENT,
    });
  };

  _handleAcceptTerm = (checked) => {
    // console.log(checked);
    this.setState({
      _acceptTerm: checked,
    });
  };

  _getInfoNotification = async (dataLogin) => {
    /** Check notification not read */
    let params = {
      id: dataLogin.id,
      school: dataLogin.school,
    };
    let result = await Services.Notification.notRead(params);
    if (result) this.props.notificationActions.setNotRead(result);

    /** Check notification not read */
    if (CONFIG.USER_TYPE === KEY.DRIVER) {
      Helpers.resetNavigation(this.props.navigation, "RootDriver");
    } else {
      Helpers.resetNavigation(this.props.navigation, "RootDrawer");
    }
  };

  _checkPermission = async () => {
    // console.log('CHECK_PERMISSION');
    let enabled = await messaging().hasPermission();
    if (enabled !== -1) this._getToken();
    else this._requestPermission();
  };

  _getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    const deviceName = DeviceInfo.getModel() || Platform.OS;

    if (fcmToken) {
      this._fcmToken = fcmToken;
      this._deviceName = deviceName;
      CONFIG.FCM_TOKEN = fcmToken;
      CONFIG.DEVICE_NAME = deviceName;
    } else this._requestPermission();
  };

  _requestPermission = async () => {
    try {
      await messaging().requestPermission();
      this._getToken();
    } catch (error) {
      console.log("Permission rejected");
    }
  };

  _getSettings = async (resp) => {
    /** Check settings server */
    let params = {
      key: "app",
      school: resp.school,
    };
    let setting = await Services.Setting.get(params);
    let tmpSettings = await Helpers.getAsyncStorageSettings();
    let newSetting = null;

    if (tmpSettings && tmpSettings.value.buildNumber) {
      let buildNumberLive = setting.value.buildNumber;
      let buildNumberLocal = tmpSettings.value.buildNumber;
      // check version api & version async storage
      if (buildNumberLive > buildNumberLocal) newSetting = setting;
      else newSetting = tmpSettings;
    } else newSetting = setting;

    if (newSetting.value.hasOwnProperty("APIServer"))
      CONFIG.host = newSetting.value.APIServer;
    if (newSetting.value.hasOwnProperty("socketServer"))
      CONFIG.hostSocket = newSetting.value.socketServer;
    if (newSetting.value.hasOwnProperty("versionAPI"))
      CONFIG.versionAPI = newSetting.value.versionAPI;
    if (newSetting.value.hasOwnProperty("dateFormat"))
      CONFIG.formatDateSetting = newSetting.value.dateFormat;
    if (newSetting.value.hasOwnProperty("shortDateFormat"))
      CONFIG.shortFormatDateSetting = newSetting.value.shortDateFormat;
    // console.log('NEWLANG', newSetting);
    if (newSetting.value.hasOwnProperty("language")) {
      if (CONFIG.lang !== newSetting.value.language) {
        if (LANG.hasOwnProperty(newSetting.value.language)) {
          CONFIG.lang = newSetting.value.language;
          this.props.languageActions.changeLanguage(newSetting.value.language);
        } else {
          CONFIG.lang = "en";
          this.props.languageActions.changeLanguage("en");
        }
      }
    }
    if (newSetting.value.hasOwnProperty("paymentMethods")) {
      CONFIG.PAYMENT_METHODS = newSetting.value.paymentMethods;
    }
    if (newSetting.value.hasOwnProperty("cashMessage")) {
      CONFIG.CASH_MESSAGE = newSetting.value.cashMessage;
    }

    await Helpers.setAsyncStorageSettings(JSON.stringify(newSetting));
    this.props.settingActions.fetchSettingsSuccess(newSetting);

    /** Check settings local */
    let arrUserSetting = await Helpers.getAsyStrSettingsLocal();
    let dataUserSetting = {
      idUser: resp.id,
      settings: { softName: "softname_first_last" },
    };

    if (arrUserSetting) {
      arrUserSetting = JSON.parse(arrUserSetting);
      let find = arrUserSetting.find((f) => f.idUser === resp.id);
      if (find) CONFIG.settingLocal = find.settings;
      else arrUserSetting.push(dataUserSetting);
    } else arrUserSetting = [dataUserSetting];
    await Helpers.setAsyStrSettingsLocal(JSON.stringify(arrUserSetting));
    CONFIG.settingLocal = { softName: "softname_first_last" };

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
    /** Check notifications */
    this._getInfoNotification(resp);
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkPermission();
    if (
      this.state._typeNav == "InvalidToken" ||
      this.state._typeNav == "Logout"
    ) {
      this._getLocalData();
    } else {
      this.setState({ _session: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoading) {
      if (!this.props.login.isFetch) {
        if (this.props.login.message === "success") {
          let tmpSettings = await Helpers.getAsyncStorageSettings();
          if (tmpSettings === null) {
            this._getSettings(this.props.login.data);
          }
        } else {
          this.setState({
            _errorText: this.props.login.message,
            _loadingLogin: false,
          });
          this.props.loadingActions.setLoading(false);
        }
      }
    }
  }
  /** RENDER */
  render() {
    let { _loadingLogin, _errorText, _session, _showReLogin, _acceptTerm } =
      this.state;
    let { setting } = this.props;

    return (
      <ViewLogin
        ref={"viewLogin"}
        acceptTerm={_acceptTerm}
        loadingLogin={_loadingLogin}
        hotline={
          (setting.config && setting.config.value.hotline) ||
          "(+84) 28 2217 8804"
        }
        arrRadioButtonItem={this._arrRadioButtonItem}
        errorText={_errorText}
        session={_session}
        showReLogin={_showReLogin}
        infoUser={this._infoUser}
        handlerLogin={this._handlerLogin}
        handlerGoForgetPass={this._handlerGoForgetPass}
        handlerShowLogin={this._handlerShowLogin}
        handlerContinue={this._handlerContinue}
        handlerCall={this._handlerCall}
        handleAcceptTerm={this._handleAcceptTerm}
        onPressTypeUser={this._onPressTypeUser}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    isLoading: state.loading.isLoading,
    setting: state.setting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    languageActions: bindActionCreators(languageActions, dispatch),
    settingActions: bindActionCreators(settingActions, dispatch),
    schoolActions: bindActionCreators(schoolActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
