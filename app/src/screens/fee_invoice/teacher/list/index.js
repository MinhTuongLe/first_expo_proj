/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React, {Component} from 'react';
import {connect} from 'react-redux';
/* COMPONENTS */
import {ViewFeeInvoiceList} from './render';
/** COMMON */
import Services from '../../../../services';

class FeeInvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _refreshing: false,
      _loadmore: false,
      _isLoadmore: true,
      _selectedStudent: props.route.params.selectedStudent,
      _dataFeeInvoice: [],
      _amountFeeInvoice: null,
    };
    this._limit = 10;
    this._page = 1;
  }

  /** FUNCTIONS */
  _getListFeeInvoice = async () => {
    let {_isLoadmore, _dataFeeInvoice, _amountFeeInvoice} = this.state;
    let params = {
      page: this._page,
      limit: this._limit,
      studentId: this.state._selectedStudent.id,
      school: this.props.login.data.school,
    };
    let res = await Services.FeeInvoice.getListFeeInvoice(params);
    if (res) {
      if (res.code === 'FEE_INVOICE_STUDENT_REQUIRED') {
        _dataFeeInvoice = [];
        _amountFeeInvoice = null;
      } else {
        _amountFeeInvoice = res?.amount;
        if (res?.data?.length === 0) {
          _isLoadmore = false;
        } else {
          this._page += 1;
          if (this.state._refreshing) {
            _dataFeeInvoice = res?.data;
          } else {
            _dataFeeInvoice = [..._dataFeeInvoice, ...res?.data];
          }
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

  _detailFeeInvoice = item => {
    this.props.navigation.navigate('FeeInvoiceDetail', {
      selectedStudent: this.state._selectedStudent,
      dataFeeInvoice: item,
    });
  };

  _onRefresh = () => {
    this.setState({_refreshing: true});
    this._page = 1;
    this._getListFeeInvoice();
  };

  _onLoadMore = () => {
    let {_loadmore, _isLoadmore} = this.state;
    if (!_loadmore && _isLoadmore) {
      this.setState({_loadmore: true});
      this._getListFeeInvoice();
    }
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._getListFeeInvoice();
  }

  /** RENDER */
  render() {
    return (
      <ViewFeeInvoiceList
        state={this.state}
        onFunction={{
          onRefresh: this._onRefresh,
          onLoadMore: this._onLoadMore,
          onPressBack: this._onPressBack,
          detailFeeInvoice: this._detailFeeInvoice,
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

export default connect(mapStateToProps, null)(FeeInvoiceList);
