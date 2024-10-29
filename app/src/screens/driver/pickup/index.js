/* eslint-disable prettier/prettier */
/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
/* COMPONENTS */
import { ViewPickUpDetail } from './render';
/** COMMON */
import { CONFIG, activeSteps } from '../../../config';
import Services from '../../../services';
import Errors from '../../../config/errors';

const busObj = {
  avatar: '',
  firstName: 'schoolBus',
  id: '',
  lastName: '',
  type: 3,
};
const otherObj = {
  avatar: '',
  firstName: 'txtMessageTitleOther',
  id: '',
  lastName: '',
  type: 2,
};

class PickUpDetailScreenDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _loadingBtn: false,
      _error: false,
      _isCurrentDay: true,
      _isPickUp: false,
      _checkExistAttendance: false,
      _selectedStudent: null,
      _parentId: null,
      _dataRender: null,
      _errorText: '',
      _currentDay: moment().format('YYYY-MM-DD'),
      _idAttendance: props.route.params.idAttendance ?? '', //Id Attendance or Pick up
      _pickupType: props.route.params.pickupType ?? activeSteps.ON_BUS_IN,
      _dataClass: props.route.params.dataClass ?? []
    };
    this._noteRef = '';
    this._allowShuttleBus = props.route.params.allowShuttleBus ?? false
  }

  /** FUNCTIONS */
  _getInfo = async () => {
    let { _pickupType, _parentId, _checkExistAttendance } = this.state;
    let res,
      params = {
        id: this.state._idAttendance,
        school: this.props.login.data.school,
      };

    res = await Services.Attendant.get(params);
    // console.log('res: ', res);

    if (res && !res.code) {
      let _dataRender = res.arrParent;
      // if (_pickupType === activeSteps.ON_BUS_IN) {
      //   _dataRender.push(otherObj);
      // } else if (_pickupType === activeSteps.CHECK_OUT) {
      //   _dataRender.push(otherObj);
      // }
      _dataRender.push(otherObj);
      this.setState({
        _parentId,
        _checkExistAttendance,
        _selectedStudent: res.student,
        _dataRender: _dataRender,
        _loading: false,
      });
    } else {
      this.setState({ _loading: false });
    }
  };

  _onEditPersonPickUp = async () => {
    /** Validations */
    if (this.state._parentId === otherObj.id && this._noteRef.trim() === '') {
      return this._error('txtInputErrNotFill');
    }
    if (this.state._parentId === null) {
      return this._error('needChooseParentForAttendance');
    }

    this.setState({ _loadingBtn: true });

    // let params = {
    //   id: this.state._idAttendance,
    //   parentId: this.state._parentId,
    //   // time: moment().format('HH:mm'),
    //   note: this._noteRef,
    //   userId: this.props.login.data.id,
    //   school: this.props.login.data.school,
    //   // type: "attendance"
    // };

    let params = {
      attendanceId: this.state._idAttendance,
      userId: this.props.login.data.id,
      parentId: this.state._parentId,
      school: this.props.login.data.school,
    };

    let resEdit = await Services.Driver.pickUp(params);

    if (resEdit) {
      if (resEdit.code === Errors.ATTENDENT_ID_REQUIRED.code) {
        return this._error(Errors.ATTENDENT_ID_REQUIRED.message);
      } else if (resEdit.code === Errors.ATTENDENT_NOT_FOUND.code) {
        return this._error(Errors.ATTENDENT_NOT_FOUND.message);
      } else if (resEdit.code === Errors.ATTENDENT_NOTE_REQUIRED.code) {
        return this._error(Errors.ATTENDENT_NOTE_REQUIRED.message);
      } else if (resEdit.code === Errors.ATTENDENT_TIME_REQUIRED.code) {
        return this._error(Errors.PICKUP_TIME_REQUIRED.message);
      } else {
        this.setState({
          _errorText: 'txtChangeInfoSuccess',
          _loadingBtn: false,
          _error: false,
          _isPickUp: true,
        });
        setTimeout(() => {
          this.setState({ _errorText: '' });
        }, 1500);
      }
    }
  };

  _onEditPersonDropOff = async () => {
    /** Validations */
    if (this.state._parentId === otherObj.id && this._noteRef.trim() === '') {
      return this._error('txtInputErrNotFill');
    }

    if (this.state._parentId === null) {
      return this._error('needChooseParentForPickOff');
    }

    this.setState({ _loadingBtn: true });

    let params = {
      attendanceId: this.state._idAttendance,
      userId: this.props.login.data.id,
      parentId: this.state._parentId,
      school: this.props.login.data.school,
    };

    let resEdit = await Services.Driver.dropOff(params);

    // console.log('resEdit: ', resEdit)
    if (resEdit) {
      if (resEdit.code === Errors.ATTENDENT_ID_REQUIRED.code) {
        return this._error(Errors.ATTENDENT_ID_REQUIRED.message);
      } else if (resEdit.code === Errors.ATTENDENT_TIME_REQUIRED.code) {
        return this._error(Errors.ATTENDENT_TIME_REQUIRED.message);
      } else if (resEdit.code === Errors.PARENT_ID_REQUIRED.code) {
        return this._error(Errors.PARENT_ID_REQUIRED.message);
      } else {
        this.setState({
          _errorText: 'txtChangeInfoSuccess',
          _loadingBtn: false,
          _error: false,
          _isPickUp: true,
        });
        setTimeout(() => {
          this.setState({ _errorText: '' });
        }, 1500);
      }
    }
  };

  _error = slug => {
    this.setState({
      _error: true,
      _errorText: slug,
      _loading: false,
      _loadingBtn: false,
    });
  };

  _onGetNote = text => {
    this._noteRef = text;
  };

  /** HANDLE FUNCTIONS */
  _onToggleValue = parentId => {
    if (parentId !== this.state._parentId) {
      this.setState({ _parentId: parentId });
    }
    if (parentId !== "") this._noteRef = '';
  };

  _onBack = () => {
    this.props.route.params.onRefresh(this.state._isPickUp);
    this.props.navigation.goBack();
    this.setState({ _isPickUp: false });
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._getInfo();
  }

  /** RENDER */
  render() {
    return (
      <ViewPickUpDetail
        state={this.state}
        noteRef={this._noteRef}
        onFunction={{
          rowHasChanged: this._rowHasChanged,
          loadStudents: this._loadStudents,
          onUpdate:
            this.state._pickupType === activeSteps.ON_BUS_IN
              ? this._onEditPersonPickUp
              : this._onEditPersonDropOff,
          onBack: this._onBack,
          onGetNote: this._onGetNote,
        }}
        onToggleValue={this._onToggleValue}
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

export default connect(
  mapStateToProps,
  null,
)(PickUpDetailScreenDriver);
