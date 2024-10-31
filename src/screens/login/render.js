/**
 * @Description: Login Screen Layout
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
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMMON **/
import { LANG, CONFIG, ASSETS, DEVICE, privacyUrl, COLOR } from "../../config";
/** COMPONENTS **/
import CInput from "../../components/CInput/CInput";
import CButton from "../../components/CButton";
import CRadioButton from "../../components/CRadioButton";
import CText from "../../components/CText";
import Checkbox from "expo-checkbox";

/** STYLES **/
import styles from "./style";
import Helpers from "../../helpers";

class ViewLogin extends React.PureComponent {
  render() {
    let {
      arrRadioButtonItem,
      errorText,
      password,
      session,
      infoUser,
      handlerLogin,
      handlerGoForgetPass,
      handlerCall,
      handlerShowLogin,
      onPressTypeUser,
      hotline,
      loadingLogin,
      handleAcceptTerm,
      acceptTerm,
    } = this.props;
    return (
      <ImageBackground
        style={styles.con_flex}
        source={ASSETS.imgBackground}
        resizeMode={"stretch"}
        blurRadius={Platform.OS == "android" ? 5 : 15}
      >
        <KeyboardAvoidingView style={styles.con_flex} behavior={"padding"}>
          <SafeAreaView style={styles.con_flex}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.con_content}>
                {/* Top content */}
                <View style={styles.con_top_content} />

                {session ? (
                  <>
                    {/* When had log in -> Show re-login */}
                    <View
                      style={[
                        styles.txtContactGroup,
                        {
                          marginBottom: 10,
                          marginTop: 30,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <CText
                        style={[
                          styles.txtContact,
                          {
                            fontFamily: DEVICE.fontMedium,
                            fontSize: Helpers.fS(17),
                            fontWeight: 700,
                          },
                        ]}
                        i18nKey={"txtWelcomeBack"}
                      />
                      <Text
                        style={[
                          styles.txtContact,
                          {
                            fontFamily: DEVICE.fontMedium,
                            fontSize: Helpers.fS(17),
                            fontWeight: 700,
                          },
                        ]}
                      >
                        {infoUser?.userName || "-"}
                      </Text>
                    </View>

                    <View key="password-group" style={styles.input_group}>
                      <FontAwesome5
                        style={styles.input_group_icon}
                        name="lock" // hoặc "lock-alt" tùy icon có sẵn
                        size={Helpers.fS(23)}
                        color={COLOR.txtColor}
                        solid // thay cho type={'solid'}
                      />
                      <CInput
                        ref={"passContinue"}
                        style={styles.input_group_text}
                        placeholder={LANG[CONFIG.lang].txtLoginPass}
                        secureTextEntry
                        value={password}
                        autoFocus={session == true}
                        placeholderTextColor={COLOR.placeholderTextColor}
                        cursorColor={COLOR.txtColor}
                      />
                    </View>

                    {errorText !== "" && (
                      <View key="message-group" style={styles.message_group}>
                        <FontAwesome5
                          style={styles.input_group_icon}
                          name="times-circle" // hoặc "lock-alt" tùy icon có sẵn
                          size={Helpers.fS(23)}
                          color={"red"}
                        />
                        <CText
                          style={styles.message_group_label}
                          i18nKey={errorText}
                        />
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    {/* When not log in -> Show the first login */}
                    <CRadioButton
                      arrRadioButtonItem={arrRadioButtonItem}
                      onPress={onPressTypeUser}
                    />

                    <View
                      key="username-group"
                      style={[styles.input_group, { marginTop: 30 }]}
                    >
                      <FontAwesome5
                        style={styles.input_group_icon} // thay containerStyle bằng style
                        name="user-alt"
                        size={Helpers.fS(23)}
                        color={COLOR.txtColor}
                        solid // thay type={'solid'} bằng solid
                      />
                      <CInput
                        ref={"email"}
                        style={styles.input_group_text}
                        placeholder={LANG[CONFIG.lang].txtLoginUser2}
                        keyboardType={"email-address"}
                        placeholderTextColor={COLOR.placeholderTextColor}
                        returnKeyType={"next"}
                        autoFocus={session == false}
                        onSubmitEditing={(ref) => this.refs.password.focus}
                        cursorColor={COLOR.txtColor}
                      />
                    </View>

                    <View key="password-group" style={styles.input_group}>
                      <FontAwesome5
                        style={styles.input_group_icon}
                        name="lock" // hoặc "lock-alt" tùy icon có sẵn
                        size={Helpers.fS(23)}
                        color={COLOR.txtColor}
                        solid // thay cho type={'solid'}
                      />
                      <CInput
                        ref={"password"}
                        style={styles.input_group_text}
                        placeholder={LANG[CONFIG.lang].txtLoginPass}
                        secureTextEntry
                        placeholderTextColor={COLOR.placeholderTextColor}
                        returnKeyType={"done"}
                        blurOnSubmit
                        onSubmitEditing={handlerLogin}
                        cursorColor={COLOR.txtColor}
                      />
                    </View>

                    {errorText !== "" && (
                      <View key="message-group" style={styles.message_group}>
                        <FontAwesome5
                          style={styles.input_group_icon}
                          name="times-circle" // hoặc "lock-alt" tùy icon có sẵn
                          size={Helpers.fS(23)}
                          color={"red"}
                        />
                        <CText
                          style={styles.message_group_label}
                          i18nKey={errorText}
                        />
                      </View>
                    )}
                  </>
                )}

                {session ? (
                  <>
                    <View
                      key="submit-group"
                      style={[
                        styles.submit_group,
                        { marginBottom: 20, paddingHorizontal: 20 },
                      ]}
                    >
                      <CButton
                        style={styles.submit_group_submit}
                        loading={loadingLogin}
                        textStyle={styles.submit_group_submit}
                        onPress={() => handlerLogin(true)}
                      >
                        {LANG[CONFIG.lang].txtLoginButton.toUpperCase()}
                      </CButton>
                    </View>
                    <TouchableOpacity
                      key="check-forget-pass-1"
                      style={{}}
                      onPress={handlerGoForgetPass}
                    >
                      <CText
                        style={[
                          styles.forget_group_label_left,
                          {
                            textDecorationLine: "underline",
                            color: COLOR.txtColor,
                          },
                        ]}
                        i18nKey={"txtLoginForgetPass"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      key="check-forget-pass-2"
                      style={styles.forget_group}
                      onPress={handlerShowLogin}
                    >
                      <CText
                        style={[
                          styles.forget_group_label_left,
                          {
                            textDecorationLine: "underline",
                            color: COLOR.txtColor,
                          },
                        ]}
                        i18nKey={"txtLoginAnother"}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={{ paddingHorizontal: 20 }}>
                    <View
                      key="check-term-privacy"
                      style={[styles.accept_term_group, { marginTop: 10 }]}
                      onPress={() => {
                        Linking.openURL(privacyUrl);
                      }}
                    >
                      <Checkbox
                        value={acceptTerm}
                        onValueChange={handleAcceptTerm}
                        color={acceptTerm ? COLOR.primary : undefined}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(privacyUrl);
                        }}
                      >
                        <CText
                          numberOfLines={2}
                          style={[
                            styles.accept_term_label,
                            {
                              textDecorationLine: "underline",
                              color: COLOR.txtColor,
                            },
                          ]}
                          i18nKey={"txtTermAndPrivacy"}
                        ></CText>
                      </TouchableOpacity>
                    </View>

                    <CButton
                      loading={loadingLogin}
                      style={styles.submit_group_submit}
                      onPress={handlerLogin}
                    >
                      {LANG[CONFIG.lang].txtLoginButton}
                    </CButton>

                    <TouchableOpacity
                      key="check-forget-pass-3"
                      style={styles.forget_group}
                      onPress={handlerGoForgetPass}
                    >
                      <CText
                        style={[
                          styles.forget_group_label_left,
                          {
                            textDecorationLine: "underline",
                            color: COLOR.txtColor,
                          },
                        ]}
                        i18nKey={"txtLoginForgetPass"}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.con_flex} />
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>

        <View style={styles.txtContactGroup}>
          <TouchableOpacity
            style={[
              DEVICE.gStyle.row_align_center,
              DEVICE.gStyle.row_justify_center,
            ]}
            activeOpacity={0.5}
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

ViewLogin.defaultProps = {
  errorText: "",
  password: "",
  session: true,
  infoUser: null,
  showReLogin: false,
  firstLogin: true,
  handlerLogin: () => {},
  handlerGoForgetPass: () => {},
  handlerCall: () => {},
  handlerShowLogin: () => {},
};
export default ViewLogin;
