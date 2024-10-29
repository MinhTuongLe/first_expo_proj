/**
 * @Description: Health Screen Logic
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENT */
import HeaderBar from '../../partials/header_bar';
import HeaderInfoChildren from '../../partials/header_info_children';
import CHealthInfomation from '../components/CHealthInfomation';
import CHeightWeight from '../components/CHeightWeight';
import CHealthHistory from '../components/CHealthHistory';
import CText from '../../../components/CText';
/** COMMON */
import {DEVICE, COLOR, CONFIG} from '../../../config';
import Helpers from '../../../helpers';
import Services from '../../../services';
/** STYLES */
import styles from './style';
/** REDUX */
import * as loginActions from '../../../redux/actions/login';

class ParentHealthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadForList: true,
      _isRefresh: false,
      _renderTab: 'H_W', // INFO or H_W
      _dataStudents: props.login.data.students,
      _dataClasses: props.login.data.classes,
      _studentChoose: null,
      _classChoose: null,
    };
  }

  /** FUNCTIONS */
  _checkStudents = async () => {
    let _studentChoose = await Helpers.getAsyStrStudentChoosed();
    let find;
    if (_studentChoose) _studentChoose = JSON.parse(_studentChoose);
    _studentChoose = await this._getDataStudent(_studentChoose.id);
    if (_studentChoose) {
      for (let classObj of this.state._dataClasses) {
        find = classObj.students.find(f => f.id == _studentChoose.id);
        if (find) {
          find = classObj;
          let newAvatar = CONFIG.classes.find(f => f.id === find.thumbnail);
          if (newAvatar) find.newAvatar = newAvatar.path;
          break;
        }
      }
    }

    this.setState({
      _studentChoose: _studentChoose ? _studentChoose : null,
      _classChoose: find ? find : null,
      _loading: false,
      _loadForList: false,
    });
  };

  _onRefresh = async () => {
    this.setState({_isRefresh: true});
    let data = await this._getDataStudent(this.state._studentChoose.id);
    this.setState({
      _studentChoose: data,
      _isRefresh: false,
    });
  };

  _getDataStudent = async id => {
    let res = await Services.Student.getStudent(id);
    if (res && res.code == 'SUCCESS_200') {
      return res.data;
    } else {
      return null;
    }
  };

  _onTab = slug => {
    this.setState({_renderTab: slug});
  };

  _onPressChooseStudent = async studentObj => {
    if (studentObj.id !== this.state._studentChoose.id) {
      await Helpers.setAsyStrStudentChoosed(JSON.stringify(studentObj));
      this.setState({_studentChoose: studentObj});
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

  /** RENDER */
  render() {
    let {_loading, _isRefresh, _renderTab, _studentChoose, _classChoose} =
      this.state;

    return (
      <View style={[styles.con, {backgroundColor: COLOR.backgroundMain}]}>
        {/* HEADER */}
        <HeaderBar
          title={'txtHealthTitle'}
          hasBack
          onBack={this._onPressBack}
          titleCenter={false}
        />

        {!_loading && (
          <View style={[DEVICE.gStyle.container, {paddingHorizontal: 10}]}>
            <View
              style={{
                marginVertical: 10,
              }}>
              <HeaderInfoChildren
                selectedStudent={_studentChoose}
                dataClass={_classChoose}
              />
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={[
                  styles.con_tab,
                  Platform.OS == 'android' ? {} : {zIndex: 5, marginBottom: 10},
                ]}>
                {/* TAB HEIGHT/WEIGHT */}
                <TouchableOpacity
                  style={styles.con_tab_global}
                  onPress={() => this._onTab('H_W')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        _renderTab === 'H_W'
                          ? COLOR.primaryApp
                          : COLOR.backgroundSec,
                      borderRadius: 10,
                      width: '100%',
                      height: '100%',
                    }}>
                    <Icon
                      name={'child'}
                      size={Helpers.fS(25)}
                      color={_renderTab === 'H_W' ? '#ffffff' : COLOR.txtColor}
                      type={'light'}
                    />
                    <CText
                      style={[
                        styles.txt_title,
                        _renderTab === 'H_W'
                          ? {
                              color: '#ffffff',
                              fontFamily: DEVICE.fontBold,
                            }
                          : {color: COLOR.txtColor},
                        ,
                      ]}
                      i18nKey={'txtWH'}
                    />
                  </View>
                </TouchableOpacity>

                {/* TAB INFOMATION */}
                <TouchableOpacity
                  style={styles.con_tab_global}
                  onPress={() => this._onTab('INFO')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        _renderTab === 'INFO'
                          ? COLOR.primaryApp
                          : COLOR.backgroundSec,
                      borderRadius: 10,
                      width: '100%',
                      height: '100%',
                    }}>
                    <Icon
                      name={'clipboard-list'}
                      size={Helpers.fS(25)}
                      color={_renderTab === 'INFO' ? '#ffffff' : COLOR.txtColor}
                      type={'light'}
                    />
                    <CText
                      style={[
                        styles.txt_title,
                        _renderTab === 'INFO'
                          ? {
                              color: '#ffffff',
                              fontFamily: DEVICE.fontBold,
                            }
                          : {color: COLOR.txtColor},
                        ,
                      ]}
                      i18nKey={'txtInfo'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {_renderTab === 'INFO' && (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={_isRefresh}
                    onRefresh={this._onRefresh}
                  />
                }
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <CHealthInfomation dataStudent={_studentChoose} />
                <CHealthHistory dataStudent={_studentChoose} />
              </ScrollView>
            )}

            {_renderTab === 'H_W' && (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={_isRefresh}
                    onRefresh={this._onRefresh}
                  />
                }
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <CHeightWeight dataStudent={_studentChoose} />
              </ScrollView>
            )}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentHealthScreen);
