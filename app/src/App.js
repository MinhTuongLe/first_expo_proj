/* eslint-disable prettier/prettier */
/**
 * @Description: App Main
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {RootSiblingParent} from 'react-native-root-siblings';
import {MenuProvider} from 'react-native-popup-menu';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
/** COMPONENT */
import './ignoreWarnings';
import './config-i18n';
import AppRouter from './AppRouter';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NavigationService from './navigation/NavigationService';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as notificationActions from './redux/actions/notification';
import * as messagesActions from './redux/actions/messages';
/** REDUX */
import store from './redux/store';

const App = () => {
  useEffect(() => {
    configureFontAwesomePro('light');
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let notiData = remoteMessage.notification?.body;
      console.log('Message handled in the background!', notiData);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      let dataNoti = remoteMessage.notification?.body;
      dataNoti = dataNoti.replace(/^.*[\\/]/, '');
      // console.log('dataNoti: ', dataNoti);
      // Alert.alert('Notification', dataNoti);
    });

    return unsubscribe;
  }, []);

  _goToNotification = data => {
    // Check if data == {} return null
    let tmp =
      Object.keys(data).length === 0 && data.constructor === Object
        ? null
        : data;
    let msgNotRead = this.props.messages.msgNotRead;
    let dataNotRead = this.props.notification.dataNotRead;
    let sumBadge = msgNotRead + dataNotRead;

    if (data.key && data.key === 'message') {
      NavigationService.navigate('Message', {
        dataFromNotification: tmp,
      });
    } else {
      if (Number(dataNotRead) > 0) {
        this.props.notificationActions.setNotRead(dataNotRead - 1);
        firebase.notifications().setBadge(sumBadge - 1);
      }

      NavigationService.navigate('NotificationDetail', {
        data: tmp,
      });
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer
        ref={navigationRef => {
          NavigationService.setTopLevelNavigator(navigationRef);
        }}>
        <SafeAreaProvider>
          <MenuProvider>
            <RootSiblingParent>
              <AppRouter />
            </RootSiblingParent>
          </MenuProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    notification: state.notification,
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch),
  };
};

const AppNavigation = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
