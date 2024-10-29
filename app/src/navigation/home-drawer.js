import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";

import Home from "../screens/home";
import Sidebar from "../containers/Sidebar";
import { homeDrawer } from "../config/navigator";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

const WIDTH_DRAWER = width * 0.78;

const drawerStyle = {
  width: WIDTH_DRAWER,
};

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName={homeDrawer.home}
      screenOptions={{ headerShown: true }}
      drawerStyle={drawerStyle}
    >
      <Drawer.Screen name={homeDrawer.home} component={Home} />
    </Drawer.Navigator>
  );
}
