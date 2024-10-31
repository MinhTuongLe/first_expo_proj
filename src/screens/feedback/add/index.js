/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** COMPONENT */
import { ViewAddFeedbackScreen } from './render';
/** COMMON */
import Services from '../../../services';
import Helpers from '../../../helpers';
import { CONFIG, LANG } from '../../../config';

class AddFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _title: props.route.params.dataReply ? props.route.params.dataReply.title : "",
      _des: "",
      _txtToast: "",
      _isSendPrincipal: props.route.params.dataReply ? props.route.params.dataReply.principal : false,
      _teachersSelected: props.route.params.teachersSelected || [],
      _dataTeacherSelected: props.route.params.dataReply ? props.route.params.dataReply.user : [],
      _isReply: props.route.params.isReply || false
    }
  }
  /** FUNCTIONS */
  _onChangeTitle = (value) => {
    this.setState({ _title: value })
  }

  _onChangeDes = (value) => {
    this.setState({ _des: value })
  }

  _onPressSend = () => {
    let _isNotEmpty = this._validateField();
    if (!_isNotEmpty) return;
    this.setState({ _loading: true });
    this._onSend();
  }

  _onSend = async () => {
    let { _title, _des, _teachersSelected, _isSendPrincipal, _txtToast, _isReply } = this.state;
    let params = {
      title: _title,
      description: _des,
      user: this.props.login.id,
      receiver: _teachersSelected,
      principal: _isSendPrincipal,
      status: 1,
      school: this.props.school.id
    }
    let res;
    if (_isReply) {
      params.id = this.props.route.params.dataReply.id
      res = await Services.Feedback.editFeedback(params);
    } else {
      res = await Services.Feedback.addFeedback(params);
    }

    if (res && !res.code) {
      if (!res.code) {
        _txtToast = "send_feedback_success";
        _title = "";
        _des = "";
        _teachersSelected = [];
        _isSendPrincipal = false
      } else {
        _txtToast = "serverError"
      }
    } else {
      _txtToast = "serverError"
    }
    Helpers.toast(LANG[CONFIG.lang][_txtToast]);
    this._onPressBack();
    this.setState({
      _txtToast,
      _title,
      _des,
      _teachersSelected,
      _isSendPrincipal,
      _loading: false
    })
  }
  _validateField = () => {
    let { _txtToast, _title, _des, _isSendPrincipal, _teachersSelected } = this.state;
    if (_title === "" || _des === "") {
      _txtToast = "txtInputErrNotFill";
    } else if (!_isSendPrincipal && _teachersSelected.length === 0) {
      _txtToast = "txt_error_empty_person"
    } else {
      _txtToast = ""
    }
    this.setState({ _txtToast });
    if (_txtToast !== "") {
      Helpers.toast(LANG[CONFIG.lang][_txtToast])
    }

    return _txtToast === ""
  }

  _onToggle = () => {
    this.setState({ _isSendPrincipal: !this.state._isSendPrincipal})
  }

  _onSelectedTeacher = (arrId) => {
    let { teachers } = this.props;
    let filter = teachers.filter(f => arrId.includes(f.id));
    this.setState({ _dataTeacherSelected: filter })
  }

  _onPressHistory = () => {
    this.props.navigation.navigate("ListFeedback")
  }

  _onPressContact = ( ) => {
    if (!this.state._isReply) {
      this.props.navigation.navigate("ContactFeedback", {
        teachersSelected: this.state._teachersSelected,
        onSelectedTeacher: this._onSelectedTeacher
      });
    }
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
    this.props.route.params.onRefresh()
  }

  _onDeleteTeacher = (item) => {
    let { _teachersSelected } = this.state;
    let findIndex = _teachersSelected.findIndex(f => f === item.id);
    _teachersSelected.splice(findIndex, 1);
    this._onSelectedTeacher(_teachersSelected)
    this.setState({ _teachersSelected });
  }
  /** LIFE CYCLE */
  componentDidMount() {
  }
  /** RENDER */
  render() {
    return (
      <ViewAddFeedbackScreen 
        state={this.state}
        props={this.props}
        onFunction={{
          onChangeTitle: this._onChangeTitle,
          onChangeDes: this._onChangeDes,
          onPressSend: this._onPressSend,
          onToggle: this._onToggle,
          onPressHistory: this._onPressHistory,
          onPressContact: this._onPressContact,
          onPressBack: this._onPressBack,
          onDeleteTeacher: this._onDeleteTeacher
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers.data,
    school: state.school.data,
    login: state.login.data,
    language: state.language.language
  }
}

export default connect(mapStateToProps, null)(AddFeedbackScreen);
