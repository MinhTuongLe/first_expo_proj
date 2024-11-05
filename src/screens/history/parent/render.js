/**
 * @Description: History Teacher Screen
 * @Created by ZiniTeam
 * @Date create: 14/05/2020
 */
/** LIBRARY */
import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/** COMPONENTS */
import Header_bar from "../../partials/header_bar";
/** STYLES */
import styles from "./style";
import Calendar from "../../../components/CCalendar/calendar";
import { COLOR, DEVICE } from "../../../config";
import CText from "../../../components/CText";
/** COMMON */
import Helpers from "../../../helpers";

const renderArrow = (direction) => {
  // if (direction === "left") {
  //   return <Icon name={"chevron-left"} size={Helpers.fS(25)} type={"light"} />;
  // } else {
  //   return <Icon name={"chevron-right"} size={Helpers.fS(25)} type={"light"} />;
  // }
  if (direction === "left") {
    return <FontAwesome5 name={"chevron-left"} size={Helpers.fS(25)} />;
  } else {
    return <FontAwesome5 name={"chevron-right"} size={Helpers.fS(25)} />;
  }
};

export const ViewHistoryParent = ({
  state = null,
  props = null,
  onFunction = {
    onBack: () => {},
    onPressChooseStudent: () => {},
    onDayPress: () => {},
    onPressArrow: () => {},
  },
}) => {
  return (
    <View style={styles.con}>
      <Header_bar
        title={"statistics"}
        hasBack
        onBack={onFunction.onBack}
        hasCustomHeaderRight={true}
        loadCustomHeaderRight={state._loadForList}
        dataCustomHeaderRight={state._dataStudents}
        dataChooseCustomHeaderRight={state._studentChoose}
        onCustomHeaderRight={onFunction.onPressChooseStudent}
      />
      <ScrollView style={styles.con}>
        <Calendar
          style={styles.con_calendar}
          current={state._currentDate}
          maxDate={new Date()}
          renderArrow={(direction) => renderArrow(direction)}
          // markingType={'custom'}
          markedDates={Object.assign({}, state._markedDate)}
          theme={{
            textMonthFontWeight: "bold",
            textDayFontFamily: DEVICE.fontMedium,
            textMonthFontFamily: DEVICE.fontBold,
            textDayHeaderFontFamily: DEVICE.fontBold,
          }}
          minDate={"2018-01-01"}
          monthFormat={"MMMM - yyyy"}
          onDayPress={(day) => onFunction.onDayPress(day)}
          onMonthChange={(month) => onFunction.onPressArrow(month)}
          displayLoadingIndicator={state._loading}
        />

        <View style={styles.con_detail}>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <CText style={styles.txt_row_detail} i18nKey={"day"} />
            <CText style={styles.txt_row_detail}>
              {" " + moment(state._currentDate).format("DD/MM/YYYY") + ":"}
            </CText>
          </View>
          <View style={styles.con_row_detail}>
            <View
              style={[
                styles.con_row_icon,
                { backgroundColor: COLOR.primaryApp },
              ]}
            />
            <CText style={styles.txt_row_detail} i18nKey={"present"} />
            <CText style={styles.txt_row_detail}>{`: ${
              state._data ? state._data.countPresent : 0
            } `}</CText>
            <CText style={styles.txt_row_detail} i18nKey={"totalStudent"} />
          </View>
          <View style={styles.con_row_detail}>
            <View
              style={[
                styles.con_row_icon,
                { backgroundColor: COLOR.primaryTextNote },
              ]}
            />
            <CText style={styles.txt_row_detail} i18nKey={"absent"} />
            <CText style={styles.txt_row_detail}>{`: ${
              state._data ? state._data.countAbsent : 0
            } `}</CText>
            <CText style={styles.txt_row_detail} i18nKey={"totalStudent"} />
          </View>
        </View>
        <View style={styles.con_detail}>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <CText style={styles.txt_row_detail} i18nKey={"month"} />
            <CText style={styles.txt_row_detail}>
              {" " + moment(state._currentDate).format("MM - yyyy") + ":"}
            </CText>
          </View>
          <View style={styles.con_row_detail}>
            <View
              style={[
                styles.con_row_icon,
                { backgroundColor: COLOR.primaryApp },
              ]}
            />
            <CText style={styles.txt_row_detail} i18nKey={"present"} />
            <CText style={styles.txt_row_detail}>{`: ${
              state._dataMonth ? state._dataMonth.countPresent : 0
            } `}</CText>
            <CText style={styles.txt_row_detail} i18nKey={"totalStudent"} />
          </View>
          <View style={styles.con_row_detail}>
            <View
              style={[
                styles.con_row_icon,
                { backgroundColor: COLOR.primaryTextNote },
              ]}
            />
            <CText style={styles.txt_row_detail} i18nKey={"absent"} />
            <CText style={styles.txt_row_detail}>{`: ${
              state._dataMonth ? state._dataMonth.countAbsent : 0
            } `}</CText>
            <CText style={styles.txt_row_detail} i18nKey={"totalStudent"} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
