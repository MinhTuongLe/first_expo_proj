/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React, {Component} from 'react';
import Services from '../../../services';
import {connect} from 'react-redux';
/** COMMON */
import {ViewDetailFeedBack} from './render';

class DetailFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _data: null,
    };
  }

  /** FUNCTION */
  _getDataFromServer = async () => {
    let {_data} = this.state;
    let res = await Services.Feedback.getFeedback({
      id: this.props.route.params.id,
    });
    if (res && res.data) {
      _data = res.data;
    }

    this.setState({
      _data,
      _loading: false,
    });
  };

  _onPressReply = () => {
    let arrSelected = [];
    for (let std of this.state._data.user) {
      arrSelected.push(std.id);
    }
    this.props.navigation.navigate('AddFeedback', {
      onRefresh: this._onRefresh,
      isReply: true,
      dataReply: this.state._data,
      teachersSelected: arrSelected,
    });
  };

  _onRefresh = () => {
    this.setState({_loading: true});
    this._getDataFromServer();
  };
  _onPressBack = () => {
    this.props.navigation.goBack();
    this.props.route.params.onRefresh();
  };
  /** LIFE CYCLE */
  componentDidMount() {
    this._getDataFromServer();
  }
  /** RENDER */
  render() {
    return (
      <ViewDetailFeedBack
        state={this.state}
        props={this.props}
        onFunction={{
          onPressReply: this._onPressReply,
          onPressBack: this._onPressBack,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login.data,
  };
};

export default connect(mapStateToProps, null)(DetailFeedbackScreen);
