/**
 * @Description: Post screen
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
/** COMPONENTS **/
import ViewProfile from './render';
/** COMMON **/
import {CONFIG, DEVICE, KEY, LANG} from '../../config';
/** REDUX */
import * as loginActions from '../../redux/actions/login';
import * as notificationActions from '../../redux/actions/notification';
import Helpers from '../../helpers';
import CText from '../../components/CText';

/** DECLARE CLASS */
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _showUploadImage: false,
      _showLogOut: false,
      _error: false,
      _success: false,
      _isActive: 'info', // "info" or "changePassword" or "family"
      _txtOldPass: '',
      _txtNewPass: '',
      _txtReNewPass: '',
      _errorText: 'txtProfileRequireInput',
      _successText: 'txtChangeInfoSuccess',
      _infoProfile: [
        [
          {
            icon: 'user',
            ref: 'lastName',
            placeholder: LANG[CONFIG.lang].txtLastName,
            onSubmitEditing: () => this._onSubmitEditing('firstName'),
            afterChangeText: text => this.setState({_txtLastName: text}),
            returnKeyType: 'next',
            value: this.props.login.data.lastName,
            autoCorrect: false,
            keyboardType: 'default',
          },
          {
            icon: 'user',
            ref: 'firstName',
            placeholder: LANG[CONFIG.lang].txtFirstName,
            onSubmitEditing: () => this._onSubmitEditing('phone'),
            afterChangeText: text => this.setState({_txtFirstName: text}),
            returnKeyType: 'next',
            value: this.props.login.data.firstName,
            autoCorrect: false,
            keyboardType: 'default',
          },
        ],
        {
          icon: 'phone-alt',
          ref: 'phone',
          placeholder: LANG[CONFIG.lang].txtPhone,
          onSubmitEditing: () => this._onSubmitEditing('email'),
          afterChangeText: text => this.setState({_txtPhone: text}),
          returnKeyType: 'next',
          value: this.props.login.data.phone,
          autoCorrect: false,
          keyboardType: 'numeric',
        },
        {
          icon: 'envelope',
          ref: 'email',
          placeholder: LANG[CONFIG.lang].txtEmail,
          onSubmitEditing: () => this._onSubmitEditing('address'),
          afterChangeText: text => this.setState({_txtEmail: text}),
          returnKeyType: 'next',
          value: this.props.login.data.emailAddress,
          autoCorrect: false,
          keyboardType: 'email-address',
        },
        {
          icon: 'map-marker-alt',
          ref: 'address',
          placeholder: LANG[CONFIG.lang].txtAddress,
          onSubmitEditing: () => this._onSubmitEditing('done'),
          afterChangeText: text => this.setState({_txtAddr: text}),
          value:
            CONFIG.USER_TYPE == KEY.PARENT
              ? this.props.login.data.currentAddress
              : this.props.login.data.address,
          returnKeyType: 'done',
          autoCorrect: false,
          keyboardType: 'default',
        },
      ],
      _isAllowNotification: props.login.data.allowNotification,
      _dataAvatar: props.login.data ? props.login.data.avatar : '',
      _dataUser: props.login.data || null,
      _txtFirstName: props.login.data.firstName,
      _txtLastName: props.login.data.lastName,
      _txtPhone: props.login.data.phone,
      _txtEmail: props.login.data.emailAddress,
      _txtAddr:
        CONFIG.USER_TYPE == KEY.PARENT
          ? props.login.data.currentAddress
          : props.login.data.address,
    };
    this._infoPassword = [
      {
        ref: 'oldPass',
        placeholder: LANG[CONFIG.lang].txtOldPass,
        onSubmitEditing: () => this._onSubmitEditing('newPass'),
        afterChangeText: text => this.setState({_txtOldPass: text}),
        returnKeyType: 'next',
        secureTextEntry: true,
        value: this.state._txtOldPass,
      },
      {
        ref: 'newPass',
        placeholder: LANG[CONFIG.lang].txtNewPass,
        onSubmitEditing: () => this._onSubmitEditing('reNewPass'),
        afterChangeText: text => this.setState({_txtNewPass: text}),
        returnKeyType: 'next',
        secureTextEntry: true,
        value: this.state._txtNewPass,
      },
      {
        ref: 'reNewPass',
        placeholder: LANG[CONFIG.lang].txtReNewPass,
        afterChangeText: text => this.setState({_txtReNewPass: text}),
        returnKeyType: 'done',
        secureTextEntry: true,
        value: this.state._txtReNewPass,
      },
    ];
  }

  /** FUNCTIONS */
  _changeAvatar = () => {
    this.setState({_showUploadImage: true});
  };

  _closeModal = () => {
    this.setState({
      _showUploadImage: false,
      _showLogOut: false,
    });
  };

  _receiveImage = dataImage => {
    if (dataImage) {
      this.setState({_showUploadImage: false, _loading: true});
      let params = {
        userType: CONFIG.USER_TYPE,
        typeChange: 'Avatar',
        uri: dataImage.path,
        idUser: this.state._dataUser.id,
        schoolId: this.props.login.data.school,
      };
      this.props.loginActions.fetchChangeInfo(params);
    } else {
      this.setState({_showUploadImage: false});
    }
  };

  _onSubmitEditing = ref => {
    if (ref !== 'done') {
      this.refs.ViewProfile.refs[ref].focus;
    }
  };

  _handlerChangeInfo = () => {
    let {
      _txtFirstName,
      _txtLastName,
      _txtPhone,
      _txtEmail,
      _isAllowNotification,
      _txtAddr,
    } = this.state;
    let {login, loginActions} = this.props;
    Keyboard.dismiss();

    if (
      _txtFirstName === '' ||
      _txtLastName === '' ||
      _txtPhone === '' ||
      _txtEmail === ''
    ) {
      return this.setState({
        _error: true,
        _success: false,
        _errorText: 'txtInputErrNotFill',
      });
    }

    /** CHECK VALID PHONE | EMAIL */
    if (!Helpers.validatePhone(_txtPhone)) {
      this.setState({
        _error: true,
        _errorText: 'txtPhoneErrFormat',
        _success: false,
      });
    } else if (!Helpers.validateEmail(_txtEmail)) {
      this.setState({
        _error: true,
        _errorText: 'txtEmailErrFormat',
        _success: false,
      });
    } else {
      this.setState({
        _loading: true,
        _error: false,
        _success: false,
        _errorText: '',
      });

      let params = {
        userType: CONFIG.USER_TYPE,
        typeChange: 'info',
        id: login.data.id,
        allowNotification: _isAllowNotification,
        firstName: _txtFirstName,
        lastName: _txtLastName,
        phone: _txtPhone,
        email: _txtEmail,
        address: _txtAddr,
        school: login.data.school,
        username: login.data.userName || _txtEmail,
      };
      loginActions.fetchChangeInfo(params);
    }
  };

  _handlerChangePass = () => {
    let {_txtOldPass, _txtNewPass, _txtReNewPass} = this.state;
    let {login, loginActions} = this.props;
    Keyboard.dismiss();

    if (_txtOldPass !== '' && _txtNewPass !== '' && _txtReNewPass !== '') {
      if (_txtOldPass !== _txtNewPass) {
        if (_txtNewPass === _txtReNewPass) {
          this.setState({
            _loading: true,
            _error: false,
            _success: false,
            _errorText: '',
          });

          let params = {
            typeChange: 'password',
            email: login.data.emailAddress,
            passwordNow: _txtOldPass,
            passwordNew: _txtNewPass,
            school: login.data.school,
          };
          loginActions.fetchChangeInfo(params);
        } else {
          this.setState({
            _error: true,
            _success: false,
            _errorText: 'txtProfileRePasswordNotMatch',
          });
        }
      } else {
        this.setState({
          _error: true,
          _success: false,
          _errorText: 'txtProfileNewPassNotMatch',
        });
      }
    } else {
      this.setState({
        _error: true,
        _success: false,
        _errorText: 'txtProfileInput',
      });
    }
  };

  _handlerLogout = () => {
    this.setState({_showLogOut: true});
  };

  _setDataStorage = async () => {
    let reLoginWith = {
      userName:
        this.props.login.data.emailAddress !== '' &&
        this.props.login.data.emailAddress !== null
          ? this.props.login.data.emailAddress
          : this.props.login.data.phone,
      type: CONFIG.USER_TYPE,
    };

    await AsyncStorage.setItem('reLoginWith', JSON.stringify(reLoginWith));

    setTimeout(() => {
      this.setState({
        _success: false,
        _loading: false,
      });
    }, 2000);
  };

  _onRefresh = () => {
    this.setState({_loading: false});
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  _onPressItemTab = idTab => {
    this.setState({
      _error: false,
      _success: false,
      _errorText: '',
      _txtOldPass: '',
      _txtNewPass: '',
      _txtReNewPass: '',
      _isActive: idTab,
    });
  };

  _onToggleGetNoti = () => {
    this.setState({_isAllowNotification: !this.state._isAllowNotification});
  };

  _onPressHeaderRight = () => {
    this.props.navigation.navigate('Setting', {
      dataUser: this.props.login.data,
      onRefresh: () => this._onRefresh(),
    });
  };

  /** LIFE CYCLE */
  componentDidMount() {
    if (this.props.login.data) {
      this.setState({
        _dataUser: this.props.login.data,
        _dataAvatar: this.props.login.data.avatar,
        _success: false,
        _loading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState._dataAvatar !== this.props.login.data.avatar) {
      this.setState({
        _dataAvatar: this.props.login.data.avatar,
        _error: false,
        _success: true,
        _loading: false,
      });
    }
    if (this.state._loading) {
      if (!this.props.login.data.isFetch) {
        if (
          this.props.login.messageEdit !== '' &&
          this.props.login.messageEdit !== 'success'
        ) {
          this.setState({
            _error: true,
            _success: false,
            _loading: false,
            _errorText: this.props.login.messageEdit,
          });
        } else if (
          this.props.login.messageEdit !== '' &&
          this.props.login.messageEdit === 'success'
        ) {
          if (
            this.refs.ViewProfile.refs.oldPass &&
            this.refs.ViewProfile.refs.newPass &&
            this.refs.ViewProfile.refs.reNewPass
          ) {
            this.refs.ViewProfile.refs.oldPass.clear;
            this.refs.ViewProfile.refs.newPass.clear;
            this.refs.ViewProfile.refs.reNewPass.clear;
          }
          this._setDataStorage();
          this.setState({
            _dataAvatar: this.props.login.data.avatar,
            _dataUser: this.props.login.data,
            _error: false,
            _success: true,
            _loading: false,
            _txtOldPass: '',
            _txtNewPass: '',
            _txtReNewPass: '',
            _infoProfile: [
              [
                {
                  icon: 'user',
                  ref: 'lastName',
                  placeholder:
                    this.props.language === 'vi' ? 'Tên' : 'Last Name',
                  onSubmitEditing: () => this._onSubmitEditing('firstName'),
                  afterChangeText: text => this.setState({_txtLastName: text}),
                  returnKeyType: 'next',
                  value: this.props.login.data.lastName,
                  autoCorrect: false,
                  keyboardType: 'default',
                },
                {
                  icon: 'user',
                  ref: 'firstName',
                  placeholder:
                    this.props.language === 'vi' ? 'Họ Chữ lót' : 'First Name',
                  onSubmitEditing: () => this._onSubmitEditing('phone'),
                  afterChangeText: text => this.setState({_txtFirstName: text}),
                  returnKeyType: 'next',
                  value: this.props.login.data.firstName,
                  autoCorrect: false,
                  keyboardType: 'default',
                },
              ],
              {
                icon: 'phone-alt',
                ref: 'phone',
                placeholder:
                  this.props.language === 'vi' ? 'Số điện thoại' : 'Phone',
                onSubmitEditing: () => this._onSubmitEditing('email'),
                afterChangeText: text => this.setState({_txtPhone: text}),
                returnKeyType: 'next',
                value: this.props.login.data.phone,
                autoCorrect: false,
                keyboardType: 'numeric',
              },
              {
                icon: 'envelope',
                ref: 'email',
                placeholder: 'E-mail',
                onSubmitEditing: () => this._onSubmitEditing('address'),
                afterChangeText: text => this.setState({_txtEmail: text}),
                returnKeyType: 'next',
                value: this.props.login.data.emailAddress,
                autoCorrect: false,
                keyboardType: 'email-address',
              },
              {
                icon: 'map-marker-alt',
                ref: 'address',
                placeholder:
                  this.props.language === 'vi' ? 'Địa chỉ' : 'Address',
                onSubmitEditing: () => this._onSubmitEditing('done'),
                afterChangeText: text => this.setState({_txtAddr: text}),
                value:
                  CONFIG.USER_TYPE == KEY.PARENT
                    ? this.props.login.data.currentAddress
                    : this.props.login.data.address,
                returnKeyType: 'done',
                autoCorrect: false,
                keyboardType: 'default',
              },
            ],
          });
        }
      }
    }
  }

  /** RENDER */
  render() {
    let {
      _loading,
      _isAllowNotification,
      _dataAvatar,
      _dataUser,
      _showUploadImage,
      _showLogOut,
      _isActive,
      _error,
      _errorText,
      _success,
      _successText,
      _infoProfile,
    } = this.state;
    let {navigation} = this.props;

    return (
      <ViewProfile
        ref={'ViewProfile'}
        loading={_loading}
        error={_error}
        errorText={_errorText}
        success={_success}
        successText={_successText}
        isActive={_isActive}
        isAllowNotification={_isAllowNotification}
        showUploadImage={_showUploadImage}
        showLogOut={_showLogOut}
        navigation={navigation}
        avatar={_dataAvatar}
        dataUser={_dataUser}
        infoProfile={_infoProfile}
        infoPassword={this._infoPassword}
        loginActions={this.props.loginActions}
        notificationActions={this.props.notificationActions}
        onPressBack={this._onPressBack}
        handlerLogout={this._handlerLogout}
        onPressItemTab={this._onPressItemTab}
        onPressHeaderRight={this._onPressHeaderRight}
        onToggleGetNoti={this._onToggleGetNoti}
        changeAvatar={this._changeAvatar}
        closeModal={this._closeModal}
        handlerChangeInfo={this._handlerChangeInfo}
        handlerChangePass={this._handlerChangePass}
        receiveImage={this._receiveImage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    language: state.language.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
