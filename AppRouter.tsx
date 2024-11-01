import React, { useState, useEffect } from "react";
import { View, StatusBar, Modal, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { DEVICE } from "./src/config";
import CText from "./src/components/CText";
import "./config-i18n";
import Router from "./src/navigation/root-switch";
import Helpers from "./src/helpers";

// Define the shape of your Redux state
interface RootState {
  language: string;
}

// Define mapStateToProps without using ConnectedProps
const mapStateToProps = (state: RootState) => ({
  language: state.language, // languageSelector(state) if using a selector
});

type ReduxProps = ReturnType<typeof mapStateToProps>;
type Props = WithTranslation & ReduxProps;

const AppRouter: React.FC<Props> = ({ i18n, language }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      checkInternet();
      if (!state.isConnected) {
        setIsConnected(false);
      }
      if (isCheck && state.isConnected) {
        setIsConnected(true);
        setIsCheck(false);
      }
    });
    return () => unsubscribe();
  }, [isCheck]);

  const checkInternet = () => {
    setIsCheck(true);
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle={"light-content"}
        backgroundColor="transparent"
      />
      {!isConnected ? (
        <Modal
          visible={!isConnected}
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
};

// Connect the component without using compose
export default connect(mapStateToProps)(withTranslation()(AppRouter));

const styles = StyleSheet.create({
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
});
