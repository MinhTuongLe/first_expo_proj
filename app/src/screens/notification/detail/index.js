/* eslint-disable prettier/prettier */
/**
 * @Description: Noti detail screen
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
// import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import firebase from 'react-native-firebase';
// import HTML from 'react-native-render-html';
/** COMMON **/
import {CONFIG, KEY} from '../../../config';
// import Helpers from '../../../helpers';
/** COMPONENTS **/
import ViewNotificationDetail from './render';
// import CText from '../../../components/CText';
// import HeaderBar from '../../partials/header_bar';
import * as notificationActions from '../../../redux/actions/notification';
import * as loadingActions from '../../../redux/actions/loading';
import Services from '../../../services';
/** STYLES **/
// import notificationStyle from '../style';

class NotificationDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _loading: true,
      _data: null,
    };
    this._dataNotification = props.route.params.data;
  }

  /** LIFE CYCLE */
  async componentDidMount() {
    let tmp = this._dataNotification;
    if (tmp) {
      let params = null;
      if (tmp.hasOwnProperty('notification'))
        params = {id: tmp.notification.id};
      else params = {id: tmp.id};

      if (tmp.hasOwnProperty(KEY.PARENT)) params.parent = tmp.parent;
      else if (tmp.hasOwnProperty('user')) params.user = tmp.user;
      else if (CONFIG.USER_TYPE == KEY.PARENT)
        params.parent = this.props.login.data.id;
      else if (CONFIG.USER_TYPE == KEY.TEACHER)
        params.user = this.props.login.data.id;

      await Services.Notification.read(params);
      let dataNotRead = this.props.notification.dataNotRead;

      if (!tmp.hasOwnProperty('notification')) {
        tmp.notification = tmp;
      }
      if (tmp.hasOwnProperty('notification') && tmp.isRead === false) {
        this.props.notificationActions.setNotRead(dataNotRead - 1);
        // firebase.notifications().setBadge(dataNotRead - 1);
      }
    }

    this.setState({
      _data: tmp,
      _loading: false,
    });
    if (this.props.isLoading) {
      this.props.loadingActions.setLoading(false);
    }
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  };

  /** RENDER */
  render() {
    if (!this.state._loading) {
      return (
        <ViewNotificationDetail
          data={this.state._data}
          loading={this.state._loading}
          onBack={this._onPressBack}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    notification: state.notification,
    isLoading: state.loading.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationDetailScreen);
