/**
 * @Description: Noti detail screen
 * @Created by ZiniTeam
 * @Date create: 25/01/2019
 */
/** LIBRARY */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import firebase from 'react-native-firebase';
import HTML from 'react-native-render-html';
/** COMMON **/
import { CONFIG, DEVICE, KEY } from '../../../config';
import Helpers from '../../../helpers';
/** COMPONENTS **/
import CText from '../../../components/CText';
import HeaderBar from '../../partials/header_bar';
import * as notificationActions from '../../../redux/actions/notification';
import * as loadingActions from '../../../redux/actions/loading';
import Services from '../../../services';
/** STYLES **/
import notificationStyle from '../style';

class ViewNotificationDetail extends React.Component {

  /** RENDER */
  render() {
    let { data: _data, loading: _loading, onBack } = this.props
    if (_loading) {
      return (
        <View style={notificationStyle.container}>
          {/* Header */}
          <HeaderBar title={'txtTab4'} hasBack />
        </View>
      )
    }

    if (!_data) {
      return (
        <View style={notificationStyle.container}>
          {/* Header */}
          <HeaderBar title={'txtTab4'} hasBack />
        </View>
      )
    }

    let time = Helpers.getShortTimeWithNow(parseInt(_data.notification.createdAt));
    const html = `<p>${_data.notification.message}</p>`;
    return (
      <View style={notificationStyle.container}>
        {/* Header */}
        <HeaderBar title={'txtTab4'} hasBack onBack={onBack} />

        {/* Content */}
        <ScrollView style={{ paddingTop: 10 }}>
          <View style={notificationStyle.d_container_content}>
            <Text style={notificationStyle.d_text_title}>
              {Helpers.capitalizeFirstLetter(_data.notification.title)}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={notificationStyle.d_text_time}>{time.time} </Text>
              {time.type === time.des ?
                <CText style={notificationStyle.d_text_time} i18nKey={time.type} /> :
                <Text style={notificationStyle.d_text_time}>{time.des} </Text>}
            </View>
          </View>

          <View style={notificationStyle.d_container_content}>
            <HTML
              source={{ html: html }}
              contentWidth={DEVICE.width}
              imagesMaxWidth={DEVICE.width}
              tagsStyles={{ p: notificationStyle.txt_html_content }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    notification: state.notification,
    isLoading: state.loading.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewNotificationDetail);
