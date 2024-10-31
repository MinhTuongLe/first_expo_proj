/**
 ** FileName:
 ** FileAuthor:
 ** FileCreateAt:
 ** FileDescription:
 **/
/* LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/** COMPONENT */
import {ViewPaypalPayment} from './render';
/** SERVICES */
import Services from '../../../services';
/** COMMON */
import Helpers from '../../../helpers';
import {CONFIG} from '../../../config';

class PaypalPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _success: false,
      _error: false,
      _cardData: {valid: false},
      _dataFeeInvoice: props.route.params.dataFeeInvoice,
      _parentId: props.route.params.parentId,
    };
  }

  /** FUNCTIONS */
  _onChangeInfoCard = cardData => {
    this.setState({_cardData: cardData});
  };

  _onPressPayment = async () => {
    this.setState({_loading: true, _error: false, _success: false});
    let {_cardData} = this.state;
    let params = {
      publishKey: CONFIG.stripePublishKey,
      card: {
        'card[number]': _cardData.values.number.replace(/ /g, ''),
        'card[exp_month]': _cardData.values.expiry.split('/')[0],
        'card[exp_year]': _cardData.values.expiry.split('/')[1],
        'card[cvc]': _cardData.values.cvc,
      },
    };
    let token = await Services.FeeInvoice.getTokenStripe(params);
    if (token) {
      if (token.error) return this._error();
      // console.log('---> TOKEN OF STRIPE: ', token);
      this._submitPayment(token);
    } else return this._error();
  };

  _submitPayment = async token => {
    let {login} = this.props;
    let {_dataFeeInvoice, _parentId} = this.state;
    let params = {
      feeInvoiceId: _dataFeeInvoice.id,
      parentId: _parentId,
      token: token.id,
      method: CONFIG.PAYPAL,
      school: login.data.school,
    };
    let res = await Services.Payment.add(params);
    // console.log("res payment", res);
    if (res && !res.code) {
      if (res.chargeStatus === 'fail') return this._error();
      // console.log('---> RESPONSE STRIPE: ', res);
      this.setState({_success: true, _loading: false});
    } else return this._error();
  };

  _onPressGoToHomepage = () => {
    Helpers.resetNavigation(this.props.navigation, 'RootDrawer');
  };

  _error = () => {
    this.setState({_error: true, _loading: false});
  };

  /** RENDER */
  render() {
    return (
      <ViewPaypalPayment
        state={this.state}
        onFunction={{
          onChangeInfoCard: this._onChangeInfoCard,
          onPressPayment: this._onPressPayment,
          onPressGoToHomepage: this._onPressGoToHomepage,
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

export default connect(mapStateToProps, null)(PaypalPayment);
