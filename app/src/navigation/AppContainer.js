/**
 * @Description: ROOT APP
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-fontawesome-pro";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { BlurView } from "expo-blur";
/** COMMON */
import { DEVICE, COLOR } from "../config";
import Helpers from "../helpers";
import Modules from "../config/modules";
/** COMPONENT */
import CText from "../components/CText";
/** SCREENS */
import IntroScreen from "../screens/intro";
import LoginScreen from "../screens/login";
import ForgetPassScreen from "../screens/forget_pass";
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";
import MessageScreen from "../screens/message";
import MessageDetailScreen from "../screens/message/detail";
import NewsDetailScreen from "../screens/news/detail";
import NewsCMSScreen from "../screens/newsCMS";
import NewsCMSDetailScreen from "../screens/newsCMS/detail";
import NotificationScreen from "../screens/notification";
import NotificationDetailScreen from "../screens/notification/detail";
import ScheduleAndMenuScreen from "../screens/schedule_menu";
import DayOffScreen from "../screens/dayOff";
import KidInfoScreen from "../screens/kid_info";
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
import FeeInvoiceStripeScreen from "../screens/fee_invoice/paypal_payment";
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
//FEEDBACK
import AddFeedbackScreen from "../screens/feedback/add";
import ListFeedbackScreen from "../screens/feedback/list";
import ContactFeedbackScreen from "../screens/feedback/contact";
import DetailFeedbackScreen from "../screens/feedback/detail";

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
    let { navigation, notification, messages } = this.props;
    let onPress = (routeName) => navigation.navigate(routeName);
    let dataNotRead = notification.dataNotRead;
    let msgNotRead = messages.msgNotRead;

    return (
      <View style={(this.props.style, DEVICE.gStyle.row)}>
        {navigation.state.routes.length > 0 &&
          navigation.state.routes.map((e, i) => {
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
                onPress={() => onPress(e.key)}
              >
                <Icon
                  name={e.params.icon}
                  color={
                    navigation.state.index === i
                      ? this.props.activeTintColor
                      : this.props.inactiveTintColor
                  }
                  size={Helpers.fS(25)}
                  type={"solid"}
                />
                <CText
                  style={[
                    styles.txt_tab_bar,
                    {
                      color:
                        navigation.state.index === i
                          ? this.props.activeTintColor
                          : this.props.inactiveTintColor,
                    },
                  ]}
                  i18nKey={e.params.name}
                />

                {i === navigation.state.routes.length - 3 &&
                  Number(msgNotRead) > 0 && (
                    <View style={styles.con_noti_not_read}>
                      <Text style={styles.txt_noti_not_read}>
                        {msgNotRead > 9 ? "+9" : msgNotRead}
                      </Text>
                    </View>
                  )}

                {i === navigation.state.routes.length - 1 &&
                  Number(dataNotRead) > 0 && (
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
const RootTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      params: { icon: "home", name: "txtTab1" },
    },
    Message: {
      screen: MessageScreen,
      params: { icon: "comment", name: "txtTab2" },
    },
    RootNews: {
      screen: NewsCMSScreen,
      params: { icon: "newspaper", name: "txtTab3" },
    },
    Notification: {
      screen: NotificationScreen,
      params: { icon: "bell", name: "txtTab4" },
    },
  },
  {
    initialRouteName: "Home",
    order: !Modules.messages
      ? ["Home", "RootNews", "Notification"]
      : ["Home", "Message", "RootNews", "Notification"],
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: COLOR.primaryApp,
      inactiveTintColor: COLOR.inactiveTintColor,
      style: {
        paddingVertical: Platform.OS === "ios" ? 5 : 10,
        backgroundColor:
          Platform.OS === "ios" ? "transparent" : COLOR.backgroundMain,
        elevation: 2,
        borderTopWidth: COLOR.backgroundColorNote,
        borderTopWidth: 0.3,
        height:
          Platform.OS === "ios" && Helpers.isIphoneX()
            ? Helpers.hS("10%")
            : Helpers.hS("8%"),
      },
    },
    tabBarComponent: (props) => {
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
    },
  }
);

const Drawer = createDrawerNavigator();

function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "slide",
        drawerWidth: Helpers.wS("84%"),
        drawerBackgroundColor: "#ffffff",
        initialRouteName: "Home",
        contentOptions: {
          activeTintColor: "black",
          activeBackgroundColor: "rgba(0,0,0,.5)",
          inactiveTintColor: "black",
          inactiveBackgroundColor: "transparent",
        },
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose",
        drawerToggleRoute: "DrawerToggle",
        contentComponent: (props) => {
          return <SideMenu props={props} />;
        },
      }}
    >
      <Drawer.Screen name="Home" component={RootTab} />
    </Drawer.Navigator>
  );
}

/** INIT DRAWER OF DRIVER */
const RootDriver = createDrawerNavigator(
  {
    Home: DriverScreen,
  },
  {
    drawerType: "slide",
    drawerWidth: Helpers.wS("84%"),
    drawerBackgroundColor: "#ffffff",
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "rgba(0,0,0,.5)",
      inactiveTintColor: "black",
      inactiveBackgroundColor: "transparent",
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    contentComponent: (props) => {
      return <SideMenu props={props} />;
    },
  }
);

const Stack = createStackNavigator();

function AppContainer() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Intro" component={IntroScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} />
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
      <Stack.Screen name="ParentHealth" component={DayOffScreen} />
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
        name="FeeInvoiceStripe"
        component={FeeInvoiceStripeScreen}
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
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="RootDriver" component={RootDriver} />
      <Stack.Screen name="DriverScreen" component={DriverScreen} />
      <Stack.Screen name="AddFeedback" component={AddFeedbackScreen} />
      <Stack.Screen name="ListFeedback" component={ListFeedbackScreen} />
      <Stack.Screen name="ContactFeedback" component={ContactFeedbackScreen} />
      <Stack.Screen name="DetailFeedback" component={DetailFeedbackScreen} /> */}
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(AppContainer);
