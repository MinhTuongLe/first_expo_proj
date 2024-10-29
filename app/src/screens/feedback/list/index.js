/**
 * @Description:
 * @Created by ZiniTeam
 * @Date create:
 */
/** LIBRARY */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** COMMON */
import { KEY, CONFIG } from '../../../config';
import Services from '../../../services';
/** COMPONENT */
import { ViewListFeedback } from './render';

class ListFeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: false,
      _loadMore: false,
      _refreshing: false,
      _data: []
    }
    this._page = 1;
    this._per_page = 10;
  }
  /** FUNCTIONS */
  _onPressAdd = () => {
    this.props.navigation.navigate("AddFeedback", {
      onRefresh: this._onRefresh
    })
  }

  _getFeedback = async (params, type) => {
    let { _data, _loadMore } = this.state;
    let res = await Services.Feedback.getListFeedback(params);

    if (res) {
      _loadMore = res.data.length < this._per_page ? false : true;
      this._per_page += 1;
      if (type === KEY.DATA_REFRESH) {
        _data = [...res.data];
      } else if (type === KEY.DATA_LOADMORE) {
        _data = [..._data, ...res.data]
      }
    }

    this.setState({
      _data,
      _loadMore,
      _refreshing: false,
      _loading: false
    })
  }

  _onRefresh = () => {
    this._page = 1;
    let params = {
      type: CONFIG.USER_TYPE,
      user: this.props.login.id,
      per_page: this._per_page,
      page: 1
    }
    this.setState({ _refreshing: true });
    this._getFeedback(params, KEY.DATA_REFRESH);
  }

  _onLoadMore = () => {
    if (this.state._loadMore) {
      let params = {
        type: CONFIG.USER_TYPE,
        user: this.props.login.id,
        per_page: this._per_page,
        page: this._page
      }
      this._getFeedback(params, KEY.DATA_LOADMORE);
    }
  }

  _onPressItem = (item) => {
    this.props.navigation.navigate("DetailFeedback", {
      id: item.id,
      onRefresh: this._onRefresh
    })
  }

  /** HANDLE FUNCTIONS */
  _onPressBack = () => {
    this.props.route.params?.onRefresh?.();
    this.props.navigation.goBack();
  };

  /** LIFE CYCLE */
  componentDidMount() {
    let params = {
      type: CONFIG.USER_TYPE,
      user: this.props.login.id,
      page: 1,
      per_page: this._per_page
    }
    this._getFeedback(params, KEY.DATA_REFRESH);
  }

  

  /** RENDER */
  render() {
    return (
      <ViewListFeedback
        state={this.state}
        props={this.props}
        onFunction={{
          onPressAdd: this._onPressAdd,
          onRefresh: this._onRefresh,
          onLoadMore: this._onLoadMore,
          onPressItem: this._onPressItem,
          onPressBack: this._onPressBack
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login.data
  }
}

export default connect(mapStateToProps, null)(ListFeedbackScreen);

