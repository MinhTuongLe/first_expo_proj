/**
 * @Description: Forgot Password Screen
 * @Created by ZiniTeam
 * @Date create: 18/01/2019
 */
/** LIBRARY */
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMMON **/
import { LANG, CONFIG, ASSETS, COLOR } from "../../config";
/** COMPONENTS **/
import CInput from "../../components/CInput/CInput";
import CButton from "../../components/CButton";
import CText from "../../components/CText";
/** STYLES **/
import styles from "./style";

class ViewForgotPassword extends React.Component {
  render() {
    let { handlerSend, handlerGoLogin, handlerCall, state, hotline } =
      this.props;

    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={ASSETS.imgBackground}
        resizeMode={"stretch"}
        blurRadius={Platform.OS == "android" ? 5 : 15}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                {/* HEADER LOGIN */}
                <View style={styles.con}>
                  <TouchableOpacity
                    style={styles.con_header_left}
                    onPress={handlerGoLogin}
                  >
                    {/* <Icon
                      name={"chevron-left"}
                      size={20}
                      color={COLOR.txtColor}
                      type="light"
                    /> */}
                    <FontAwesome5
                      name={"chevron-left"}
                      size={20}
                      color={COLOR.txtColor}
                    />
                  </TouchableOpacity>
                </View>

                {/* CONTENT */}
                <View style={styles.container}>
                  <View
                    key="motto-group"
                    style={[styles.motto_group, { paddingHorizontal: 10 }]}
                  >
                    <CText
                      style={styles.motto_group_text}
                      i18nKey={"txtMottoForget"}
                      numberOfLines={2}
                    />
                  </View>
                  <View key="username-group" style={styles.input_group}>
                    {/* <Icon
                      containerStyle={styles.input_group_icon}
                      name="user"
                      size={25}
                      color={COLOR.txtColor}
                      type="light"
                    /> */}
                    <FontAwesome5
                      style={styles.input_group_icon}
                      name="user"
                      size={25}
                      color={COLOR.txtColor}
                    />
                    <CInput
                      style={styles.input_group_text}
                      ref={(ref) => (this._emailRef = ref)}
                      placeholder="E-mail"
                      keyboardType={"email-address"}
                      placeholderTextColor={COLOR.placeholderTextColor}
                      autoFocus={true}
                      returnKeyType={"done"}
                      cursorColor={COLOR.txtColor}
                    />
                  </View>

                  {state?._errorText && (
                    <View key="message-group" style={styles.message_group}>
                      <CText
                        style={styles.message_group_label}
                        i18nKey={state._errorText}
                      />
                    </View>
                  )}

                  <View
                    key="submit-group"
                    style={[styles.submit_group, { paddingHorizontal: 20 }]}
                  >
                    <CButton
                      style={styles.submit_group_submit}
                      onPress={() => handlerSend(this._emailRef.state.text)}
                    >
                      {LANG[CONFIG.lang].txtSend}
                    </CButton>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      key="check-forget-pass"
                      style={{}}
                      onPress={handlerGoLogin}
                    >
                      <CText
                        style={[
                          styles.forget_group_label_left,
                          {
                            textDecorationLine: "underline",
                            color: COLOR.txtColor,
                          },
                        ]}
                        i18nKey={"txtGoBackForget"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>

        <View style={styles.txtContactGroup}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handlerCall}
          >
            <CText style={styles.txtContact} i18nKey={"txtContact"} />
            <Text style={styles.txtContact}> {hotline}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

ViewForgotPassword.defaultProps = {
  handlerSend: () => {},
  handlerGoLogin: () => {},
  handlerCall: () => {},
};

export default ViewForgotPassword;
