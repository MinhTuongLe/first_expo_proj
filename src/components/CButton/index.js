/**
 * @Description: Custom Button
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMMON */
import CText from "../CText";
import { DEVICE } from "../../config";
import CommonStyle from "../../helpers/common-style";
import Helpers from "../../helpers";

const styles = Object.assign({}, CommonStyle, {
  con_button: { height: Helpers.wS("12.8%"), width: "100%" },

  txt_content: {
    width: "80%",
    textAlign: "left",
  },
  txt_content_2: {
    textAlign: "center",
  },
});

const CButton = ({
  loading = false,
  hasIcon = false,
  nameIc = "",
  typeIC = "regular",
  style = {},
  children = null,
  disabled = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      {hasIcon ? (
        <View
          style={[styles.con_button, DEVICE.gStyle.row, DEVICE.gStyle.center]}
        >
          {!loading ? (
            <View>
              <View style={styles.pr_20}>
                {/* <Icon name={nameIc} size={20} color={"#ffffff"} type={typeIC} /> */}
                <FontAwesome5
                  name={nameIc}
                  size={20}
                  color={"#ffffff"}
                  // type={typeIC}
                />
              </View>
              <CText
                style={[
                  styles.txt_content,
                  {
                    color: style.color ? style.color : "#ffffff",
                    fontSize: style.fontSize ? style.fontSize : Helpers.fS(16),
                    fontFamily: style.fontFamily
                      ? style.fontFamily
                      : DEVICE.fontBold,
                  },
                ]}
              >
                {children}
              </CText>
            </View>
          ) : (
            <ActivityIndicator color={"#ffffff"} size={"small"} />
          )}
        </View>
      ) : (
        <View
          style={[styles.con_button, DEVICE.gStyle.row, DEVICE.gStyle.center]}
        >
          {!loading ? (
            <CText
              style={[
                styles.txt_content_2,
                {
                  color: style.color ? style.color : "#ffffff",
                  fontSize: style.fontSize ? style.fontSize : Helpers.fS(16),
                  fontFamily: style.fontFamily
                    ? style.fontFamily
                    : DEVICE.fontBold,
                },
              ]}
            >
              {children}
            </CText>
          ) : (
            <ActivityIndicator color={"#ffffff"} size={"small"} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CButton;
