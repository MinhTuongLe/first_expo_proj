/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from "react";

// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

// import {rootSwitch} from 'src/config/navigator';
// import MainStack from './main-stack';
// import SplashScreen from 'react-native-splash-screen';
/**
 * @Description: ROOT APP
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
// import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-fontawesome-pro";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";

/** COMMON */
import { DEVICE, COLOR } from "../config";
import Modules from "../config/modules";
import Helpers from "../helpers";
/** COMPONENT */
import CText from "../components/CText";
/** SCREENS */
import IntroScreen from "../screens/intro";
import LoginScreen from "../screens/login";
import ForgetPassScreen from "../screens/forget_pass/";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile/";
import NewsDetailScreen from "../screens/news/detail";
import NewsCMSScreen from "../screens/newsCMS";
import NewsCMSDetailScreen from "../screens/newsCMS/detail";
import NotificationScreen from "../screens/notification";
import NotificationDetailScreen from "../screens/notification/detail";
import ScheduleAndMenuScreen from "../screens/schedule_menu";
import DayOffScreen from "../screens/dayOff";
import KidInfoScreen from "../screens/kid_info";

import MessageScreen from "../screens/message";
import MessageDetailScreen from "../screens/message/detail";
import ViewUploadImageMessage from "../screens/message/new";
// ATTENDANCE
import AttendanceScreen from "../screens/attendance";
// CONTACT LIST
import ContactListScreen from "../screens/contact";
// HEALTH
import ParentHealthScreen from "../screens/health/health_parent";
import TeacherHealthScreen from "../screens/health/health_teacher";
import InfoHealthStudentScreen from "../screens/health/health_teacher/infoHealth";
import AddSymptomScreen from "../screens/health/health_teacher/addSymptom";
import AddHeightWeightScreen from "../screens/health/health_teacher/addHeightWeight";
// FEE INVOICE
import TeacherFeeInvoiceScreen from "../screens/fee_invoice/teacher";
import FeeInvoiceDetailScreen from "../screens/fee_invoice/detail";
import FeeInvoiceSummaryScreen from "../screens/fee_invoice/summary";
import FeeInvoicePaypalScreen from "../screens/fee_invoice/paypal_payment";
import TeacherFeeInvoiceListScreen from "../screens/fee_invoice/teacher/list";
import ParentFeeInvoiceScreen from "../screens/fee_invoice/parent";
// ALBUM
import AlbumScreen from "../screens/album";
import AlbumDetailScreen from "../screens/album/detail";
import NewAlbumScreen from "../screens/album/new";
import UploadAlbumScreen from "../screens/album/new/uploadAlbum";
// SIDE MENU
import SideMenu from "../screens/partials/side_menu";
import SettingScreen from "../screens/setting";
// TEMP
import PickUpDetailScreenTmp from "../screens/attendance/pickup";
import HistoryAttendanceScreen from "../screens/attendance/history";
import HistoryTeacherScreen from "../screens/history/teacher";
import HistoryParentScreen from "../screens/history/parent";
//TRACKING
import TrackingScreen from "../screens/tracking";
//DRIVER
import DriverScreen from "../screens/driver";
import PickUpDetailScreenDriver from "../screens/driver/pickup";
import DriverHistoryAttendanceScreen from "../screens/driver/history";
//FEEDBACK
import AddFeedbackScreen from "../screens/feedback/add";
import ListFeedbackScreen from "../screens/feedback/list";
import ContactFeedbackScreen from "../screens/feedback/contact";
import DetailFeedbackScreen from "../screens/feedback/detail";
import { backgroundColor } from "../components/CCalendar/style";

const styles = {
  con_tabbar_item: {
    borderTopColor: "#605F60",
    width: !Modules.messages ? Helpers.wS("33.33%") : Helpers.wS("25%"),
  },
  con_noti_not_read: {
    position: "absolute",
    top: 0,
    right: 20,
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 105,
  },
  con_tabbar_item_ipx: { height: Helpers.hS("9.5%") },

  txt_noti_not_read: {
    fontFamily: DEVICE.fontRegular,
    color: "#ffffff",
    fontSize: Helpers.fS(10),
  },
  txt_tab_bar: {
    fontFamily: DEVICE.fontRegular,
    color: COLOR.text_1,
    fontSize: Helpers.fS(10),
    paddingTop: 5,
  },
};

export class TabBarMain extends React.PureComponent {
  /** RENDER */
  render() {
    let { navigation, notification, messages, state } = this.props;
    let onPress = (routeName) => navigation.navigate(routeName);
    let dataNotRead = notification.dataNotRead;
    let msgNotRead = messages.msgNotRead;

    return (
      <View
        style={{
          paddingVertical: Platform.OS === "ios" ? 5 : 10,
          backgroundColor:
            Platform.OS === "ios" ? "transparent" : COLOR.backgroundSec,
          elevation: 2,
          borderColor: COLOR.backgroundColorNote,
          borderTopWidth: 0.3,
          height:
            Platform.OS === "ios" && Helpers.isIphoneX()
              ? Helpers.hS("10%")
              : Helpers.hS("8%"),
          flexDirection: "row",
        }}
      >
        {state.routes.length > 0 &&
          state.routes.map((e, i) => {
            return (
              <TouchableOpacity
                key={i.toString()}
                style={[
                  this.props.style,
                  DEVICE.gStyle.column_align_center,
                  Helpers.isIphoneX()
                    ? DEVICE.gStyle.column_justify_start
                    : DEVICE.gStyle.column_justify_center,
                  styles.con_tabbar_item,
                ]}
                activeOpacity={0.8}
                onPress={() => onPress(e.name)}
              >
                <Icon
                  name={e.params.icon}
                  color={
                    state.index === i
                      ? COLOR.primaryApp
                      : COLOR.inactiveTintColor
                  }
                  size={Helpers.fS(25)}
                  type={"solid"}
                />
                <CText
                  style={[
                    styles.txt_tab_bar,
                    {
                      color:
                        state.index === i
                          ? COLOR.primaryApp
                          : COLOR.inactiveTintColor,
                    },
                  ]}
                  i18nKey={e.params.name}
                />

                {i === state.routes.length - 3 && Number(msgNotRead) > 0 && (
                  <View style={styles.con_noti_not_read}>
                    <Text style={styles.txt_noti_not_read}>
                      {msgNotRead > 9 ? "+9" : msgNotRead}
                    </Text>
                  </View>
                )}

                {i === state.routes.length - 1 && Number(dataNotRead) > 0 && (
                  <View style={styles.con_noti_not_read}>
                    <Text style={styles.txt_noti_not_read}>
                      {dataNotRead > 9 ? "+9" : dataNotRead}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }
}

const TabBarContainer = connect((state) => ({
  notification: state.notification,
  messages: state.messages,
}))(TabBarMain);

/** INIT TAB-BAR OF APP */
const StackRootTab = createBottomTabNavigator();

function RootTab() {
  return (
    <StackRootTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        tabBarActiveTintColor: COLOR.primaryApp,
        tabBarInactiveTintColor: COLOR.inactiveTintColor,
      }}
      tabBar={(props) => {
        if (Platform.OS === "ios") {
          return (
            <BlurView
              style={[
                {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              ]}
              blurType={"prominent"}
            >
              <TabBarContainer {...props} />
            </BlurView>
          );
        } else {
          return <TabBarContainer {...props} />;
        }
      }}
    >
      <StackRootTab.Screen
        name="HomeTab"
        component={HomeScreen}
        initialParams={{ icon: "home", name: "txtTab1" }}
      ></StackRootTab.Screen>
      <StackRootTab.Screen
        name="Message"
        component={MessageScreen}
        initialParams={{
          icon: "comment",
          name: "txtTab2",
        }}
      ></StackRootTab.Screen>
      <StackRootTab.Screen
        name="RootNews"
        component={NewsCMSScreen}
        initialParams={{
          icon: "newspaper",
          name: "txtTab3",
        }}
      ></StackRootTab.Screen>
      <StackRootTab.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={{ icon: "bell", name: "txtTab4" }}
      ></StackRootTab.Screen>
    </StackRootTab.Navigator>
  );
}

const StackDrawer = createDrawerNavigator();
function RootDrawer() {
  return (
    <StackDrawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        drawerType: "front",
        headerShown: false,
        swipeEdgeWidth: 150,
        drawerStyle: {
          width: Helpers.wS("75%"),
          backgroundColor: COLOR.backgroundSec,
        },
      }}
    >
      <StackDrawer.Screen
        name="HomeDrawer"
        component={RootTab}
      ></StackDrawer.Screen>
    </StackDrawer.Navigator>
  );
}

const StackDriver = createDrawerNavigator();
function RootDriver() {
  return (
    <StackDriver.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        drawerType: "slide",
        drawerStyle: {
          width: Helpers.wS("84%"),
          backgroundColor: "#ffffff",
        },
        drawerActiveTintColor: "black",
        drawerActiveBackgroundColor: "rgba(0,0,0,.5)",
        drawerInactiveTintColor: "black",
        drawerInactiveBackgroundColor: "transparent",
      }}
    >
      <StackDriver.Screen name="Home" component={DriverScreen} />
    </StackDriver.Navigator>
  );
}

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

function RootStack({ isLoading, setting }) {
  /**
   * Hide Splash after fetch data
   */
  // if (!isLoading) {
  //   SplashScreen.hide();
  // }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgetPass" component={ForgetPassScreen} />
      <Stack.Screen name="RootDrawer" component={RootDrawer} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
      />
      <Stack.Screen
        name="MessageDetailScreen"
        component={MessageDetailScreen}
      />
      <Stack.Screen
        name="UploadImageMessage"
        component={ViewUploadImageMessage}
      />
      <Stack.Screen name="ContactList" component={ContactListScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="NewsCMSDetail" component={NewsCMSDetailScreen} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
      <Stack.Screen name="NewAlbum" component={NewAlbumScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Menu" component={ScheduleAndMenuScreen} />
      <Stack.Screen name="Schedule" component={ScheduleAndMenuScreen} />
      <Stack.Screen name="DayOff" component={DayOffScreen} />
      <Stack.Screen name="TeacherHealth" component={TeacherHealthScreen} />
      <Stack.Screen name="ParentHealth" component={ParentHealthScreen} />
      <Stack.Screen
        name="InfoHealthStudent"
        component={InfoHealthStudentScreen}
      />
      <Stack.Screen name="AddSymptom" component={AddSymptomScreen} />
      <Stack.Screen name="AddHeightWeight" component={AddHeightWeightScreen} />
      <Stack.Screen
        name="TeacherFeeInvoice"
        component={TeacherFeeInvoiceScreen}
      />
      <Stack.Screen
        name="FeeInvoiceDetail"
        component={FeeInvoiceDetailScreen}
      />
      <Stack.Screen
        name="FeeInvoiceSummary"
        component={FeeInvoiceSummaryScreen}
      />
      <Stack.Screen
        name="FeeInvoicePaypal"
        component={FeeInvoicePaypalScreen}
      />
      <Stack.Screen
        name="TeacherFeeInvoiceList"
        component={TeacherFeeInvoiceListScreen}
      />
      <Stack.Screen
        name="ParentFeeInvoice"
        component={ParentFeeInvoiceScreen}
      />
      <Stack.Screen name="Album" component={AlbumScreen} />
      <Stack.Screen name="UploadAlbum" component={UploadAlbumScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="KidInfo" component={KidInfoScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen
        name="PickUpDetailScreenTmp"
        component={PickUpDetailScreenTmp}
      />
      <Stack.Screen
        name="HistoryAttendance"
        component={HistoryAttendanceScreen}
      />
      <Stack.Screen name="HistoryTeacher" component={HistoryTeacherScreen} />
      <Stack.Screen name="HistoryParent" component={HistoryParentScreen} />
      <Stack.Screen
        name="DriverHistoryAttendance"
        component={DriverHistoryAttendanceScreen}
      />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="RootDriver" component={RootDriver} />
      <Stack.Screen name="DriverScreen" component={DriverScreen} />
      <Stack.Screen
        name="PickUpDetailScreenDriver"
        component={PickUpDetailScreenDriver}
      />
      <Stack.Screen name="AddFeedback" component={AddFeedbackScreen} />
      <Stack.Screen name="ListFeedback" component={ListFeedbackScreen} />
      <Stack.Screen name="ContactFeedback" component={ContactFeedbackScreen} />
      <Stack.Screen name="DetailFeedback" component={DetailFeedbackScreen} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(RootStack);
