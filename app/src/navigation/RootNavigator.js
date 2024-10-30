/**
 ** Name:
 ** Author:
 ** CreateAt:
 ** Description:
 **/
/* LIBRARY */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Linking, TouchableOpacity, Platform } from "react-native";
import firebase from "react-native-firebase";
import { SafeAreaView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Modal from "react-native-modal";
/* CONPONENT */
import CInnerLoading from "../components/CInnerLoading";
import CText from "../components/CText";
/** COMMON */
import { DEVICE, ASSETS, COLOR, CONFIG } from "../config";
import Helpers from "../helpers";
/* SERVICES */
import NavigationService from "./NavigationService";
/** REDUX */
import * as notificationActions from "../redux/actions/notification";
import * as messagesActions from "../redux/actions/messages";
import AppContainer from "./AppContainer";

/** INIT */
const Analytics = firebase.analytics();

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    // init firebase
    Analytics.setAnalyticsCollectionEnabled(true);
    this.state = {
      _loading: true,
      _needUpdate: false,
      _errorHelper: "",
      _errorHelper2: "",
      _latestVersion: "",
      _linkToStore: "",
    };
  }

  /** FUNCTIONS */
  _createNotificationListeners = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        let avatarUser = null;
        let tmpTxtMessage = "";
        let tmpTxtTitle = "";

        if (
          notification.data.notification &&
          typeof notification.data.notification === "string"
        ) {
          notification.data.notification = JSON.parse(
            notification.data.notification
          );
          tmpTxtMessage = notification.data.notification.txtMessage;
          if (
            notification.data.notification.user.avatar &&
            notification.data.notification.user.avatar !== ""
          ) {
            avatarUser =
              CONFIG.host + notification.data.notification.user.avatar;
          } else {
            avatarUser =
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
          }

          if (notification.data.type) {
            if (notification.data.type === "group") {
              tmpTxtTitle = notification.data.notification.title;
              tmpTxtMessage =
                notification.data.notification.user.firstName +
                " " +
                notification.data.notification.user.lastName +
                ": " +
                notification.data.notification.txtMessage;
            } else {
              tmpTxtTitle =
                notification.data.notification.user.firstName +
                " " +
                notification.data.notification.user.lastName;
            }
          }
        }
        // console.log('notification.data', notification.data)
        notification
          .setSound("default")
          .ios.setLaunchImage()
          .setNotificationId(
            notification.data.notification
              ? notification.data.messageId
              : notification.data.id
          ) // Any random ID
          .setTitle(
            notification.data.notification
              ? tmpTxtTitle
              : notification.data.title.replace(/(<([^>]+)>)/gi, "")
          ) // Title of the notification
          .setBody(
            notification.data.notification
              ? tmpTxtMessage
              : notification.data.message.replace(/(<([^>]+)>)/gi, "")
          ) // body of notification
          .ios.setBadge(
            notification.ios && notification.ios.badge
              ? notification.ios.badge
              : 0
          )
          .android.setChannelId("kindie-channel")
          .android.setSmallIcon(avatarUser || "ic_launcher")
          .android.setLargeIcon(avatarUser || "ic_launcher")
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setBadgeIconType(
            firebase.notifications.Android.BadgeIconType.Small
          )
          .android.setDefaults(firebase.notifications.Android.Defaults.All);

        // let msgNotRead = this.props.messages.msgNotRead;
        // let dataNotRead = this.props.notification.dataNotRead;
        // let sum = msgNotRead + dataNotRead;

        // if (notification.data.key && notification.data.key === 'message') {
        //   this.props.messagesActions.setNotRead(msgNotRead + 1);
        //   firebase.notifications().setBadge(sum + 1);

        //   let routeName = NavigationService.getCurrentRouteName();
        //   if (routeName && routeName !== 'MessageDetailScreen') {
        //     firebase.notifications().displayNotification(notification);
        //   }
        // } else {
        //   this.props.notificationActions.setNotRead(dataNotRead + 1);
        //   firebase.notifications().setBadge(sum + 1);

        //   firebase.notifications().displayNotification(notification);
        // }
        firebase.notifications().displayNotification(notification);
      });

    /*
     * If your app is closed,
     * you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      // this._goToNotification(notificationOpen.notification.data);
      firebase
        .notifications()
        .removeDeliveredNotification(
          notificationOpen.notification.notificationId
        );
    }

    const channel = new firebase.notifications.Android.Channel(
      "kindie-channel",
      "Kindie Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("Kindie Channel");

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is using,
     * you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification) => {
        // let tmp = (Object.keys(notification.data).length === 0 && notification.data.constructor === Object) ? null : notification.data;
        // let indexTab = -1;
        // let routeName = '';
        // if (this.navigator._navigation.state.routes.length == 1) {
        //   indexTab = this.navigator._navigation.state.routes[0].routes[0].index;
        // }
        // switch (indexTab) {
        //   case 0:
        //     routeName = 'Home';
        //     break;
        //   case 1:
        //     routeName = 'Message';
        //     break;
        //   case 2:
        //     routeName = 'News';
        //     break;
        //   default:
        //     routeName = 'Notification';
        //     break;
        // }
        // if (routeName != '') NavigationService.navigate(routeName, { data: tmp });
      });

    /*
     * If your app is in the foreground, or background,
     * you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        this._goToNotification(notificationOpen.notification.data);
        firebase
          .notifications()
          .removeDeliveredNotification(
            notificationOpen.notification.notificationId
          );
      });
  };

  _goToNotification = (data) => {
    // Check if data == {} return null
    let tmp =
      Object.keys(data).length === 0 && data.constructor === Object
        ? null
        : data;
    let msgNotRead = this.props.messages.msgNotRead;
    let dataNotRead = this.props.notification.dataNotRead;
    let sumBadge = msgNotRead + dataNotRead;

    if (data.key && data.key === "message") {
      NavigationService.navigate("Message", {
        dataFromNotification: tmp,
      });
    } else {
      if (Number(dataNotRead) > 0) {
        this.props.notificationActions.setNotRead(dataNotRead - 1);
        firebase.notifications().setBadge(sumBadge - 1);
      }

      NavigationService.navigate("NotificationDetail", {
        data: tmp,
      });
    }
  };

  _onSkipUpdateVersionCode = () => {
    this.setState({
      _loading: false,
      _needUpdate: false,
      _errorHelper: "",
      _errorHelper2: "",
      _latestVersion: "",
      _linkToStore: "",
    });
  };

  _onGoToStore = () => {
    Linking.openURL(this.state._linkToStore);
    this.setState({
      _loading: false,
      _needUpdate: false,
      _errorHelper: "",
      _errorHelper2: "",
      _latestVersion: "",
      _linkToStore: "",
    });
  };

  /** LIFE CYCLE */
  componentDidMount() {
    SplashScreen.hide();
    this._createNotificationListeners();
    this._onSkipUpdateVersionCode();
  }

  UNSAFE_componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  /** RENDER */
  render() {
    return (
      <View style={styles.con}>
        <SafeAreaView
          style={styles.con}
          forceInset={{ bottom: "never", top: "never" }}
        >
          {!this.state._loading ? (
            <AppContainer
              refs={(nav) => {
                this.navigator = nav;
                NavigationService.setTopLevelNavigator(nav);
              }}
              uriPrefix={"/app"}
              screenProps={this.props}
            />
          ) : (
            <Image
              style={styles.container}
              source={ASSETS.imgBackground}
              blurRadius={Platform.OS === "android" ? 5 : 10}
            ></Image>
          )}
        </SafeAreaView>

        <CInnerLoading visible={this.props.isLoading} />

        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          useNativeDriver={true}
          isVisible={this.state._needUpdate}
          onBackdropPress={() => {}}
          onBackButtonPress={() => {}}
        >
          <View style={DEVICE.gStyle.full_center}>
            <View style={styles.con_modal_content}>
              <Image
                style={{ height: Helpers.wS("30%"), width: Helpers.wS("30%") }}
                source={ASSETS.image_speaker}
                resizeMode={"contain"}
              />

              <View style={styles.con_modal_header}>
                <CText
                  style={{
                    color: "black",
                    fontSize: Helpers.fS(20),
                    fontFamily: DEVICE.fontBold,
                    textAlign: "center",
                  }}
                  i18nKey={"title_need_update"}
                />
              </View>

              <View style={styles.con_modal_body}>
                {this.state._errorHelper !== "" && (
                  <CText
                    style={{
                      color: "black",
                      fontSize: Helpers.fS(16),
                      fontFamily: DEVICE.fontRegular,
                      textAlign: "center",
                    }}
                    numberOfLines={10}
                    i18nKey={this.state._errorHelper}
                  />
                )}
                {this.state._latestVersion !== "" && (
                  <CText
                    style={{
                      color: "black",
                      fontSize: Helpers.fS(16),
                      fontFamily: DEVICE.fontBold,
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    ({this.state._latestVersion}).
                  </CText>
                )}
              </View>
              {this.state._errorHelper2 !== "" && (
                <CText
                  style={{
                    color: "black",
                    fontSize: Helpers.fS(16),
                    fontFamily: DEVICE.fontRegular,
                    textAlign: "center",
                  }}
                  numberOfLines={10}
                  i18nKey={this.state._errorHelper2}
                />
              )}

              <View style={styles.con_modal_footer}>
                <TouchableOpacity activeOpacity={0.5} onPress={this._onSkip}>
                  <View style={styles.con_btn}>
                    <CText
                      style={{
                        color: "#ffffff",
                        fontSize: Helpers.fS(16),
                        fontFamily: DEVICE.fontRegular,
                        textAlign: "center",
                      }}
                      i18nKey={"skip"}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this._onGoToStore}
                >
                  <View style={styles.con_btn}>
                    <CText
                      style={{
                        color: "#ffffff",
                        fontSize: Helpers.fS(16),
                        fontFamily: DEVICE.fontMedium,
                        textAlign: "center",
                      }}
                      i18nKey={"txtUpdate"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  con: { flex: 1 },

  con_modal: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  con_modal_content: {
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    maxHeight: Helpers.hS("100%"),
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  con_modal_header: {
    justifyContent: "center",
    maxHeight: Helpers.hS("10%"),
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },
  con_modal_body: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  con_modal_footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  con_btn: [
    {
      borderRadius: 5,
      paddingHorizontal: 10,
      width: Helpers.wS("30%"),
      alignItems: "center",
      backgroundColor: COLOR.primaryButton,
    },
    { paddingVertical: 10 },
  ],
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.loading.isLoading,
    notification: state.notification,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
