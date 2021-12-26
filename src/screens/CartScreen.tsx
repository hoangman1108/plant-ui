import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Screen from './Screen';
import AppText from '../components/AppText';
import HeaderTab from '../components/HeaderTab';
import colors from '../config/colors';
import { AppNavigatorProps } from '../navigation/types';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state: any) => state.cartReducer);
  console.log('CartScreen - cartReducer: ', cartReducer);
  const { cartItems } = cartReducer;

  return (
    <Screen>
      <View style={{ marginTop: 20, paddingLeft: 16 }}>
        <HeaderTab>Giỏ Hàng</HeaderTab>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText>This is Shipping-Cart Screen</AppText>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
