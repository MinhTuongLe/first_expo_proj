/**
 * @Description: History Teacher Screen
 * @Created by ZiniTeam
 * @Date create: 14/05/2020
 */
/** LIBRARY */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
/** COMPONENTS */
import { ViewHistoryParent } from './render';
/** COMMON */
import Helpers from '../../../helpers';
import Services from '../../../services';
import { COLOR, CONFIG, KEY } from '../../../config';
import moment from 'moment';

const DATE_TYPE = {
  month: "month",
  date: "date"
};

const currentDate = {
  key: 'currentDate',
}
const present = {
  key: 'present',
  marked: true,
  dotColor: COLOR.primaryApp
}
const absent = {
  key: 'absent',
  marked: true,
  dotColor: COLOR.primaryTextNote
}
const selected = {
  key: 'selected',
  selected: true
}

class HistoryParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _dataStudents: props.login.data.students,
      _studentChoose: null,
      _markedDate: {},
      _data: {
        countAbsent: 0,
        countPresent: 0,
        monthlyData: []
      },
      _dataMonth: {
        countAbsent: 0,
        countPresent: 0,
        monthlyData: []
      },
      _dataCalendar: [],
      _currentDate: moment().format("YYYY-MM-DD")
    };
    this._tmpDate = null;
  }
  /** FUNCTIONS */
  _checkStudents = async () => {
    let _studentChoose = await Helpers.getAsyStrStudentChoosed();
    if (_studentChoose) _studentChoose = JSON.parse(_studentChoose);
    this._onFetchStatistics(_studentChoose.id, this.state._currentDate, DATE_TYPE.month)
    this.setState({
      _studentChoose: _studentChoose ? _studentChoose : null,
      _loading: false,
      _loadForList: false
    });
    this._formatDay()
  }

  _onPressChooseStudent = async studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      await Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      this._onFetchStatistics(studentObj.id, moment().format("YYYY-MM-DD"), DATE_TYPE.month);
      this.setState({ _studentChoose: studentObj, _currentDate: moment().format("YYYY-MM-DD") });
    }
  }

  _onBack = () => {
    this.props.navigation.goBack();
  }


  _onFetchStatistics = async (studentId, date, filterType, noFormat) => {
    let { _data, _dataMonth, _dataCalendar } = this.state;
    let resDate, resMonth;
    let params = { studentId };

    if (filterType === DATE_TYPE.month) {
      params.month = moment(date, "YYYY-MM-DD").format("YYYY-MM");
      resMonth = await Services.Attendant.statistics(params, CONFIG.USER_TYPE, filterType);
    }

    params.date = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    resDate = await Services.Attendant.statistics(params, CONFIG.USER_TYPE, DATE_TYPE.date);

    if (resMonth && !resMonth.code) {
      _dataMonth = resMonth;
      _dataCalendar = resMonth.monthlyData;
    }
    if (resDate && !resDate.code) {
      _data = resDate;
      _dataCalendar = resDate.monthlyData;
    }
    this.setState({
      _dataCalendar,
      _data,
      _dataMonth,
      _loading: false,
      _loadForList: false
    });
    if (!noFormat) this._formatDay();
  }

  _formatDay = () => {
    let { _markedDate = {}, _dataCalendar = [] } = this.state;
    let i;
    _markedDate[moment().format('YYYY-MM-DD')] = currentDate;

    for (i = 0; i < _dataCalendar.length; i++) {
      const date = _dataCalendar[i].date;
      /** Absent Day */
      if (_dataCalendar[i].status == 0) _markedDate[date] = absent;
      /** Present Day */
      if (_dataCalendar[i].status == 1) _markedDate[date] = present;
    }
    this.setState({ _markedDate });
  }

  _onDayPress = async (day) => {
    let { _markedDate } = this.state;
    /** Check key is date have existed in _markedDate */
    Object.keys(_markedDate).forEach(key => {
      if (_markedDate[key].key === "selected") delete _markedDate[key];
    });
    /** Check if _tmpDate have value, set value */
    if (this._tmpDate) {
      if (this._tmpDate.key === "absent") {
        _markedDate[this._tmpDate.date] = absent;
      }
      if (this._tmpDate.key === "present") {
        _markedDate[this._tmpDate.date] = present;
      }
      this._tmpDate = null;
    }
    /** Find */
    let find = _markedDate.hasOwnProperty(day.dateString);
    if (!find) _markedDate[day.dateString] = selected;
    else {
      if (_markedDate[day.dateString].key === "currentDate") {
        _markedDate[day.dateString] = selected;
      }
      if (_markedDate[day.dateString].key === "absent") {
        this._tmpDate = { key: "absent", date: day.dateString };
        _markedDate[day.dateString] = selected;
      }
      if (_markedDate[day.dateString].key === "present") {
        this._tmpDate = { key: KEY.businessTrip, date: day.dateString };
        _markedDate[day.dateString] = selected;
      }
    }
    _markedDate[moment().format('YYYY-MM-DD')] = currentDate;
    this.setState({ _markedDate, _currentDate: day.dateString });
    this._onFetchStatistics(this.state._studentChoose.id, day.dateString, "date", true);
  }

  _onPressArrow = (date) => {
    this._onFetchStatistics(this.state._studentChoose.id, date.dateString, DATE_TYPE.month);
    this.setState({ _currentDate: date.dateString });
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkStudents();
  }
  /** RENDER */
  render() {
    return (
      <ViewHistoryParent
        state={this.state}
        props={this.props}
        onFunction={{
          onBack: this._onBack,
          onPressChooseStudent: this._onPressChooseStudent,
          onDayPress: this._onDayPress,
          onPressArrow: this._onPressArrow
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    language: state.language.language,
    setting: state.setting,
  }
}

export default connect(
  mapStateToProps,
  null
)(HistoryParent);

