/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/* COMPONENTS */
import {ViewFeeInvoiceList} from './render';
/** COMMON */
import Helpers from '../../../helpers';
import Services from '../../../services';
import * as loginActions from '../../../redux/actions/login';
import * as loadingActions from '../../../redux/actions/loading';

class ParentFeeInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _selectedStudent: props.login.data.students,
      _dataFeeInvoice: [],
      _loadmore: false,
      _isLoadmore: true,
      _amountFeeInvoice: null,
      // _page: 1,
    };
    this._limit = 10;
    this._page = 1;
    this._studentId = null;
  }
  /** FUNCTIONS */
  _detailFeeInvoice = item => {
    this.props.navigation.navigate('FeeInvoiceDetail', {
      selectedStudent: this.state._selectedStudent,
      dataFeeInvoice: item,
      parentId: this.props.login.data.id,
      setting: this.props.setting,
      language: this.props.language,
    });
  };

  _checkStudents = async () => {
    let _studentChoose = await Helpers.getAsyStrStudentChoosed();
    if (_studentChoose) {
      _studentChoose = JSON.parse(_studentChoose);
      this._studentId = _studentChoose.id;
      this.setState({_selectedStudent: _studentChoose});
      this._getListFeeInvoiceByID();
    }
  };

  _getListFeeInvoiceByID = async () => {
    let {_isLoadmore, _dataFeeInvoice, _amountFeeInvoice} = this.state;
    let params = {
      page: this._page,
      limit: this._limit,
      studentId: this._studentId,
      school: this.props.login.data.school,
    };
    let res = await Services.FeeInvoice.getListFeeInvoice(params);
    // console.log('res ne', res);
    if (res) {
      if (res.code === 'FEE_INVOICE_STUDENT_REQUIRED') {
        _dataFeeInvoice = [];
        _amountFeeInvoice = null;
      } else {
        _amountFeeInvoice = res?.amount;
        if (res.length === 0) {
          _isLoadmore = false;
        } else {
          this._page += 1;
          if (this.state._refreshing) _dataFeeInvoice = res?.data;
          else _dataFeeInvoice = [..._dataFeeInvoice, ...res?.data];
        }
      }
    }

    this.setState({
      _amountFeeInvoice,
      _dataFeeInvoice,
      _loading: false,
      _refreshing: false,
      _loadmore: false,
      _isLoadmore,
    });
  };
  _onRefresh = () => {
    this.setState({_refreshing: true});
    this._page = 1;
    this._getListFeeInvoiceByID();
  };

  _onLoadMore = () => {
    let {_loadmore, _isLoadmore} = this.state;
    if (!_loadmore && _isLoadmore) {
      this.setState({_loadmore: true});
      this._getListFeeInvoiceByID();
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
    // console.log("state",this.state);
    return (
      <ViewFeeInvoiceList
        state={this.state}
        onFunction={{
          detailFeeInvoice: this._detailFeeInvoice,
          onRefresh: this._onRefresh,
          onLoadMore: this._onLoadMore,
        }}
        onPressBack={this._onPressBack}
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

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentFeeInvoice);
