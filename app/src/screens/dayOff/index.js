/**
 * @Description: Absent Screen Logic
 * @Created by ZiniTeam
 * @Date create: 23/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Animated, Keyboard} from 'react-native';
import moment from 'moment';
/** COMMON */
import {CONFIG, LANG} from '../../config';
import Helpers from '../../helpers';
import Services from '../../services';
import * as loadingActions from '../../redux/actions/loading';
/** COMPONENT */
import ViewDayOffScreen from './render';

class DayOffScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _loadForList: true,
      _invalidDay: false,
      _isMoreDay: true,
      _isShowFCalendar: false,
      _isShowTCalendar: false,
      _dataStudents: props.login.data.students,
      _dataClasses: props.login.data.classes,
      _studentChoose: null,
      _classChoose: null,
      _dataFromDay: moment().format('YYYY-MM-DD'),
      _dataToDay: moment().format('YYYY-MM-DD'),
      _dataSumDayOff: 1,
      _fadeAnim: new Animated.Value(1),
      _springAnim: new Animated.Value(1),
      _springFAnim: new Animated.Value(0),
      _springTAnim: new Animated.Value(0),
      _txtError: '',
    };
    this._arrDayOff = [];
  }

  /** FUNCTIONS */
  _checkStudent = async () => {
    let {_dataClasses} = this.state,
      _classChoose = null;
    let _studentChoose = await Helpers.getAsyStrStudentChoosed();
    if (_studentChoose) _studentChoose = JSON.parse(_studentChoose);
    for (let classObj of _dataClasses) {
      let find = classObj.students.find(f => f.id === _studentChoose.id);
      if (find) {
        _classChoose = classObj;
        break;
      }
    }

    this.setState({
      _studentChoose,
      _classChoose,
      _loadForList: false,
    });
  };

  _onPressFDay = day => {
    let _invalidDay = false;
    if (this.state._isMoreDay) {
      let {_dataToDay} = this.state;
      let _tmpF = moment(day.dateString, 'YYYY-MM-DD');
      let _tmpT = moment(_dataToDay, 'YYYY-MM-DD');
      _invalidDay = _tmpF.diff(_tmpT, 'days') > 0;
    }
    this.setState({
      _invalidDay,
      _isShowFCalendar: !this.state._isShowFCalendar,
      _dataFromDay: day.dateString,
    });
  };

  _onPressTDay = day => {
    let _invalidDay = false;
    if (this.state._isMoreDay) {
      let {_dataFromDay} = this.state;
      let _tmpF = moment(_dataFromDay, 'YYYY-MM-DD');
      let _tmpT = moment(day.dateString, 'YYYY-MM-DD');
      _invalidDay = _tmpF.diff(_tmpT, 'days') > 0;
    }
    this.setState({
      _invalidDay,
      _isShowTCalendar: !this.state._isShowTCalendar,
      _dataToDay: day.dateString,
    });
  };

  _onPressFromDay = () => {
    this.setState({_isShowFCalendar: !this.state._isShowFCalendar});
  };

  _onPressToDay = () => {
    let {_isShowTCalendar, _springTAnim} = this.state;
    let _tmp = _isShowTCalendar ? 0 : 1;
    Animated.spring(_springTAnim, {
      toValue: _tmp,
    }).start();

    this.setState({
      _isShowTCalendar: !_isShowTCalendar,
    });
  };

  _enumerateDaysBetweenDates = (startDate, endDate) => {
    let dates = [];
    let currDate = moment(startDate).startOf('day');
    let lastDate = moment(endDate).startOf('day');
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(moment(currDate.clone().toDate()).format('YYYY-MM-DD'));
    }
    return dates;
  };

  _onPressSend = async () => {
    let {login} = this.props;
    Keyboard.dismiss();
    let {
      _studentChoose,
      _dataFromDay,
      _dataToDay,
      _isMoreDay,
      _invalidDay,
      _classChoose,
    } = this.state;
    // Check data before submit
    if (_invalidDay) return Helpers.toast(LANG[CONFIG.lang].txtInvalidDateOff);
    if (this.refs.viewDayOffScreen.refs.reason.value.length < 4) {
      return Helpers.toast(LANG[CONFIG.lang].txtRequireInputReason);
    }

    this.props.loadingActions.setLoading(true);

    let _tmpF = moment(_dataFromDay, 'YYYY-MM-DD');
    let _tmpT = moment(_dataToDay, 'YYYY-MM-DD');

    if (_dataFromDay == _dataToDay || !_isMoreDay) {
      this._arrDayOff = [_dataFromDay];
    } else if (_tmpT.diff(_tmpF, 'days') == 1) {
      this._arrDayOff = [_dataFromDay, _dataToDay];
    } else {
      let arr1 = [_dataFromDay];
      let arr2 = [_dataToDay];
      let dates = this._enumerateDaysBetweenDates(_dataFromDay, _dataToDay);
      this._arrDayOff = arr1.concat(dates).concat(arr2);
    }

    let content =
      LANG[CONFIG.lang].day_off_note_1 +
      _studentChoose.firstName +
      ' ' +
      _studentChoose.lastName +
      ' (';
    if (this._arrDayOff.length > 1) {
      content += this._arrDayOff[0];
      content += ' to ';
      content += this._arrDayOff[this._arrDayOff.length - 1] + ').';
    } else {
      content += this._arrDayOff[0] + ').';
    }
    content +=
      LANG[CONFIG.lang].day_off_note_2 +
      this.refs.viewDayOffScreen.refs.reason.value;
    let params = {
      studentId: _studentChoose.id,
      dates: this._arrDayOff,
      content,
      type: _isMoreDay ? 1 : 2,
      classId: _classChoose.id,
      requestBy: login.data.id,
      school: login.data.school,
    };

    let resp = await Services.DayOff.postInfoDayOff(params);
    let txt = LANG[CONFIG.lang].txtSendSuccess;
    // console.log("resp", resp)
    if (resp) {
      if (resp.code == 'DAYOFF_ERR_CLASS_REQUIRED') {
        txt = resp.message;
      } else if (resp.code == 'DAYOFF_ERR_STUDENT_REQUIRED') {
        txt = resp.message;
      } else if (resp.code == 'DAYOFF_ERR_DATEOFF_REQUIRED') {
        txt = resp.message;
      } else if (resp.code === 'DAYOFF_ERR_DATE_DUPLICATED') {
        txt = resp.message;
      } else {
      }
    } else {
      txt = 'Server Error';
    }
    Helpers.toast(txt);
    this.setState({
      _txtError: txt,
    });
    this.props.loadingActions.setLoading(false);

    setTimeout(() => {
      this.setState({
        _txtError: '',
      });
    }, 1000);
    if (resp && !resp.code) {
      Helpers.resetNavigation(this.props.navigation, 'RootDrawer');
    }
  };

  _onToggleDay = () => {
    let {_isMoreDay, _fadeAnim, _springAnim} = this.state;
    let _tmp = _isMoreDay ? 0 : 1;
    Animated.timing(_fadeAnim, {
      toValue: _tmp,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.spring(_springAnim, {
      toValue: _tmp,
    }).start();

    this.setState({
      _isMoreDay: !_isMoreDay,
    });
  };

  _onPressChooseStudent = async studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      let {_dataClasses, _studentChoose} = this.state,
        _classChoose = null;
      await Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      for (let classObj of _dataClasses) {
        let find = classObj.students.find(f => f.id === _studentChoose.id);
        if (find) {
          _classChoose = find;
          break;
        }
      }
      this.setState({
        _studentChoose: studentObj,
        _classChoose,
      });
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkStudent();
  }

  /** RENDER */
  render() {
    let {
      _loading,
      _loadForList,
      _invalidDay,
      _isMoreDay,
      _isShowFCalendar,
      _isShowTCalendar,
      _fadeAnim,
      _springAnim,
      _dataFromDay,
      _dataToDay,
      _dataSumDayOff,
      _dataStudents,
      _studentChoose,
    } = this.state;

    return (
      <ViewDayOffScreen
        state={this.state}
        ref={'viewDayOffScreen'}
        isLoading={_loading}
        loadForHeader={_loadForList}
        invalidDay={_invalidDay}
        isMoreDay={_isMoreDay}
        isShowFCalendar={_isShowFCalendar}
        isShowTCalendar={_isShowTCalendar}
        data={{
          fromDay: _dataFromDay,
          toDay: _dataToDay,
          sumDayOff: _dataSumDayOff,
          students: _dataStudents,
          studentChoose: _studentChoose,
        }}
        onPress={{
          send: this._onPressSend,
          toggleDay: this._onToggleDay,
          fromDay: this._onPressFromDay,
          toDay: this._onPressToDay,
          fDay: this._onPressFDay,
          tDay: this._onPressTDay,
          chooseStudent: this._onPressChooseStudent,
          goBack: this._onPressBack,
        }}
        anim={{
          opacity: _fadeAnim,
          spring: _springAnim,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    isLoading: state.loading.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayOffScreen);
