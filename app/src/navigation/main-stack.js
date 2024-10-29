import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeTabs from './home-tabs';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Intro'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeTabs"
        component={HomeTabs}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
