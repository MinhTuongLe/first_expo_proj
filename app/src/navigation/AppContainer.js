/**
 * @Description: ROOT APP
 * @Created by ZiniTeam
 * @Date create: 17/01/2019
 */
/** LIBRARY */
import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

/** INIT TAB-BAR OF APP */
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Intro" component={IntroScreen} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};

export default connect(mapStateToProps, null)(AppContainer);
