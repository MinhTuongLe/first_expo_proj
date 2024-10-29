/* eslint-disable prettier/prettier */
/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React, {Component} from 'react';
import {connect} from 'react-redux';
/** COMPONENT */
import {ViewHistoryAttendance} from './render';
/** COMMON */
import Services from '../../../services';

class HistoryAttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _historyDetail: {},
      _selectedStudent: {},
    };
    this._dataClass = props.route.params.dataClass ?? {id: ''};
    this._date = props.route.params.date ?? '';
    this._studentId = props.route.params.studentId ?? '';
    this.settingSteps = props.setting.config.value.allowShuttleBus
      ? props.setting.config.value.allowShuttleBus
      : false;
  }

  /** FUNCTIONS */
  _historyGet = async () => {
    let {_historyDetail, _selectedStudent} = this.state,
      params = {
        studentId: this._studentId,
        date: this._date,
      };
    let resHistory = await Services.Attendant.classDiaryGet(params);

    if (resHistory && !resHistory.code) {
      _historyDetail = resHistory.attendance;
      _selectedStudent = resHistory.attendance.student;
    }

    this.setState({
      _historyDetail,
      _selectedStudent,
      _loading: false,
    });
  };

  /** HANDLE FUNCTIONS */
  _onBack = () => {
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._historyGet();
  }

  /** RENDER */
  render() {
    return (
      <ViewHistoryAttendance
        state={this.state}
        data={{
          class: this._dataClass,
          allowBus: this.settingSteps,
        }}
        onFunction={{
          onBack: this._onBack,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(HistoryAttendanceScreen);
