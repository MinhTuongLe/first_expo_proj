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
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
/** COMPONENT */
import HeaderBar from '../../../partials/header_bar';
import CHealthHistory from '../../components/CHealthHistory';
import CHealthInfomation from '../../components/CHealthInfomation';
import CHeightWeight from '../../components/CHeightWeight';
import CText from '../../../../components/CText';
import HeaderInfoChildren from '../../../partials/header_info_children';
/** COMMON */
import {DEVICE, COLOR} from '../../../../config';
import Services from '../../../../services';
import Helpers from '../../../../helpers';
/** STYLES */
import styles from './../style';
/** REDUX */
import * as loadingActions from '../../../../redux/actions/loading';

class InfoHealthStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isRefresh: false,
      _symptomVal: '',
      _noteVal: '',
      _renderTab: 'H_W',
      _dataStudent: props.route.params?.dataStudent,
      _dataClass: props.route.params?.dataClass,
    };
  }
  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };
  render() {
    let {_isRefresh, _dataStudent, _dataClass, _renderTab} = this.state;
    let {isLoading} = this.props;

    return (
      <View style={[styles.con, {backgroundColor: COLOR.backgroundMain}]}>
        {/* HEADER */}
        <HeaderBar
          title={'txtHealth'}
          hasBack
          onBack={this._onPressBack}
          // onPressNext={() => this._onPressPostHealth(_renderTab)}
          // iconRight={'plus'}
          titleCenter={false}
        />

        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <HeaderInfoChildren
            selectedStudent={_dataStudent}
            dataClass={_dataClass}
          />
        </View>

        {/* CONTENT */}
        {!isLoading && (
          <View
            style={{
              flex: 1,
              backgroundColor: COLOR.backgroundMain,
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            {/* CONTENT */}
            <View
              style={[
                styles.con_tab,
                Platform.OS == 'android' ? {} : {zIndex: 5},
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

            {_renderTab === 'INFO' && (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={_isRefresh}
                    onRefresh={this._onRefresh}
                  />
                }
                keyboardShouldPersistTaps={'handled'}
                scrollIndicatorInsets={{right: 1}}>
                <CHealthInfomation dataStudent={_dataStudent} />
                <CHealthHistory dataStudent={_dataStudent} />
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
                scrollIndicatorInsets={{right: 1}}>
                <CHeightWeight dataStudent={_dataStudent} />
              </ScrollView>
            )}
          </View>
        )}
      </View>
    );
  }

  /**
   * LIFECYCLE
   */
  componentDidMount() {
    this._getDataFromServer();
  }

  /**
   * Functions
   */
  _getDataFromServer = async () => {
    let resp = await Services.Student.getStudent(this.state._dataStudent.id);
    if (resp) {
      this.setState({
        _dataStudent: resp.data,
        _isRefresh: false,
      });
    }

    this.props.loadingActions.setLoading(false);
  };

  _onRefresh = () => {
    this.setState({_isRefresh: true});
    this._getDataFromServer();
  };

  _onTab = slug => this.setState({_renderTab: slug});

  _onPressPostHealth = slug => {
    let {_dataStudent, _dataClass} = this.state;

    if (slug == 'INFO') {
      this.props.navigation.navigate('AddSymptom', {
        dataStudent: _dataStudent,
        dataClass: _dataClass,
        onRefresh: () => this.componentDidMount(),
      });
    }

    if (slug == 'H_W') {
      this.props.navigation.navigate('AddHeightWeight', {
        dataStudent: _dataStudent,
        dataClass: _dataClass,
        onRefresh: () => this.componentDidMount(),
      });
    }
  };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoHealthStudentScreen);
