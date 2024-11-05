/* eslint-disable prettier/prettier */
/**
 * @Description: Attendance Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/03/2019
 */
/** LIBRARY */
import React from "react";
import { connect } from "react-redux";
import { View, Text, Switch, Alert, TouchableOpacity } from "react-native";
// import Icon from "react-native-fontawesome-pro";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
/** COMPONENT */
import HeaderBar from "../partials/header_bar";
import CCalendar from "../../components/CCalendar/agenda";
import CImage from "../../components/CImage";
import CText from "../../components/CText";
import CButton from "../../components/CButton";
/** COMMON */
import Helpers from "../../helpers";
import { COLOR, CONFIG, LANG, DEVICE, activeSteps, KEY } from "../../config";
import Services from "../../services";
/** STYLES */
import styles from "./style";
import CLoading from "../../components/CLoading";

class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _isCurrDay: true,
      _isSendNoti: true,
      _isSendNotiCheckIn: true,
      _isSendNotiCheckOut: true,
      _dataRender: null,
      _classChoose: null,
      _dataClasses: props.login.data.classes,
      _pickup: activeSteps.CHECK_IN,
    };
    this._attendent = null;
    this._allowShutterPersonInfo =
      props.setting.config.value.allowShuttlePersonInfo;
    this._allowShuttleBus = props.setting.config.value.allowShuttleBus;
    this._currDay = moment().format("YYYY-MM-DD");
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    let _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
    }
    this.setState({
      _classChoose: _classChoose ? _classChoose : null,
      _loadForList: false,
      _loading: false,
    });
  };

  _loadAttendanceStudents = async (day) => {
    let { login } = this.props;
    let { _classChoose } = this.state;
    let _tmpDataRender = {};
    _tmpDataRender[day.dateString] = [];

    /** CALL API GET STUDENT */
    let params = {
      classId: _classChoose.id,
      date: day.dateString,
      school: login.data.school,
      type: KEY.TEACHER,
    };

    let resAttendance = await Services.Attendant.findOrCreate(params);

    if (resAttendance && resAttendance.length > 0) {
      for (let std of resAttendance) {
        let _absent =
          std.activeStep === activeSteps.CHECK_IN ||
          std.activeStep === activeSteps.CHECK_OUT ||
          std.activeStep === activeSteps.ON_BUS_OUT;
        let newFullName = Helpers.capitalizeName(
          std.student.firstName,
          std.student.lastName,
          CONFIG.settingLocal.softName
        );
        _tmpDataRender[day.dateString].push({
          absent: _absent,
          id: std.id,
          student: {
            id: std.student.id,
            fullName: newFullName,
            avatar: std.student.avatar,
            gender: std.student.gender,
          },
        });
      }
    }

    this.setState({
      _dataRender: _tmpDataRender,
      _isCurrDay: day.dateString === this._currDay,
    });
  };

  _loadPickUpStudents = async (day) => {
    let _tmpDataRender = {};
    _tmpDataRender[day.dateString] = [];

    /** CALL API GET STUDENT */
    let params = {
      classId: this.state._classChoose.id,
      school: this.props.login.data.school,
      date: day.dateString,
      type: KEY.TEACHER,
    };
    let resPickUp = await Services.Attendant.findOrCreate(params);

    if (resPickUp && resPickUp.length > 0) {
      let std = null,
        _absent = false,
        newFullName = "";
      for (std of resPickUp) {
        if (
          std.activeStep === activeSteps.CHECK_IN ||
          std.activeStep === activeSteps.CHECK_OUT ||
          std.activeStep === activeSteps.ON_BUS_OUT
        ) {
          _absent =
            std.activeStep === activeSteps.CHECK_OUT ||
            std.activeStep === activeSteps.ON_BUS_OUT;
          newFullName = Helpers.capitalizeName(
            std.student.firstName,
            std.student.lastName
          );
          CONFIG.settingLocal.softName,
            _tmpDataRender[day.dateString].push({
              absent: _absent,
              id: std.id,
              student: {
                id: std.student.id,
                fullName: newFullName,
                avatar: std.student.avatar,
                gender: std.student.gender,
              },
            });
        }
      }
    }

    this.setState({
      _dataRender: _tmpDataRender,
      _isCurrDay: day.dateString === this._currDay,
    });
  };

  _onDateChange = (day) => {
    this._currDay;
    let { _pickup, _isSendNotiCheckIn, _isSendNotiCheckOut } = this.state;
    if (this._currDay === day.dateString) {
      if (_pickup === activeSteps.CHECK_IN) {
        this._loadAttendanceStudents(day);
      } else {
        this._loadPickUpStudents(day);
      }
    } else {
      if (
        (_pickup === activeSteps.CHECK_IN && !_isSendNotiCheckIn) ||
        (_pickup === activeSteps.CHECK_OUT && !_isSendNotiCheckOut)
      ) {
        let onPressCancel = async () => {
          this._getListHistory(day);
        };
        this._onAlert(onPressCancel);
      }
      this._getListHistory(day);
    }
  };

  _checkIn = async (id, onFailed) => {
    let params = {
      id,
      school: this.props.login.data.school,
      time: moment().format("HH:mm"),
      userId: this.props.login.data.id,
    };
    let resCheckIn = await Services.Attendant.checkIn(params);
    if (resCheckIn) {
      if (resCheckIn.code) {
        onFailed();
        Helpers.toast(resCheckIn.message);
      } else {
        this.setState({
          _isSendNotiCheckIn: false,
        });
      }
    } else {
      onFailed();
      Helpers.toast("Server Error");
    }
  };

  _onRefresh = (checkSendNoti) => {
    let { _pickup } = this.state,
      curDate = { dateString: this._currDay };
    this.setState({ _dataRender: null });
    if (_pickup === activeSteps.CHECK_IN && checkSendNoti) {
      this.setState({
        _isSendNotiCheckIn: false,
      });
      this._loadAttendanceStudents(curDate);
    } else if (_pickup === activeSteps.CHECK_OUT) {
      this.setState({
        _isSendNotiCheckOut: false,
      });
      this._loadPickUpStudents(curDate);
    }
  };

  _getListHistory = async (day) => {
    let { login } = this.props;
    let date = day.dateString,
      classId = this.state._classChoose.id,
      params = { classId, date, school: login.data.school, type: KEY.TEACHER },
      resHistory,
      _tmpDataRender = {};

    _tmpDataRender[day.dateString] = [];
    resHistory = await Services.Attendant.classDiary(params);
    // console.log('resHistory: ', resHistory);

    if (resHistory && resHistory.length > 0) {
      for (let std of resHistory) {
        if (std.student) {
          let newFullName = Helpers.capitalizeName(
            std.student.firstName,
            std.student.lastName,
            CONFIG.settingLocal.softName
          );
          _tmpDataRender[day.dateString].push({
            isAttendance: std.isAttendance,
            isPickUp: std.isPickUp,
            date: std.date,
            classId: std.classObj,
            student: {
              id: std.student.id,
              fullName: newFullName,
              avatar: std.student.avatar,
              gender: std.student.gender,
            },
          });
        }
      }
    }
    this.setState({
      _dataRender: _tmpDataRender,
      _isCurrDay: day.dateString === this._currDay,
    });
  };

  _rowHasChanged = (r1, r2) => {
    return r1.updatedAt !== r2.updatedAt;
  };

  _renderEmptyStudent = () => {
    return (
      <View
        style={[
          DEVICE.gStyle.align_center,
          { marginTop: (DEVICE.width * 1) / 3 },
        ]}
      >
        <FontAwesome5
          name={"search"}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
        />
        <CText style={styles.txt_empty} i18nKey={"txtNoDataAttendance"} />
      </View>
    );
  };

  _onAlert = (actionCancel) => {
    let cancel = actionCancel || null;

    Alert.alert(
      "",
      LANG[CONFIG.lang].sendNotiToParent + this.state._classChoose.title + "?",
      [
        {
          text: LANG[CONFIG.lang].cancel,
          onPress: () => {
            // this.setState({ _isSendNoti  : true });
            if (cancel && typeof cancel === "function") {
              cancel();
            }
          },
          style: "cancel",
        },
        {
          text: LANG[CONFIG.lang].ok,
          onPress: () => this._onPressSendNotification(),
          style: "default",
        },
        ,
      ],
      { cancelable: true }
    );
  };

  renderHeaderList = (item) => {
    const { _pickup, _isCurrDay } = this.state;

    return (
      <View style={styles.con_header}>
        {_isCurrDay ? (
          <View style={styles.btnArea}>
            <TouchableOpacity
              style={[
                styles.btnHeader,
                _pickup === activeSteps.CHECK_IN && {
                  backgroundColor: COLOR.primaryApp,
                },
                { marginRight: 15 },
              ]}
              onPress={() => this._onToggleInOut(activeSteps.CHECK_IN)}
            >
              <CText
                style={[
                  styles.txtTextHeader,
                  _pickup === activeSteps.CHECK_IN && { color: "#ffffff" },
                ]}
                i18nKey={"in"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btnHeader,
                _pickup === activeSteps.CHECK_OUT && {
                  backgroundColor: COLOR.primaryApp,
                },
              ]}
              onPress={() => this._onToggleInOut(activeSteps.CHECK_OUT)}
            >
              <CText
                style={[
                  styles.txtTextHeader,
                  _pickup === activeSteps.CHECK_OUT && { color: "#ffffff" },
                ]}
                i18nKey={"out"}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnArea}>
            <View style={[styles.btnHeader, styles.mr_15]}>
              <CText style={styles.txtTextHeaderNotCurr} i18nKey={"in"} />
            </View>

            <View style={[styles.btnHeader]}>
              <CText style={styles.txtTextHeaderNotCurr} i18nKey={"out"} />
            </View>
          </View>
        )}
      </View>
    );
  };

  _onHistory = (item) => {
    this.props.navigation.navigate("HistoryAttendance", {
      studentId: item.student.id,
      dataClass: this.state._classChoose,
      date: item.date,
    });
  };

  _renderFooter = () => {
    let {
      _isCurrDay,
      _pickup,
      _isSendNoti,
      _isSendNotiCheckIn,
      _isSendNotiCheckOut,
    } = this.state;

    if (
      _isCurrDay &&
      (_pickup === activeSteps.CHECK_IN || _pickup === activeSteps.CHECK_OUT)
    ) {
      return (
        <View
          style={[
            styles.buttonArea,
            {
              opacity:
                (_pickup === activeSteps.CHECK_IN && _isSendNotiCheckIn) ||
                (_pickup === activeSteps.CHECK_OUT && _isSendNotiCheckOut)
                  ? 0.5
                  : 1,
            },
          ]}
        >
          <CButton
            style={styles.submit_group_submit}
            onPress={this._onAlert}
            disabled={
              (_pickup === activeSteps.CHECK_IN && _isSendNotiCheckIn) ||
              (_pickup === activeSteps.CHECK_OUT && _isSendNotiCheckOut)
            }
          >
            {LANG[CONFIG.lang].send_notification}
          </CButton>
        </View>
      );
    } else {
      return null;
    }
  };

  /** HANDLE FUNCTIONS */
  _onToggleInOut = (type) => {
    let {
      _pickup,
      _isCurrDay,
      _isSendNoti,
      _isSendNotiCheckIn,
      _isSendNotiCheckOut,
    } = this.state;
    if (type !== _pickup) {
      if (type === activeSteps.CHECK_IN) {
        this.setState({ _pickup: type, _dataRender: null });
      } else if (
        type === activeSteps.CHECK_OUT ||
        type === activeSteps.ON_BUS_OUT
      ) {
        if (
          _isCurrDay &&
          ((_pickup === activeSteps.CHECK_IN && !_isSendNotiCheckIn) ||
            (_pickup === activeSteps.CHECK_OUT && !_isSendNotiCheckOut))
        ) {
          let onPressCancel = async () => {
            this.setState({ _pickup: type, _dataRender: null });
          };
          this._onAlert(onPressCancel);
        } else {
          this.setState({ _pickup: type, _dataRender: null });
        }
      }
    }
  };

  _onPressToggleAbsent = (data, valueToggle, onFailed) => {
    let { _pickup, _classChoose } = this.state;
    let allowShutter = this._allowShutterPersonInfo;

    if (_pickup === activeSteps.CHECK_IN) {
      if (!allowShutter) {
        this._checkIn(data.id, onFailed);
      } else if (valueToggle && allowShutter) {
        this.props.navigation.navigate("PickUpDetailScreenTmp", {
          idAttendance: data.id,
          dataClass: _classChoose,
          pickupType: _pickup,
          allowShuttleBus: this._allowShuttleBus,
          onRefresh: this._onRefresh,
        });
      }
    } else if (_pickup === activeSteps.CHECK_OUT) {
      if (valueToggle) {
        this.props.navigation.navigate("PickUpDetailScreenTmp", {
          idAttendance: data.id,
          dataClass: _classChoose,
          pickupType: _pickup,
          allowShuttleBus: this._allowShuttleBus,
          onRefresh: this._onRefresh,
        });
      }
    }
  };

  _onPressChooseClass = async (classObj) => {
    if (classObj.id !== this.state._classChoose.id) {
      let { _pickup, _isSendNoti, _isCurrDay, _isSendNotiCheckIn } = this.state;
      Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this.setState({ _dataRender: null, _classChoose: classObj });
      if (
        _isCurrDay &&
        !_isSendNotiCheckIn &&
        _pickup === activeSteps.CHECK_IN
      ) {
        return this._onAlert();
      }
    }
  };

  _onBack = () => {
    let { _isCurrDay, _pickup, _isSendNotiCheckIn } = this.state;
    if (_isCurrDay && !_isSendNotiCheckIn && _pickup === activeSteps.CHECK_IN) {
      let onPressBack = () => {
        this.props.navigation.goBack();
      };
      this._onAlert(onPressBack);
    } else {
      this.props.navigation.goBack();
    }
  };

  _onPressSendNotification = async (actionCancel) => {
    let _dateChoose = Object.keys(this.state._dataRender)[0];
    let params = {
      classId: this.state._classChoose.id,
      school: this.props.login.data.school,
      date: _dateChoose,
      type: KEY.TEACHER,
    };
    let res = await Services.Attendant.pushNotification(params);
    if (res && res.message === "ok") {
      if (this.state._pickup === activeSteps.CHECK_IN) {
        this.setState({ _isSendNotiCheckIn: true });
      } else if (this.state._pickup === activeSteps.CHECK_OUT) {
        this.setState({ _isSendNotiCheckOut: true });
      }
      Helpers.toast(LANG[this.props.language].sendNotiSuccess);
    } else {
      Helpers.toast(LANG[this.props.language].sendNotiFailed);
    }
    // actionCancel && actionCancel();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkClasses();
  }

  /** RENDER */
  render() {
    let {
      _loading,
      _loadForList,
      _isCurrDay,
      _dataRender,
      _dataClasses,
      _classChoose,
    } = this.state;

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={"txtHomeAttendance"}
          hasBack
          onBack={this._onBack}
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={_loadForList}
          dataCustomHeaderRight={_dataClasses}
          dataChooseCustomHeaderRight={_classChoose}
          onCustomHeaderRight={this._onPressChooseClass}
        />

        {!_loading && (
          <CCalendar
            theme={{
              backgroundColor: COLOR.backgroundMain,
              textMonthFontWeight: "bold",
              textDayFontFamily: DEVICE.fontRegular,
              textMonthFontFamily: DEVICE.fontBold,
              textDayHeaderFontFamily: DEVICE.fontMedium,
            }}
            minDate={"2018-01-01"}
            maxDate={moment().format("YYYY-MM-DD")}
            monthFormat={"MMMM - yyyy"}
            items={_dataRender}
            loadItemsForMonth={(day) => this._onDateChange(day)}
            renderItem={(item) => (
              <RenderListStudent
                item={item}
                isCurrDay={_isCurrDay}
                onPressToggleAbsent={this._onPressToggleAbsent}
                onHistory={this._onHistory}
              />
            )}
            renderDay={(day, item) => {
              return <View />;
            }}
            renderEmptyDate={this._renderEmptyStudent}
            rowHasChanged={(r1, r2) => this._rowHasChanged(r1, r2)}
            showCalendar={true}
            renderKnobOpen={() => (
              <CText
                style={styles.txt_open_calendar}
                i18nKey={"openCalendar"}
              />
            )}
            renderKnobClose={() => (
              <CText
                style={styles.txt_open_calendar}
                i18nKey={"closeCalendar"}
              />
            )}
            renderFooterContent={() => this._renderFooter()}
            renderHeaderContent={() => this.renderHeaderList(_classChoose)}
            showScrollIndicator={true}
          />
        )}

        {_loading && (
          <View style={DEVICE.gStyle.full_center}>
            <CLoading />
          </View>
        )}
      </View>
    );
  }
}

class RenderListStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _absent: props.item.absent,
      _avatar: props.item.student.avatar,
    };
  }

  /** FUNCTIONS */
  _onValueChange = (data, valueToggle) => {
    this.props.onPressToggleAbsent(data, valueToggle, this._onCheckInFailed);
    this.setState({ _absent: valueToggle });
  };

  _onCheckInFailed = () => {
    this.setState({ _absent: false });
  };

  /** RENDER */
  render() {
    let { item, isCurrDay } = this.props;
    let { _absent, _avatar } = this.state;
    let gender = CONFIG.students.find((f) => f.id === item.student.gender);

    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }

    return (
      <TouchableOpacity
        style={styles.rowItemClass}
        activeOpacity={isCurrDay ? 1 : 0}
        onPress={!isCurrDay ? () => this.props.onHistory(item) : () => {}}
      >
        <CImage
          style={styles.img_item}
          resizeMode={"contain"}
          src={
            _avatar != "" && _avatar != null
              ? { uri: CONFIG.host + _avatar }
              : gender
          }
        />

        <View style={styles.nameArea}>
          <Text style={styles.txtNameStudent}>{item.student.fullName}</Text>
          {isCurrDay ? (
            <Switch
              disabled={_absent && !this._allowShutterPersonInfo}
              ios_backgroundColor={COLOR.backgroundColorNote}
              thumbColor={"#ffffff"}
              trackColor={{ false: COLOR.borderColor, true: COLOR.primaryApp }}
              value={_absent}
              onValueChange={(value) => this._onValueChange(item, value)}
            />
          ) : (
            <View style={styles.con_history_btn_row}>
              <View style={[styles.con_history_btn, styles.mr_15]}>
                <FontAwesome5
                  name={item.isAttendance ? "check-circle" : "times-circle"}
                  size={Helpers.fS(20)}
                  color={COLOR.cor_xam}
                  solid={item.isAttendance}
                />
              </View>
              <View style={[styles.con_history_btn]}>
                <FontAwesome5
                  name={item.isPickUp ? "check-circle" : "times-circle"}
                  size={Helpers.fS(20)}
                  color={COLOR.cor_xam}
                  solid={item.isPickUp}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    language: state.language.language,
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(AttendanceScreen);
