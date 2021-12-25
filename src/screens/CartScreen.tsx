import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Screen from './Screen';
import AppText from '../components/AppText';
import HeaderTab from '../components/HeaderTab';
import colors from '../config/colors';
import data from '../config/data';
import { AppNavigatorProps } from '../navigation/types';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const cartProducts = data.slice(5);

  return (
    <Screen>
      <View style={{ marginTop: 20, paddingLeft: 16 }}>
        <HeaderTab>Giỏ Hàng</HeaderTab>
      </View>
      <AppText>This is Shipping-Cart Screen</AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
