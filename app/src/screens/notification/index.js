/* eslint-disable prettier/prettier */
/**
 * @Description: Notification Screen Logic
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/** LIBRARY */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import firebase from 'react-native-firebase';
/** COMMON **/
import {KEY} from '../../config';
/** REDUX */
import * as notificationActions from '../../redux/actions/notification';
import * as messagesActions from '../../redux/actions/messages';
import * as loadingActions from '../../redux/actions/loading';
/** COMPONENTS **/
import ViewNotificationScreen from './render';
/** API **/
import Services from '../../services';

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _refreshing: false,
      _loadmore: true,
      _dataNotifycation: [],
    };
    this._page = 1;
    this._limit = 10;
  }

  /* FUNCTIONS */
  _getDataFromServer = async (params, type) => {
    let {_dataNotifycation} = this.state;
    let loadmore = true;
    let resultNoti = await Services.Notification.list(params);
    if (resultNoti && resultNoti.length > 0) {
      if (resultNoti.length < this._limit) loadmore = false;

      if (type == KEY.DATA_REFRESH) {
        _dataNotifycation = resultNoti;
      } else if (type == KEY.DATA_LOADMORE) {
        _dataNotifycation = [..._dataNotifycation, ...resultNoti];
      }
      this._page += 1;
    }

    this.setState({
      _loading: false,
      _refreshing: false,
      _loadmore: loadmore,
      _dataNotifycation,
    });
    if (this.props.isLoading) {
      this.props.loadingActions.setLoading(false);
    }
  };

  _onRefresh = () => {
    this.setState({_refreshing: true});

    this._page = 1;
    let params = {
      id: this.props.login.data.id,
      limit: this._limit,
      page: 1,
      school: this.props.login.data.school,
    };

    this._getDataFromServer(params, KEY.DATA_REFRESH);
  };

  _onLoadMore = () => {
    if (this.state._loadmore) {
      let params = {
        id: this.props.login.data.id,
        limit: this._limit,
        page: this._page,
        school: this.props.login.data.school,
      };
      this._getDataFromServer(params, KEY.DATA_LOADMORE);
    }
  };

  _onPressItem = async item => {
    // redirect to news details
    if (item.notification.type === 0 && !item.notification?.isNotification) {
      // console.log('--- CLICK NEWS ITEM ---', item.notification.modelId);
      let res = await Services.News.get({id: item.notification.modelId});
      this.props.navigation.navigate('NewsDetail', {data: res.data});
      return;
    }

    // redirect to album details
    if (item.notification.type === 2) {
      // console.log('--- CLICK ALBUM ITEM ---', item.notification.modelId);
      this.props.navigation.navigate('AlbumDetail', {
        id: item.notification.modelId,
      });
      return;
    }

    this.props.navigation.navigate('NotificationDetail', {
      data: item,
    });
  };

  /* LIFE CYCLE */
  componentDidMount = () => {
    let dataCurNotRead = this.props.notification.dataNotRead;
    // firebase.notifications().setBadge(dataCurNotRead);

    this.props.loadingActions.setLoading(true);
    let params = {
      id: this.props.login.data.id,
      limit: this._limit,
      page: 1,
      school: this.props.login.data.school,
    };
    this._getDataFromServer(params, KEY.DATA_REFRESH);
  };

  /** RENDER */
  render() {
    return (
      <ViewNotificationScreen
        state={this.state}
        onRefresh={this._onRefresh}
        onLoadMore={this._onLoadMore}
        onPress={{
          item: this._onPressItem,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    login: state.login,
    notification: state.notification,
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
