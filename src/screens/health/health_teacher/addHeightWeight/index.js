/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import moment from "moment";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
/** COMPONENT */
import HeaderBar from "../../../partials/header_bar";
import HeaderInfoChildren from "../../../partials/header_info_children";
import CCalendar from "../../../../components/CCalendar/calendar";
import CButton from "../../../../components/CButton";
import CText from "../../../../components/CText";
/** COMMON */
import Services from "../../../../services";
import { LANG, CONFIG, DEVICE, COLOR } from "../../../../config";
import Helpers from "../../../../helpers";
import * as loadingActions from "../../../../redux/actions/loading";
/** STYLES */
import styles from "../style";

class AddHeightWeightScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isShowFCalendar: false,
      _dataDay: moment().format("YYYY-MM-DD"),
      _dataStudent: props.route.params.dataStudent ?? null,
      _dataClass: props.route.params.dataClass ?? null,
      _height: "",
      _weight: "",
    };
  }

  render() {
    let { _isShowFCalendar, _dataDay, _dataStudent, _dataClass } = this.state;
    let dataDayFormat = moment(_dataDay, "YYYY-MM-DD").format("DD/MM/YYYY");
    let gender = CONFIG.students.find((f) => f.id === _dataStudent.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar title={"addInfo"} hasBack />

        <KeyboardAvoidingView
          style={DEVICE.gStyle.container}
          behavior={"padding"}
          enabled
          keyboardVerticalOffset={Platform.select({
            ios: Helpers.isIphoneX() ? 15 : 0,
            android: -500,
          })}
        >
          <View style={DEVICE.gStyle.container}>
            {/* CONTENT */}
            <ScrollView keyboardShouldPersistTaps={"handled"}>
              <HeaderInfoChildren
                selectedStudent={_dataStudent}
                dataClass={_dataClass}
              />

              <View style={styles.listStudentContent}>
                <TouchableOpacity
                  style={styles.dayChoose}
                  onPress={this._onPressDayChoose}
                >
                  <View style={styles.dayChooseLeft}>
                    {/* <Icon
                      containerStyle={{ marginRight: 10 }}
                      name={"calendar-alt"}
                      size={Helpers.fS(20)}
                      color={"black"}
                      type={"light"}
                    /> */}
                    <FontAwesome5
                      style={{ marginRight: 10 }}
                      name={"calendar-alt"}
                      size={Helpers.fS(20)}
                      color={"black"}
                    />
                    <CText style={styles.txtNameStudent} i18nKey={"date"} />
                  </View>
                  <Text style={styles.txtNameStudent}>{dataDayFormat}</Text>
                </TouchableOpacity>

                {_isShowFCalendar && (
                  <CCalendar
                    theme={{
                      textDayFontFamily: DEVICE.fontRegular,
                      textMonthFontFamily: DEVICE.fontBold,
                      textDayHeaderFontFamily: DEVICE.fontMedium,
                    }}
                    minDate={"2010-01-01"}
                    maxDate={"2030-01-01"}
                    monthFormat={"MMMM - yyyy"}
                    onPressArrowLeft={(substractMonth) => substractMonth()}
                    onPressArrowRight={(addMonth) => addMonth()}
                    onDayPress={(day) => this._onPressDay(day)}
                  />
                )}
                <View style={styles.dayChoose}>
                  <View style={styles.dayChooseLeft}>
                    <CText
                      style={styles.txtNameStudent}
                      i18nKey={"txtHeight"}
                    />
                  </View>
                  <View style={styles.dayChooseLeft}>
                    <TextInput
                      style={[
                        styles.txtNameStudent,
                        {
                          width: Helpers.wS("32%"),
                          height: Helpers.wS("9.6%"),
                          paddingHorizontal: 10,
                          borderColor: COLOR.borderColor,
                          borderWidth: 1,
                          borderRadius: Helpers.bR(10),
                          fontSize: Helpers.fS(14),
                        },
                      ]}
                      placeholder={LANG[CONFIG.lang].txtHeight}
                      keyboardType={"numeric"}
                      onChangeText={(text) => this.setState({ _height: text })}
                      value={this.state._height}
                      autoFocus={true}
                    />
                    <View
                      style={{
                        width: Helpers.wS("8.53%"),
                        alignItems: "flex-end",
                      }}
                    >
                      <Text style={styles.txtNameStudent}>{"cm"}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.dayChoose}>
                  <View style={styles.dayChooseLeft}>
                    <CText
                      style={styles.txtNameStudent}
                      i18nKey={"txtWeight"}
                    />
                  </View>
                  <View style={styles.dayChooseLeft}>
                    <TextInput
                      style={[
                        styles.txtNameStudent,
                        {
                          width: Helpers.wS("32%"),
                          height: Helpers.wS("9.6%"),
                          paddingHorizontal: 10,
                          borderColor: COLOR.borderColor,
                          borderWidth: 1,
                          borderRadius: Helpers.bR(10),
                          fontSize: Helpers.fS(14),
                        },
                      ]}
                      placeholder={LANG[CONFIG.lang].txtWeight}
                      keyboardType={"numeric"}
                      onChangeText={(text) => this.setState({ _weight: text })}
                      value={this.state._weight}
                    />
                    <View
                      style={{
                        width: Helpers.wS("8.53%"),
                        alignItems: "flex-end",
                      }}
                    >
                      <Text style={styles.txtNameStudent}>{"kg"}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View
              style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                width: "100%",
              }}
            >
              <CButton
                style={styles.submit_group_submit}
                onPress={this._onPressUpdateHeightWeight}
              >
                {LANG[CONFIG.lang].txtUpdate}
              </CButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  /**
   * LIFECYCLE
   */
  componentDidMount() {
    this._checkW_H();
  }

  /**
   * FUNCTION
   */
  _checkW_H = () => {
    let i,
      dayNow = moment().format("YYYY-MM-DD"),
      { _dataStudent } = this.state;
    if (_dataStudent) {
      for (i = 0; i < _dataStudent.w_h_History.length; i++) {
        if (_dataStudent.w_h_History[i].date == dayNow) {
          this.setState({
            _height: _dataStudent.w_h_History[i].height.toString(),
            _weight: _dataStudent.w_h_History[i].weight.toString(),
          });
          break;
        }
      }
    }
  };

  _onPressUpdateHeightWeight = async () => {
    if (this.state._height == "" || this.state._weight == "") {
      return Helpers.toast(LANG[CONFIG.lang].txtInputErrNotFill);
    }
    if (isNaN(this.state._height) || isNaN(this.state._weight)) {
      return Helpers.toast(LANG[CONFIG.lang].txtInputErrNotNumber);
    }
    this._updateHeightWeight();
  };

  _updateHeightWeight = async () => {
    Keyboard.dismiss();
    this.props.loadingActions.setLoading(true);

    let params = {
      height: parseFloat(this.state._height),
      weight: parseFloat(this.state._weight),
      date: this.state._dataDay,
      idStudent: this.state._dataStudent.id,
    };
    let resp = await Services.Health.updateHeightWeightStudent(params);
    let txtStatus = "";
    if (resp) {
      if (resp.code == "SUCCESS_200") {
        txtStatus = LANG[CONFIG.lang].txtChangeInfoSuccess;
      } else {
        txtStatus = LANG[CONFIG.lang].txtChangeInfoFailed;
      }
    } else {
      txtStatus = LANG[CONFIG.lang].txtChangeInfoFailed;
    }

    Helpers.toast(txtStatus);
    this.props.loadingActions.setLoading(false);

    this.props.route.params.onRefresh();
    this.props.navigation.goBack();
  };

  _onPressDayChoose = () => {
    this.setState({ _isShowFCalendar: !this.state._isShowFCalendar });
  };

  _onPressDay = (day) => {
    this.setState({
      _isShowFCalendar: !this.state._isShowFCalendar,
      _dataDay: day.dateString,
    });
  };
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loading.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHeightWeightScreen);
