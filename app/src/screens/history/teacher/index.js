/**
 * @Description: History Teacher Screen
 * @Created by ZiniTeam
 * @Date create: 14/05/2020
 */
/** LIBRARY */
import React, {Component} from 'react';
import {connect} from 'react-redux';
/** COMPONENTS */
import {ViewHistoryTeacher} from './render';
/** SERVICES */
import Services from '../../../services';
/** COMMON */
import Helpers from '../../../helpers';
import {CONFIG} from '../../../config';

class HistoryTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _classChoose: null,
      _dataClasses: props.login.data.classes,
      _data: {
        countTodayPresent: 0,
        countTodayAbsent: 0,
        historyData: [],
      },
    };
  }

  /** FUNCTIONS */
  _checkClasses = async () => {
    /** Check class choosed from storage */
    let _classChoose = await Helpers.getAsyStrClassChoosed();
    if (_classChoose) {
      _classChoose = JSON.parse(_classChoose);
      this._onFetchStatistics(_classChoose.id);
    }
    this.setState({
      _classChoose: _classChoose || null,
    });
  };

  _onFetchStatistics = async classId => {
    let params = {classId};
    let _data = await Services.Attendant.statistics(params, CONFIG.USER_TYPE);

    this.setState({
      _data,
      _loading: false,
      _loadForList: false,
    });
  };

  /** HANDLE FUNCTIONS */
  _onPressChooseClass = async classObj => {
    if (classObj.id !== this.state._classChoose.id) {
      await Helpers.setAsyStrClassChoosed(JSON.stringify(classObj));
      this._onFetchStatistics(classObj.id);
      this.setState({
        _classChoose: classObj,
      });
    }
  };

  _onBack = () => {
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkClasses();
  }

  /** RENDER */
  render() {
    return (
      <ViewHistoryTeacher
        state={this.state}
        onFunction={{
          onPressChooseClass: this._onPressChooseClass,
          onBack: this._onBack,
        }}
      />
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

export default connect(mapStateToProps, null)(HistoryTeacher);
