import React from "react";

import { authStack } from "../config/navigator";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import forget_pass from "../screens/forget_pass";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={authStack.login}
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.login}
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.login_mobile}
        component={Login}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.register}
        component={Register}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.forgot}
        component={forget_pass}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
