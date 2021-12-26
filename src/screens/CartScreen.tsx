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
import numberFormat from '../util/formatNumberMoney';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const CartScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems } = cartReducer;
  console.log('CartScreen - cartReducer: ', cartItems);

  return (
    <Screen>
      <View style={{ marginTop: 20, paddingLeft: 22 }}>
        <HeaderTab>Giỏ Hàng</HeaderTab>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <View style={{ paddingVertical: 40, paddingHorizontal: 22 }}>
            <View
              style={{
                backgroundColor: '#d2ebf5',
                borderColor: 'c0e3f2',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AppText style={{ color: '#10516c', fontWeight: 'bold' }}>
                Your cart is emty
              </AppText>
            </View>
          </View>
        ) : (
          <View style={{ paddingVertical: 40, paddingHorizontal: 22 }}>
            {cartItems.map((cartItem: any) => {
              return (
                <View key={cartItem.productId}>
                  <View style={{ marginBottom: 8 }}>
                    <Image
                      source={{ uri: cartItem.image }}
                      style={{ width: '100%', height: 220, borderRadius: 20 }}
                    />
                  </View>
                  <View style={{ marginBottom: 3 }}>
                    <AppText>{cartItem.name}</AppText>
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <AppText>$ {numberFormat(cartItem.price)}</AppText>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
