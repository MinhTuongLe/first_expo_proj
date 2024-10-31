/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENT */
import HeaderBar from '../../../partials/header_bar';
import HeaderInfoChildren from '../../../partials/header_info_children';
import CCalendar from '../../../../components/CCalendar/calendar';
import CButton from '../../../../components/CButton';
import CText from '../../../../components/CText';
/** COMMON */
import {LANG, CONFIG, DEVICE} from '../../../../config';
import Services from '../../../../services';
import Helpers from '../../../../helpers';
import * as loadingActions from '../../../../redux/actions/loading';
/** STYLES */
import styles from '../style';

class AddSymptomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isShowFCalendar: false,

      _symptomVal: '',
      _noteVal: '',
      _dataDay: moment().format('YYYY-MM-DD'),
      _dataStudent: props.route.params.dataStudent ?? null,
      _dataClass: props.route.params.dataClass ?? null,
    };
  }

  render() {
    let {_isShowFCalendar, _dataDay, _dataStudent, _dataClass} = this.state;
    let dayFormat = moment(_dataDay, 'YYYY-MM-DD').format('DD/MM/YYYY');
    let gender = CONFIG.students.find(f => f.id === _dataStudent.gender);
    if (gender) {
      gender = gender.path;
    } else {
      gender = CONFIG.students[0].path;
    }

    return (
      <View style={styles.con}>
        {/* HEADER */}
        <HeaderBar title={'addInfo'} hasBack />

        <KeyboardAvoidingView
          style={DEVICE.gStyle.container}
          behavior={'padding'}
          enabled
          keyboardVerticalOffset={Platform.select({
            ios: Helpers.isIphoneX() ? 15 : 0,
            android: -500,
          })}>
          <View style={DEVICE.gStyle.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <HeaderInfoChildren
                selectedStudent={_dataStudent}
                dataClass={_dataClass}
              />

              <View style={styles.listStudentContent}>
                <TouchableOpacity
                  style={styles.dayChoose}
                  onPress={this._onPressDayChoose}>
                  <View style={styles.dayChooseLeft}>
                    <Icon
                      containerStyle={{marginRight: 10}}
                      name={'calendar-alt'}
                      size={Helpers.fS(20)}
                      color={'black'}
                      type={'light'}
                    />
                    <CText style={styles.txtNameStudent} i18nKey={'date'} />
                  </View>
                  <Text style={styles.txtNameStudent}>{dayFormat}</Text>
                </TouchableOpacity>

                {_isShowFCalendar && (
                  <CCalendar
                    theme={{
                      textDayFontFamily: DEVICE.fontRegular,
                      textMonthFontFamily: DEVICE.fontBold,
                      textDayHeaderFontFamily: DEVICE.fontMedium,
                    }}
                    minDate={'2010-01-01'}
                    maxDate={'2030-01-01'}
                    monthFormat={'MMMM - yyyy'}
                    onPressArrowLeft={substractMonth => substractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    onDayPress={day => this._onPressDay(day)}
                  />
                )}
                <TextInput
                  style={styles.areaInput}
                  placeholder={LANG[CONFIG.lang].symptom + '...'}
                  textAlignVertical={'top'}
                  multiline={true}
                  onChangeText={text => this.setState({_symptomVal: text})}
                  value={this.state._symptomVal}
                  maxLength={100}
                  autoFocus={true}
                />
                <TextInput
                  style={[styles.areaInput, {marginBottom: 10}]}
                  placeholder={LANG[CONFIG.lang].notes + '...'}
                  textAlignVertical={'top'}
                  multiline={true}
                  onChangeText={text => this.setState({_noteVal: text})}
                  value={this.state._noteVal}
                  maxLength={150}
                />
              </View>
            </ScrollView>

            <View
              style={{
                paddingHorizontal: 10,
                marginBottom: 10,
                width: '100%',
              }}>
              <CButton
                style={styles.submit_group_submit}
                onPress={this._onPressUpdateSymptom}>
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
    this._checkSymptom();
  }

  /**
   * FUNCTION
   */
  _checkSymptom = () => {
    let i,
      dayNow = moment().format('YYYY-MM-DD'),
      {_dataStudent} = this.state;

    if (_dataStudent) {
      for (i = 0; i < _dataStudent.healthHistory.length; i++) {
        if (_dataStudent.healthHistory[i].date == dayNow) {
          this.setState({
            _symptomVal: _dataStudent.healthHistory[i].symptom,
            _noteVal: _dataStudent.healthHistory[i].note,
          });
          break;
        }
      }
    }
  };

  _onPressDayChoose = () => {
    let {_isShowFCalendar} = this.state;

    this.setState({
      _isShowFCalendar: !_isShowFCalendar,
    });
  };

  _onPressDay = day => {
    let {_isShowFCalendar} = this.state;
    this.setState({
      _isShowFCalendar: !_isShowFCalendar,
      _dataDay: day.dateString,
    });
  };

  _onPressUpdateSymptom = () => {
    if (this.state._symptomVal == '') {
      return Helpers.toast(LANG[CONFIG.lang].txtInputErrNotFill);
    }

    this._updateSymptom();
  };

  _updateSymptom = async () => {
    Keyboard.dismiss();
    this.props.loadingActions.setLoading(true);

    let params = {
      symptom: this.state._symptomVal,
      note: this.state._noteVal,
      idStudent: this.state._dataStudent.id,
      date: this.state._dataDay,
    };

    let resp = await Services.Health.updateHealthHistory(params);
    let txtStatus = '';
    if (resp) {
      if (resp.code == 'SUCCESS_200') {
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

  _onPressClose = () => this.setState({_isShowAlert: false});
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSymptomScreen);
