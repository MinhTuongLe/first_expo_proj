/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
/** COMPONENTS */
import {ViewHistoryAttendance} from '../attendance/history/render';
import HeaderBar from '../partials/header_bar';
import CCalendar from '../../components/CCalendar/agenda';
import CText from '../../components/CText';
import CLoading from '../../components/CLoading';
/** COMMON */
import Helpers from '../../helpers';
import {DEVICE, COLOR, CONFIG, KEY} from '../../config';
import Errors from '../../config/errors';
import Services from '../../services';
/** STYLES */
import styles from './styles';

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _selectedStudent: null,
      _selectedDate: null,
      _dataRender: null,
      _historyDetail: null,
    };
    this.settingSteps = props.setting.config.value.allowShuttleBus
      ? props.setting.config.value.allowShuttleBus
      : false;
    this._dataStudents = props.login.data.students;
  }

  /** FUNCTIONS */
  _checkStudents = async () => {
    let _selectedStudent = await Helpers.getAsyStrStudentChoosed();
    if (_selectedStudent) {
      _selectedStudent = JSON.parse(_selectedStudent);
    }
    this.setState({_selectedStudent, _loadForList: false, _loading: false});
  };

  _historyGet = async date => {
    let {_selectedStudent, _historyDetail} = this.state,
      params = {
        studentId: _selectedStudent.id,
        date: date.dateString,
      };
    let _tmpDataRender = {};
    _tmpDataRender[date.dateString] = [];

    let resHistory = await Services.Attendant.classDiaryGet(params);
    if (resHistory && !resHistory.code) {
      _tmpDataRender[date.dateString].push(resHistory.attendance);
      _historyDetail = resHistory.attendance;
    }
    this.setState({
      _dataRender: _tmpDataRender,
      _selectedDate: date,
      _historyDetail,
    });
  };

  _rowHasChanged = (r1, r2) => {
    return r1.updatedAt !== r2.updatedAt;
  };

  /** HANDLE FUNCTIONS */
  _onBack = () => {
    this.props.navigation.goBack();
  };

  _onChooseStudent = studentObj => {
    if (studentObj.id !== this.state._selectedStudent.id) {
      Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      this.setState({_dataRender: null, _selectedStudent: studentObj});
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._checkStudents();
  }

  /** OTHER RENDER */
  _renderEmptyStudent = () => {
    return (
      <View
        style={[
          DEVICE.gStyle.full_center,
          {
            marginTop: (DEVICE.width * 1) / 3,
            backgroundColor: COLOR.backgroundMain,
          },
        ]}>
        <Icon
          name={'search'}
          size={Helpers.fS(50)}
          color={COLOR.placeholderTextColor}
          type={'light'}
        />
        <CText style={styles.txt_no_data} i18nKey={'txtNoDataAttendance'} />
      </View>
    );
  };

  /** RENDER */
  render() {
    const {_loading, _loadForList, _selectedStudent, _dataRender} = this.state;

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar
          title={'tracking'}
          hasBack
          onBack={this._onPressBack}
          hasCustomHeaderRight={true}
          loadCustomHeaderRight={_loadForList}
          dataCustomHeaderRight={this._dataStudents}
          dataChooseCustomHeaderRight={_selectedStudent}
          onCustomHeaderRight={this._onChooseStudent}
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
            minDate={'2015-01-01'}
            maxDate={moment().format('YYYY-MM-DD')}
            monthFormat={'MMMM - yyyy'}
            items={_dataRender}
            loadItemsForMonth={day => this._historyGet(day)}
            renderItem={item => {
              let newAvatar = _selectedStudent.class.newAvatar || null;
              newAvatar = CONFIG.classes.find(
                f => f.id === _selectedStudent.class.thumbnail,
              );
              if (newAvatar) {
                _selectedStudent.class.newAvatar = newAvatar.path;
              }

              return (
                <ViewHistoryAttendance
                  state={this.state}
                  data={{
                    class: _selectedStudent.class,
                    allowBus: this.settingSteps,
                  }}
                  onFunction={{
                    onBack: this._onBack,
                  }}
                />
              );
            }}
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
            renderFooterContent={() => null}
            renderHeaderContent={() => <View style={styles.mt_20} />}
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

const mapStateToProps = state => {
  return {
    login: state.login,
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(Tracking);
