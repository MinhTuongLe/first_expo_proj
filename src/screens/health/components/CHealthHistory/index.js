/**
 * @Description: Health Screen Layout
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from "react";
import { View, Text, FlatList } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/** STYLES */
import styles from "./style";
/** COMMON */
import { DEVICE, COLOR } from "../../../../config";
import CText from "../../../../components/CText";
import Helpers from "../../../../helpers";

const INIT = {
  TXT_TITLE_HISTORY: "txtHealthHistory",
  TXT_DAY: "day",
  TXT_SYMPTOM: "symptom",
  TXT_NOTE: "notes",
};

class CHealthHistory extends React.Component {
  render() {
    let { dataStudent } = this.props;
    let healthHistory = dataStudent.healthHistory;
    return (
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: COLOR.backgroundSec,
          borderRadius: 10,
        }}
      >
        <CText
          style={styles.header_title}
          i18nKey={"txtHealthHistory"}
          upperCase
        />

        {healthHistory.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: Helpers.wS("10.66%"),
              alignItems: "center",
            }}
          >
            <CText
              style={[
                styles.txt_info_title_2,
                { width: "25%", paddingRight: 20 },
              ]}
              i18nKey={INIT.TXT_DAY}
            />
            <CText
              style={[
                styles.txt_info_title_2,
                { width: "35%", paddingRight: 20 },
              ]}
              i18nKey={INIT.TXT_SYMPTOM}
            />
            <CText
              style={[styles.txt_info_title_2, { width: "40%" }]}
              i18nKey={INIT.TXT_NOTE}
            />
          </View>
        )}

        <FlatList
          data={healthHistory}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={[
                    styles.txt_text_global,
                    { width: "25%", paddingRight: 20 },
                  ]}
                >
                  {moment(item.date, "YYYY-MM-DD").format("DD/MM")}
                </Text>
                <Text
                  style={[
                    styles.txt_text_global,
                    { width: "35%", paddingRight: 20 },
                  ]}
                >
                  {item.symptom}
                </Text>
                <Text style={[styles.txt_text_global, { width: "40%" }]}>
                  {item.note}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this._renderEmpty}
        />
      </View>
    );
  }

  /**
   * FUNCTIONS
   */
  _renderEmpty = () => {
    return (
      <View
        style={[
          DEVICE.gStyle.center,
          { height: Helpers.hS("15%"), marginBottom: 30 },
        ]}
      >
        {/* <Icon
          containerStyle={{ marginTop: 10 }}
          name={"exclamation-circle"}
          size={DEVICE.s * 50}
          color={COLOR.placeholderTextColor}
          type={"solid"}
        /> */}
        <FontAwesome5
          style={{ marginTop: 10 }}
          name={"exclamation-circle"}
          size={DEVICE.s * 50}
          color={COLOR.placeholderTextColor}
          solid
        />
        <CText
          style={{
            color: COLOR.placeholderTextColor,
            fontFamily: DEVICE.fontRegular,
            fontSize: Helpers.fS(16),
            marginTop: 20,
          }}
          i18nKey={"txtEmptyOfDay"}
        />
      </View>
    );
  };
}

export default CHealthHistory;
