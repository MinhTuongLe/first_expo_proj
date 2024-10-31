/**
 * @Description: Forgot Password Screen
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from "react";
import { Linking, Keyboard } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
/** COMMON **/
import Api from "../../services/api";
import Helpers from "../../helpers";
import { LANG, CONFIG, DEVICE } from "../../config";
import * as loadingActions from "../../redux/actions/loading";
/** COMPONENTS **/
import ViewForgotPassword from "./render";
import { CommonActions } from "@react-navigation/native";

class ForgetPassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _errorText: "",
      _error: false,
    };
  }

  /* FUNCTIONS */
  _handlerSend = (email) => {
    this._sendReset(email);
  };

  _sendReset = async (email) => {
    this.setState({ _error: false, _errorText: "" });
    Keyboard.dismiss();
    if (email === "")
      return this.setState({ _error: true, _errorText: "txtEmailErrFormat" });
    if (Helpers.validateEmail(email) === false)
      return this.setState({ _error: true, _errorText: "txtEmailErrFormat" });
    this.props.loadingActions.setLoading(true);
    let res = await Api.put("/resetpassword", { emailAddress: email });
    if (res && res.message) {
      Helpers.toast(res.message);
    }
    this._handlerGoLogin();
  };

  _handlerGoLogin = () => {
    this.props.loadingActions.setLoading(false);
    this.props.navigation.goBack();
  };

  _handlerCall = () => {
    Linking.openURL("tel:" + LANG[CONFIG.lang].txtPhoneNumber).catch((error) =>
      console.log("Error call")
    );
  };

  /* RENDER */
  render() {
    let { setting } = this.props;

    return (
      <ViewForgotPassword
        handlerSend={this._handlerSend}
        handlerGoLogin={this._handlerGoLogin}
        handlerCall={this._handlerCall}
        state={this.state}
        hotline={
          (setting.config && setting.config.value.hotline) ||
          "(+84) 28 2217 8804"
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassScreen);
