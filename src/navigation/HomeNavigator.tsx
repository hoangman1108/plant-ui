import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeNavigatorProps } from './types';
import colors from '../config/colors';
import { PlantsScreen, TempScreen, CartScreen } from '../screens';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AccountScreen from '../screens/Account';
import { PlaceOrderScreen } from '../screens';

const Tab = createBottomTabNavigator<HomeNavigatorProps>();

const HomeNavigator = () => (
  <Tab.Navigator
    initialRouteName='Plants'
    screenOptions={{
      tabBarLabel: '',
    }}
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.medium,
    }}
  >
    <Tab.Screen
      name='Plants'
      component={PlantsScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <FontAwesome5
            name='home'
            color={color}
            size={size}
            style={styles.icon}
          />
        ),
      }}
    />
    <Tab.Screen
      name='List Category'
      component={TempScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <FontAwesome
            name='list-ul'
            color={color}
            size={size}
            style={styles.icon}
          />
        ),
      }}
    />
    <Tab.Screen
      name='Shopping Cart'
      component={CartScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <FontAwesome
            name='shopping-cart'
            color={color}
            size={size}
            style={styles.icon}
          />
        ),
      }}
    />
    <Tab.Screen
      name='Account'
      component={AccountScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name='account'
            color={color}
            size={size}
            style={styles.icon}
          />
        ),
        title: 'TÀI KHOẢN',
      }}
    />
    {/* <Tab.Screen name='PlaceOrder' component={PlaceOrderScreen} /> */}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    marginTop: 12,
  },
});

export default HomeNavigator;
