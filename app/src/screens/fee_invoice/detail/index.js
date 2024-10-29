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
import {ViewFeeInvoiceDetail, ViewModalList} from './render';
/** COMMON */
import Services from '../../../services';
import {CONFIG} from '../../../config';
import Clipboard from '@react-native-clipboard/clipboard';
import helpers from '../../../helpers';

class FeeInvoiceDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _error: false,
      _loading: false,
      _selectedStudent: props.route.params.selectedStudent,
      _dataFeeInvoice: props.route.params.dataFeeInvoice,
      _method: CONFIG.CASH,
      _bank: 0,
      _errText: '',
      _viewableBank: 0,
      _methods: CONFIG.PAYMENT_METHODS,
    };
    this._language = props.route.params.language;
    this._parentId = props.route.params.parentId;
    this._setting = props.route.params.setting;
    this._dataBank = props.route.params.dataFeeInvoice?.banks || [];
    // this._dataBank =
    //   props.route.params.setting &&
    //   props.route.params.setting.config.value.banks
    //     ? props.route.params.setting.config.value.banks
    //     : [];
  }
  /** FUNCTIONS */
  _onGetDetailFeeInvoice = async id => {
    let {_dataFeeInvoice, _detailData, _errText, _error} = this.state;
    let res = await Services.FeeInvoice.getDetailFeeInvoice({
      id,
      school: this.props.login.data.school,
    });
    if (res) {
      if (res.code === 'FEE_INVOICE_NOT_FOUND') {
        _error = true;
        _errText = 'serverError';
      } else {
        _error = false;
        _errText = '';
        _detailData = res.items;
        _dataFeeInvoice = res;
      }
    } else {
      _error = true;
      _errText = 'serverError';
    }

    this.setState({
      _dataFeeInvoice,
      _detailData,
      _error,
      _errText,
      // _method:
      //   this._dataBank.length > 0
      //     ? // && this._setting.config.value.allowTransfer
      //       CONFIG.BANK
      //     : CONFIG.PAYPAL,
      // //
      _method:
        this.props.route.params?.lastMethod ??
        CONFIG.PAYMENT_METHODS?.[0] ??
        CONFIG.BANK,
      _loading: false,
    });
  };

  _onPressAddPayment = () => {
    this._addPayment();
  };

  _addPayment = () => {
    if (this.state._method === CONFIG.CASH) {
      helpers.customToast(
        'Tuition information is pending. Kindie will update the information to parents as soon as it is completed.',
      );
    }
    if (this.state._method === CONFIG.BANK) {
      this.props.navigation.navigate('FeeInvoiceSummary', {
        selectedStudent: this.state._selectedStudent,
        dataFeeInvoice: this.state._dataFeeInvoice,
        method: this.state._method,
        bank: this._dataBank[this.state._bank],
        parentId: this._parentId,
        setting: this._setting,
        onRefresh: id => this._onRefresh(id),
      });
    } else if (this.state._method === CONFIG.PAYPAL) {
      // this.props.navigation.navigate('FeeInvoicePaypal', {
      //   selectedStudent: this.state._selectedStudent,
      //   dataFeeInvoice: this.state._dataFeeInvoice,
      //   parentId: this._parentId,
      //   onRefresh: id => this._onRefresh(id),
      // });
    }
  };

  _onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems?.length > 0) {
      this.setState({
        _viewableBank: viewableItems[0].index,
      });
    }
  };

  _onChangeMethod = method => {
    this.setState({_method: method});
  };

  _onChangeBank = idxBank => {
    this.setState({_bank: idxBank});
  };

  _onRefresh = idFeeInvoice => {
    this._onGetDetailFeeInvoice(idFeeInvoice);
  };

  _copyToClipboard = string => {
    Clipboard.setString(string);
    helpers.toast('Copied');
  };

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    this._onGetDetailFeeInvoice(this.state._dataFeeInvoice.id);
  }

  /** RENDER */
  render() {
    return (
      <>
        <ViewFeeInvoiceDetail
          state={this.state}
          language={this._language}
          dataBank={this._dataBank}
          onFunction={{
            addPayment: this._onPressAddPayment,
            onChangeText: this._onChangeNote,
            onChangeMethod: this._onChangeMethod,
            onChangeBank: this._onChangeBank,
            onScrollList: this._onViewableItemsChanged,
            copyToClipboard: this._copyToClipboard,
          }}
          onPressBack={this._onPressBack}
          settingTransfer={
            CONFIG.USER_TYPE == 'parent' &&
            this.state._methods.includes(CONFIG.BANK) &&
            this.state._dataFeeInvoice?.status !== CONFIG.FEE_INVOICE.PAID
          }
          settingPaypal={
            CONFIG.USER_TYPE == 'parent' &&
            this.state._methods.includes(CONFIG.PAYPAL) &&
            this.state._dataFeeInvoice?.status !== CONFIG.FEE_INVOICE.PAID
          }
          settingCash={
            CONFIG.USER_TYPE == 'parent' &&
            this.state._methods.includes(CONFIG.CASH) &&
            this.state._dataFeeInvoice?.status !== CONFIG.FEE_INVOICE.PAID
          }
        />
      </>
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
export default connect(mapStateToProps, null)(FeeInvoiceDetailScreen);
