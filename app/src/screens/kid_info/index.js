/**
 * @Description: Kid Info Screen Logic
 * @Created by ZiniTeam
 * @Date create: 18/11/2019
 */
/** LIBRARY */
import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
/** COMPONENT */
import { ViewKidInfomation } from './render';
/** COMMON */
import { CONFIG } from '../../config';
import Services from '../../services';
import Errors from '../../config/errors';
/** REDUX */
import * as loginActions from '../../redux/actions/login';

class KidInfomation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadingSubmit: false,
      _error: false,
      _success: false,
      _showChooseDate: false,
      _showUploadImage: false,
      _successText: '',
      _errorText: '',
      _avatar: {
        uri: CONFIG.host + props.route.params.avatar ?? ''
      },
      _gender: props.route.params.gender ?? 'Male',
      _dateOfBirth: props.route.params.dateOfBirth,
      _firstName: props.route.params.firstName ?? '-',
      _lastName: props.route.params.lastName ?? '-',
      _currentAddress: props.route.params.currentAddress ?? '-',
      _dataStudent: props.route.params.dataStudent
    }
    this._infoStudent = [
      {
        icon: 'user',
        ref1: this.lastNameRef,
        ref2: this.firstNameRef,
        value1: props.route.params.lastName ?? '-',
        value2: props.route.params.firstName ?? '-',
        placeholder1: this.props.language === 'vi' ? 'Tên' : 'Last Name',
        placeholder2: this.props.language === 'vi' ? 'Họ Chữ lót' : 'First Name',
        onSubmitEditing1: (ref) => this._onSubmitEditing(ref, 'TextInput'),
        onSubmitEditing2: (ref) => null,
        afterChangeText1: (text) => this._onEndChangeText(text, 'lastName'),
        afterChangeText2: (text) => this._onEndChangeText(text, 'firstName'),
        returnKeyType1: 'next',
        returnKeyType2: 'done',
        keyboardType: 'default',
        fieldType: 'TextInput',
        isEditName: true
      },
      {
        icon: 'venus-mars',
        ref: this.genderRef,
        data: ['Male', 'Female'],
        value: props.route.params.gender ?? 'Male',
        placeholder: this.props.language === 'vi' ? 'Giới tính' : 'Gender',
        returnKeyType: 'next',
        onSubmitEditing: () => this._onSubmitEditing('dateOfBirth', 'DropDown'),
        onItem: gender => this._onPressItemGender(gender),
        fieldType: 'DropDown'
      },
      {
        icon: 'birthday-cake',
        ref: this.dobRef,
        onSubmitEditing: () => this._onSubmitEditing('address', 'Date'),
        returnKeyType: 'next',
        fieldType: 'Date'
      },
      {
        icon: 'map-marker-alt',
        addressRef: this.addressRef,
        value: props.route.params.currentAddress ?? '-',
        placeholder: this.props.language === 'vi' ? 'Địa chỉ' : 'Address',
        onSubmitEditing: () => this._onSubmitEditing('done', 'TextInput'),
        afterChangeText: (text) => this._onEndChangeText(text, 'currentAddress'),
        returnKeyType: 'done',
        keyboardType: 'default',
        fieldType: 'TextInput'
      },
    ]
  }

  /** FUNCTIONS */
  _changeAvatar = () => {
    this.setState({ _showUploadImage: true });
  }

  _onPressToggleDateChange = () => {
    this.setState({ _showChooseDate: !this.state._showChooseDate });
  }

  _onPressItemGender = gender => {
    let tmp = gender === 'Female' ? 0 : 1;
    this.setState({ _gender: tmp });
  }

  _onPressDate = (event, date) => {
    let _showChooseDate = Platform.OS !== 'android';
    if (date) {
      this.setState({
        _dateOfBirth: date,
        _showChooseDate
      })
    }
  }

  _onSubmitEditing = (ref, typeField) => {
    if (ref !== 'done') {
      if (typeField === 'TextInput') {
        ref.focus;
      }
    }
  }

  _onPressChangeAvatar = () => {
    this.setState({ _showUploadImage: true });
  }

  _onAvatarError = () => {
    let gender = CONFIG.students[0].path;
    let { _dataStudent } = this.state;
    if (_dataStudent) {
      gender = CONFIG.students.find(f => f.id === _dataStudent.gender);
      if (gender) gender = gender.path;
    }
    this.setState({ _avatar: gender });
  }

  _onReceiveImage = dataImage => {
    if (dataImage) {
      this.setState({ _showUploadImage: false, _loading: true });
      let params = {
        userType: CONFIG.USER_TYPE,
        typeChange: 'AvatarStudent',
        uri: dataImage.path,
        idStudent: this.state._dataStudent.id,
        dataParent: this.props.login.data
      }
      this.props.loginActions.fetchChangeInfo(params);
    } else this.setState({ _showUploadImage: false });
  }

  _onCloseModal = () => {
    this.setState({ _showUploadImage: false });
  }

  _onEndChangeText = (text, key) => {
    if (key === 'lastName') this.setState({ _lastName: text })
    else if (key === 'firstName') this.setState({ _firstName: text })
    else this.setState({ _currentAddress: text })
  }

  _onPressSubmit = () => {
    this.setState({
      _success: false,
      _error: false,
      _successText: '',
      _errorText: ''
    })
    let { _dataStudent, _firstName, _lastName, _dateOfBirth, _gender, _currentAddress } = this.state;
    if (_firstName === '' || _lastName === '') {
      return this.setState({
        _error: true,
        _successText: '',
        _errorText: 'lastFirstNameNotEmpty'
      })
    }

    let params = {
      id: _dataStudent.id,
      firstName: _firstName.trim(),
      lastName: _lastName.trim(),
      dateOfBirth: moment(_dateOfBirth).format('YYYY-MM-DD'),
      gender: _gender,
      currentAddress: _currentAddress.trim()
    }
    this.setState({ _loadingSubmit: true });
    this._onSubmit(params);
  }

  _error = slug => {
    this.setState({
      _loadingSubmit: false,
      _success: false,
      _error: true,
      _successText: '',
      _errorText: slug
    })
  }
  _onSubmit = async params => {
    let res = await Services.Student.edit(params);
    if (res) {
      if (res.code === Errors.STUDENT_ERR_ID_REQUIRED.code)
        return this._error(Errors.STUDENT_ERR_ID_REQUIRED.message);
      else if (res.code === Errors.STUDENT_ERR_FIRSTNAME_REQUIRED.code)
        return this._error(Errors.STUDENT_ERR_FIRSTNAME_REQUIRED.message);
      else if (res.code === Errors.STUDENT_ERR_LASTNAME_REQUIRED.code)
        return this._error(Errors.STUDENT_ERR_LASTNAME_REQUIRED.message);
      else if (res.code === Errors.STUDENT_ERR_BIRTHDAY_REQUIRED.code)
        return this._error(Errors.STUDENT_ERR_BIRTHDAY_REQUIRED.message);
      else if (res.code === Errors.STUDENT_ERR_GENDER_REQUIRED.code)
        return this._error(Errors.STUDENT_ERR_GENDER_REQUIRED.message);
      else if (res.code === Errors.STUDENT_ERR_NOT_FOUND.code)
        return this._error(Errors.STUDENT_ERR_NOT_FOUND.message);
      else {
        /* Update info student to redux */
        let { login } = this.props;
        let idStudent = login.data.students.findIndex(f => f.id === res.id);
        if (idStudent !== -1) {
          login.data.students[idStudent] = res;
          await AsyncStorage.setItem('userInfo', JSON.stringify(login.data));
          this.props.loginActions.fetchChangeInfo({
            typeChange: 'infoStudent',
            dataLogin: login.data
          });
        }

        this.setState({
          _dataStudent: res,
          _gender: res.gender,
          _dateOfBirth: res.dateOfBirth,
          _firstName: res.firstName,
          _lastName: res.lastName,
          _currentAddress: res.currentAddress,
          _loadingSubmit: false,
          _success: true,
          _error: false,
          _successText: 'updateInfoSuccess',
          _errorText: ''
        })

        setTimeout(() => {
          this.setState({
            _success: false,
            _successText: ''
          })
        }, 2000)


      }
    } else {
      this.setState({
        _loadingSubmit: false,
        _success: false,
        _error: true,
        _successText: '',
        _errorText: 'serverError'
      })
    }
  }

  _getStudentInfo = async () => {
    let { _dataStudent, _avatar, _gender, _dateOfBirth, _firstName,
      _lastName, _currentAddress } = this.state;
    let tmp = this.props.route.params.dataStudent;
    let res = await Services.Student.getStudent(tmp.id);
    if (res && res.code === 'SUCCESS_200') {
      _dataStudent = res.data;
      _avatar = { uri: CONFIG.host + res.data.avatar };
      _gender = res.data.gender;
      _dateOfBirth = res.data.dateOfBirth;
      _firstName = res.data.firstName;
      _lastName = res.data.lastName;
      _currentAddress = res.data.currentAddress;
      this._infoStudent[0].value1 = res.data.lastName;
      this._infoStudent[0].value2 = res.data.firstName;
      this._infoStudent[3].value = res.data.currentAddress;
    } else {
      _avatar = {
        uri: CONFIG.host + props.route.params.avatar ?? '',
      }
      _gender = this.props.route.params.gender ?? 'Male'
      _dateOfBirth = this.props.route.params.dateOfBirth
      _firstName = this.props.route.params.firstName ?? ''
      _lastName = this.props.route.params.lastName ?? ''
      _currentAddress = this.props.route.params.currentAddress ?? ''
      _dataStudent = tmp
    }
    this.setState({
      _avatar, _gender, _dateOfBirth, _firstName,
      _lastName, _currentAddress, _dataStudent, _loading: false
    })
  }
  _onBack = () => {
    this.props.route.params.onRefresh(this.state._dataStudent.id);
    this.props.navigation.goBack();
  }

  /** LIFE CYCLE */
  componentDidMount() {
    this._getStudentInfo();
  }

  UNSAFE_componentWillMount() {
    if (!this.state._dateOfBirth) {
      this.setState({ _dateOfBirth: new Date() })
    } else {
      this.setState({ _dateOfBirth: new Date(this.state._dateOfBirth) })
    }
  }

  componentDidUpdate() {
    if (this.state._loading) {
      if (!this.props.login.data.isFetch) {
        if (this.props.login.messageEdit != '' && this.props.login.messageEdit != 'success') {
          this.setState({
            _error: true,
            _success: false,
            _errorText: this.props.login.messageEdit,
            _loading: false
          });
        } else if (this.props.login.messageEdit != '' && this.props.login.messageEdit === 'success') {
          let find = this.props.login.data.students.findIndex(f => f.id === this.state._dataStudent.id);
          if (find != -1) {
            this.setState({
              _avatar: { uri: CONFIG.host + this.props.login.data.students[find].avatar },
              _dataUser: this.props.login.data.students[find],
              _error: false,
              _success: true,
              _successText: 'updateAvatarSuccess',
              _loading: false
            })

            setTimeout(() => {
              this.setState({
                _success: false,
                _successText: ''
              })
            }, 2000)
          }
        }
      }
    }
  }

  /** RENDER */
  render() {
    return (
      <ViewKidInfomation
        state={this.state}
        props={this.props}
        data={{
          field: this._infoStudent
        }}
        onPress={{
          changeAvatar: this._onPressChangeAvatar,
          chooseDate: this._onPressDate,
          toggleDateChange: this._onPressToggleDateChange,
          submit: this._onPressSubmit
        }}
        onError={{
          avatar: this._onAvatarError
        }}
        onFunction={{
          receiveImage: this._onReceiveImage,
          cloaseModal: this._onCloseModal,
          back: this._onBack
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    language: state.language.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KidInfomation);