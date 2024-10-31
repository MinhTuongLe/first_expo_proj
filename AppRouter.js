/**
 *
 * App router
 *
 *
 * App Name:          rn_oreo
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.1.0
 * Author:            Rnlab.io
 *
 * @since             1.0.0
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StatusBar, Modal } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import FlashMessage from "react-native-flash-message";
import { DEVICE } from "./src/config";
import CText from "./src/components/CText";
import "./config-i18n";
import Router from "./src/navigation/root-switch";
import Helpers from "./src/helpers";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isConnected: true,
    };
    const { i18n, language } = props;
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      const { isCheck } = this.state;
      const { isConnected } = state;
      this.checkInternet();
      if (!isConnected) {
        this.setState({
          isConnected: false,
        });
      }
      if (isCheck && isConnected) {
        this.setState({
          isConnected: true,
          isCheck: false,
        });
      }
    });
  }

  checkInternet = () => {
    this.setState({
      isCheck: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { i18n, language } = this.props;
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }

  render() {
    const { isConnected } = this.state;

    return (
      <>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        />
        {!isConnected ? (
          <Modal
            visible={!this.state._connected}
            animationType={"fade"}
            onRequestClose={() => {}}
            transparent={true}
          >
            <View style={styles.con_modal}>
              <CText style={styles.txt_alert_1} i18nKey={"connectionFailed"} />
            </View>
          </Modal>
        ) : (
          <Router />
        )}
        <FlashMessage position="top" />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // language: languageSelector(state)
  };
};

export default compose(withTranslation(), connect(mapStateToProps))(AppRouter);

const styles = {
  note: {
    fontSize: 20 * DEVICE.s,
    fontFamily: DEVICE.fontBold,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
  con_modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.9)",
  },
  txt_alert_1: {
    color: "red",
    fontFamily: DEVICE.fontBold,
    fontSize: Helpers.fS(12),
    paddingVertical: 10,
  },
};
