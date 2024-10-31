/* eslint-disable prettier/prettier */
/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Switch, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
/** COMPONENT */
import HeaderBar from '../partials/header_bar';
import CCalendar from '../../components/CCalendar/agenda';
import CImage from '../../components/CImage';
import CText from '../../components/CText';
/** COMMON */
import Helpers from '../../helpers';
import {COLOR, CONFIG, LANG, DEVICE, activeSteps, KEY} from '../../config';
import * as loadingActions from '../../redux/actions/loading';
/** SERVICES */
import Services from '../../services';
/** STYLES */
import styles from './style';
import Errors from '../../config/errors';
import CButton from '../../components/CButton';

class DriverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _isCurrDay: true,
      _dataRender: null,
      _classChoose: null,
      _dataClasses: props.login.data.classes,
      _pickup: activeSteps.ON_BUS_IN,
      _isSendNoti: true,
      _isSendNotiCheckIn: true,
      _isSendNotiCheckOut: true,
    };
    this._attendent = null;
    this._userId = props.login.data.id;
    this._allowShuttleBus = true;
    this._currDay = moment().format('YYYY-MM-DD');
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    let _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
    }
    this.setState({
      _classChoose: _classChoose ? _classChoose : this.state._dataClasses[0],
      _loading: false,
      _loadForList: false,
    });
    this.props.loadingActions.setLoading(false);
  };

  _onToggleInOut = type => {
    let curDate = {dateString: moment().format('YYYY-MM-DD')};
    let {
      _pickup,
      _isCurrDay,
      _isSendNoti,
      _isSendNotiCheckIn,
      _isSendNotiCheckOut,
    } = this.state;

    // console.log(type, _pickup);

    if (type !== _pickup) {
      if (type === activeSteps.ON_BUS_IN) {
        this.setState({_pickup: type, _dataRender: null});
      } else if (
        type === activeSteps.CHECK_OUT ||
        type === activeSteps.ON_BUS_OUT
      ) {
        if (
          _isCurrDay &&
          ((_pickup === activeSteps.ON_BUS_IN && !_isSendNotiCheckIn) ||
            (_pickup === activeSteps.CHECK_OUT && !_isSendNotiCheckOut))
        ) {
          let onPressCancel = async () => {
            this.setState({_pickup: type, _dataRender: null});
          };
          this._onAlert(onPressCancel);
        } else {
          this.setState({_pickup: type, _dataRender: null});
        }
      }
      // this._loadStudents(curDate, type);
    }
  };

  _onDateChange = day => {
    this._currDay;
    let {_pickup, _isSendNotiCheckIn, _isSendNotiCheckOut} = this.state;
    if (this._currDay === day.dateString) {
      this._loadStudents(day, _pickup);
    } else {
      if (
        (_pickup === activeSteps.ON_BUS_IN && !_isSendNotiCheckIn) ||
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

  _loadStudents = async (day, pickup) => {
    let {_classChoose} = this.state;

    let curDate = moment().format('YYYY-MM-DD');
    let _tmpDataRender = {};
    _tmpDataRender[day.dateString] = [];

    if (this._allowShuttleBus) {
      /** CALL API GET STUDENT */
      let params = {
        classId: _classChoose.id,
        date: day.dateString,
        school: this.props.login.data.school,
        type: KEY.DRIVER,
      };

      let resAttendance = await Services.Attendant.findOrCreate(params);
      // console.log(resAttendance);

      if (resAttendance && resAttendance.length > 0) {
        for (let std of resAttendance) {
          if (
            pickup === activeSteps.ON_BUS_IN ||
            pickup === activeSteps.ON_BUS_OUT ||
            pickup === activeSteps.CHECK_OUT
          ) {
            let _movingProcessStep = null;
            if (pickup === activeSteps.ON_BUS_IN) {
              _movingProcessStep = Object.values(activeSteps).includes(
                std.activeStep,
              );
            } else if (pickup === activeSteps.CHECK_OUT) {
              _movingProcessStep = std.activeStep === activeSteps.CHECK_OUT;
            }

            let newFullName = Helpers.capitalizeName(
              std.student.firstName,
              std.student.lastName,
              CONFIG.settingLocal.softName,
            );

            let checkActiveStep = true;
            if (pickup === activeSteps.CHECK_OUT) {
              if (
                std.activeStep !== activeSteps.ON_BUS_OUT &&
                std.activeStep !== activeSteps.CHECK_OUT
              ) {
                checkActiveStep = false;
              }
            }

            if (checkActiveStep) {
              _tmpDataRender[day.dateString].push({
                movingProcessStep: _movingProcessStep,
                id: std.id,
                student: {
                  id: std.student.id,
                  fullName: newFullName,
                  avatar: std.student.avatar,
                  gender: std.student.gender,
                },
                tracking: std.tracking,
              });
            }
          }
        }
      } else {
        _tmpDataRender[day.dateString].push();
      }
    }

    this.setState({
      _dataRender: _tmpDataRender,
      _isCurrDay: day.dateString === curDate ? true : false,
    });
  };

  _getListHistory = async day => {
    let {login} = this.props;
    let date = day.dateString,
      classId = this.state._classChoose.id,
      params = {classId, date, school: login.data.school, type: KEY.DRIVER},
      resHistory,
      _tmpDataRender = {};

    _tmpDataRender[day.dateString] = [];

    resHistory = await Services.Attendant.classDiary(params);

    if (resHistory && resHistory.length > 0) {
      for (let std of resHistory) {
        if (std.student) {
          let newFullName = Helpers.capitalizeName(
            std.student.firstName,
            std.student.lastName,
            CONFIG.settingLocal.softName,
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

  // _onPressToggleAbsent = (item, value, onFailed) => {
  //   let { _pickup } = this.state;
  //   this._onAlert(item, _pickup, onFailed);
  // };

  _onPressToggleAbsent = (data, valueToggle, onFailed) => {
    let {_pickup, _classChoose} = this.state;
    // console.log('_pickup: ', _pickup)

    if (valueToggle) {
      if (_pickup === activeSteps.ON_BUS_IN) {
        this.props.navigation.navigate('PickUpDetailScreenDriver', {
          idAttendance: data.id,
          dataClass: _classChoose,
          pickupType: _pickup,
          allowShuttleBus: this._allowShuttleBus,
          onRefresh: this._onRefresh,
        });
      } else if (_pickup === activeSteps.CHECK_OUT) {
        this.props.navigation.navigate('PickUpDetailScreenDriver', {
          idAttendance: data.id,
          dataClass: _classChoose,
          pickupType: _pickup,
          allowShuttleBus: this._allowShuttleBus,
          onRefresh: this._onRefresh,
        });
      }
    } else {
      onFailed();
    }
  };

  _onRefresh = checkSendNoti => {
    let {_pickup} = this.state,
      curDate = {dateString: this._currDay};
    this.setState({_dataRender: null});
    if (_pickup === activeSteps.ON_BUS_IN && checkSendNoti) {
      this.setState({
        _isSendNotiCheckIn: false,
      });
    } else if (_pickup === activeSteps.CHECK_OUT) {
      this.setState({
        _isSendNotiCheckOut: false,
      });
    }
    this._loadStudents(curDate, _pickup);
  };

  _rowHasChanged = (r1, r2) => {
    return r1.updatedAt !== r2.updatedAt;
  };

  _renderEmptyStudent = () => {
    return (
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <Icon
          containerStyle={{marginTop: 10}}
          name={'search'}
          size={50}
          color={COLOR.placeholderTextColor}
          type={'solid'}
        />
        <CText style={styles.txt_empty} i18nKey={'txtEmptyStudent'} />
      </View>
    );
  };

  _onPressChooseClass = async classObj => {
    if (classObj.id !== this.state._classChoose.id) {
      let {_pickup, _isSendNoti, _isCurrDay, _dataRender, _isSendNotiCheckIn} =
        this.state;
      let _dateChoose = Object.keys(_dataRender)[0];
      await Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this.setState({_dataRender: null, _classChoose: classObj});
      this._loadStudents({dateString: _dateChoose}, _pickup);
      if (
        _isCurrDay &&
        !_isSendNotiCheckIn &&
        _pickup === activeSteps.ON_BUS_IN
      ) {
        return this._onAlert();
      }
    }
  };

  _onBack = () => {
    let {_isCurrDay, _pickup, _isSendNotiCheckIn} = this.state;
    if (
      _isCurrDay &&
      !_isSendNotiCheckIn &&
      _pickup === activeSteps.ON_BUS_IN
    ) {
      let onPressBack = () => {
        this.props.navigation.goBack();
      };
      this._onAlert(onPressBack);
    } else {
      this.props.navigation.goBack();
    }
  };

  _onAlert = actionCancel => {
    let cancel = actionCancel || null;
    // let { _pickup, _isSendNoti, _isCurrDay } = this.state;
    // const currDay = { dateString: moment().format('YYYY-MM-DD') };
    Alert.alert(
      'Kindie',
      LANG[CONFIG.lang].sendNotiToParent + this.state._classChoose.title + '?',
      // _pickup === activeSteps.ON_BUS_IN
      //   ? LANG[CONFIG.lang].cfmPickUpKid +
      //   item.student.fullName +
      //   LANG[CONFIG.lang].cfmPickUpKid2
      //   : LANG[CONFIG.lang].cfmDropOffKid +
      //   item.student.fullName +
      //   LANG[CONFIG.lang].cfmDropOffKid2,
      // [
      //   {
      //     text: LANG[CONFIG.lang].cancel,
      //     onPress: () => {
      //       this.setState({ _dataRender: null });
      //       this._loadStudents(currDay, pickup);
      //     },
      //     style: 'cancel',
      //   },
      //   {
      //     text: LANG[CONFIG.lang].ok,
      //     onPress: () =>
      //       pickup === activeSteps.ON_BUS_IN
      //         ? this._pickUp(item.id, onFailed)
      //         : this._dropOff(item.id, onFailed),
      //     style: 'default',
      //   },
      //   ,
      // ],
      [
        {
          text: LANG[CONFIG.lang].cancel,
          onPress: () => {
            // this.setState({ _isSendNoti: true });
            // cancel?.();
            if (cancel && typeof cancel === 'function') {
              cancel();
            }
          },
          style: 'cancel',
        },
        {
          text: LANG[CONFIG.lang].ok,
          onPress: () => this._onPressSendNotification(),
          style: 'default',
        },
        ,
      ],
      {cancelable: true},
    );
  };

  _onPressSendNotification = async actionCancel => {
    let _dateChoose = Object.keys(this.state._dataRender)[0];
    let params = {
      classId: this.state._classChoose.id,
      school: this.props.login.data.school,
      date: _dateChoose,
      type: KEY.DRIVER,
    };
    let res = await Services.Attendant.pushNotification(params);
    if (res && res.message === 'ok') {
      if (this.state._pickup === activeSteps.ON_BUS_IN) {
        this.setState({_isSendNotiCheckIn: true});
      } else if (this.state._pickup === activeSteps.CHECK_OUT) {
        this.setState({_isSendNotiCheckOut: true});
      }
      Helpers.toast(LANG[this.props.language].sendNotiSuccess);
    } else {
      Helpers.toast(LANG[this.props.language].sendNotiFailed);
    }
    // actionCancel && actionCancel();
  };

  renderHeaderList = item => {
    const {_pickup, _isCurrDay} = this.state;
    return (
      <View style={styles.con_header}>
        {_isCurrDay ? (
          <View style={styles.btnArea}>
            <TouchableOpacity
              onPress={() => this._onToggleInOut(activeSteps.ON_BUS_IN)}
              style={[
                styles.btnHeader,
                _pickup === activeSteps.ON_BUS_IN && {
                  backgroundColor: COLOR.primaryApp,
                },
                {marginRight: 15},
              ]}>
              <CText
                style={[
                  styles.txtTextHeader,
                  _pickup === activeSteps.ON_BUS_IN && {color: '#ffffff'},
                ]}
                i18nKey={'in'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onToggleInOut(activeSteps.CHECK_OUT)}
              style={[
                styles.btnHeader,
                _pickup === activeSteps.CHECK_OUT && {
                  backgroundColor: COLOR.primaryApp,
                },
              ]}>
              <CText
                style={[
                  styles.txtTextHeader,
                  _pickup === activeSteps.CHECK_OUT && {color: '#ffffff'},
                ]}
                i18nKey={'out'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnArea}>
            <View style={[styles.btnHeader, {marginRight: 15}]}>
              <CText style={styles.txtTextHeaderNotCurr} i18nKey={'in'} />
            </View>
            <View style={[styles.btnHeader]}>
              <CText style={styles.txtTextHeaderNotCurr} i18nKey={'out'} />
            </View>
          </View>
        )}
      </View>
    );
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
      (_pickup === activeSteps.ON_BUS_IN ||
        _pickup === activeSteps.ON_BUS_OUT ||
        _pickup === activeSteps.CHECK_OUT)
    ) {
      return (
        <View
          style={[
            styles.buttonArea,
            {
              opacity:
                (_pickup === activeSteps.ON_BUS_IN && _isSendNotiCheckIn) ||
                ((_pickup === activeSteps.ON_BUS_OUT ||
                  _pickup === activeSteps.CHECK_OUT) &&
                  _isSendNotiCheckOut)
                  ? 0.5
                  : 1,
            },
          ]}>
          <CButton
            style={styles.submit_group_submit}
            onPress={this._onAlert}
            disabled={
              (_pickup === activeSteps.ON_BUS_IN && _isSendNotiCheckIn) ||
              ((_pickup === activeSteps.ON_BUS_OUT ||
                _pickup === activeSteps.CHECK_OUT) &&
                _isSendNotiCheckOut)
            }>
            {LANG[CONFIG.lang].send_notification}
          </CButton>
        </View>
      );
    } else {
      return null;
    }
  };

  _onHistory = item => {
    this.props.navigation.navigate('DriverHistoryAttendance', {
      studentId: item.student.id,
      dataClass: this.state._classChoose,
      date: item.date,
    });
  };

  _pickUp = async (id, onFailed) => {
    let resGetAttendant,
      params1 = {
        id: id,
        school: this.props.login.data.school,
      };
    resGetAttendant = await Services.Attendant.get(params1);

    let params = {
      attendanceId: id,
      userId: this._userId,
      parentId: resGetAttendant.arrParent[0].id,
      school: this.props.login.data.school,
    };
    let resPickUp = await Services.Driver.pickUp(params);

    if (resPickUp && !resPickUp.code && resPickUp.length > 0) {
    } else {
      onFailed(resPickUp && resPickUp.code);
    }
  };

  _dropOff = async (id, onFailed) => {
    let resGetAttendant,
      params1 = {
        id: id,
        school: this.props.login.data.school,
      };
    resGetAttendant = await Services.Attendant.get(params1);

    let params = {
      attendanceId: id,
      userId: this._userId,
      parentId: resGetAttendant.arrParent[0].id,
      school: this.props.login.data.school,
    };
    let resDropOff = await Services.Driver.dropOff(params);

    if (resDropOff && !resDropOff.code && resDropOff.length > 0) {
    } else {
      onFailed(resDropOff && resDropOff.code);
    }
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
      _pickup,
    } = this.state;
    let currDay = moment().format('YYYY-MM-DD');

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={'driver'}
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={_loadForList}
          dataCustomHeaderRight={_dataClasses}
          dataChooseCustomHeaderRight={_classChoose}
          onCustomHeaderRight={this._onPressChooseClass}
          onBack={this._onBack}
        />

        {!_loading && (
          <CCalendar
            theme={{
              backgroundColor: COLOR.backgroundMain,
              textMonthFontWeight: 'bold',
              textDayFontFamily: DEVICE.fontRegular,
              textMonthFontFamily: DEVICE.fontBold,
              textDayHeaderFontFamily: DEVICE.fontMedium,
            }}
            minDate={'2010-01-01'}
            maxDate={moment().format('YYYY-MM-DD')}
            monthFormat={'MMMM - yyyy'}
            items={_dataRender}
            loadItemsForMonth={day => this._onDateChange(day)}
            renderItem={item => (
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
                i18nKey={'openCalendar'}
              />
            )}
            renderKnobClose={() => (
              <CText
                style={styles.txt_open_calendar}
                i18nKey={'closeCalendar'}
              />
            )}
            renderFooterContent={() => this._renderFooter()}
            renderHeaderContent={() => this.renderHeaderList(_classChoose)}
          />
        )}
      </View>
    );
  }
}

class RenderListStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _movingProcessStep: props.item.movingProcessStep,
      _avatar: props.item.student.avatar,
    };
  }

  /** FUNCTIONS */
  _onValueChange = (item, value) => {
    this.props.onPressToggleAbsent(item, value, this._onFailed);
    this.setState({_movingProcessStep: value});
  };

  _onFailed = code => {
    let err = '';
    this.setState({
      _movingProcessStep: false,
    });
    if (code === Errors.SETTINGS_STUDENT_MOVING_PROCESS_NOT_ACTIVE.code) {
      err = LANG[CONFIG.lang].moving_process_inactive;
    } else {
      err = LANG[CONFIG.lang].serverError;
    }
    Helpers.toast(err);
  };

  /** RENDER */
  render() {
    let {item, isCurrDay} = this.props;
    let {_movingProcessStep, _avatar} = this.state;
    // console.log('_movingProcessStep', _movingProcessStep);
    let gender = CONFIG.students.find(f => f.id === item.student.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }
    // console.log(item);
    return (
      <TouchableOpacity
        style={styles.rowItemClass}
        activeOpacity={isCurrDay ? 1 : 0}
        onPress={!isCurrDay ? () => this.props.onHistory(item) : () => {}}>
        <View style={styles.rowItemClass}>
          <CImage
            style={styles.img_item}
            resizeMode={'contain'}
            src={
              _avatar != '' && _avatar != null
                ? {uri: CONFIG.host + _avatar}
                : gender
            }
          />

          <View style={styles.nameArea}>
            <CText style={styles.txtNameStudent}>{item.student.fullName}</CText>
            {isCurrDay ? (
              <Switch
                ios_backgroundColor={COLOR.backgroundColorNote}
                thumbColor={'#ffffff'}
                trackColor={{false: COLOR.borderColor, true: COLOR.primaryApp}}
                disabled={_movingProcessStep}
                value={_movingProcessStep}
                onValueChange={value => this._onValueChange(item, value)}
              />
            ) : (
              <View style={styles.con_history_btn_row}>
                <View style={[styles.con_history_btn, {marginRight: 15}]}>
                  <Icon
                    name={item.isAttendance ? 'check-circle' : 'times-circle'}
                    size={20}
                    color={'black'}
                    type={item.isAttendance ? 'solid' : 'light'}
                  />
                </View>
                <View style={[styles.con_history_btn]}>
                  <Icon
                    name={item.isPickUp ? 'check-circle' : 'times-circle'}
                    size={20}
                    color={'black'}
                    type={item.isPickUp ? 'solid' : 'light'}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    language: state.language.language,
    setting: state.setting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverScreen);
