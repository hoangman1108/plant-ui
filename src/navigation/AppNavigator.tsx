import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigator from './HomeNavigator';
import { AppNavigatorProps } from './types';
import { PlantDetailScreen, CartScreen, PlaceOrderScreen } from '../screens';

const Stack = createStackNavigator<AppNavigatorProps>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='Home' component={HomeNavigator} />
    <Stack.Screen name='Cart' component={CartScreen} />
    <Stack.Screen
      name='PlantDetail'
      component={PlantDetailScreen}
      options={{
        headerTransparent: true,
      }}
    />
    <Stack.Screen name='PlaceOrder' component={PlaceOrderScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
