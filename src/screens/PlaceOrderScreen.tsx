import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import Screen from './Screen';
import AppText from '../components/AppText';
import HeaderTab from '../components/HeaderTab';
import colors from '../config/colors';
import { AppNavigatorProps } from '../navigation/types';
import { AntDesign } from '@expo/vector-icons';
import numberFormat from '../util/formatNumberMoney';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { addToCart, removeFromCart } from '../actions/cartActions';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const PlaceOrderScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems, shippingAddress } = cartReducer;
  console.log('PlaceOrderScreen - cartReducer: ', cartReducer);

  const handleAddToCart = (product, qty) => {
    if (qty === 0) return;
    if (qty > product.countInStock) return;
    dispatch(addToCart(product, qty));
  };

  const removeFromCartHandler = (productID) => {
    console.log('CartScreen - productId: ', productID);
    dispatch(removeFromCart(productID));
  };

  return (
    <Screen>
      <View style={{ marginTop: 20 }}>
        <HeaderTab navigation={navigation}>ĐẶT HÀNG</HeaderTab>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      >
        {cartItems.length === 0 ? (
          <View style={{ paddingVertical: 40, paddingHorizontal: 22 }}>
            <View
              style={{
                backgroundColor: '#d2ebf5',
                borderColor: 'c0e3f2',
                height: 60,
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
          <View style={{ paddingHorizontal: 22 }}>
            <AppText
              style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 6 }}
            >
              GIAO HÀNG
            </AppText>
            <AppText>Địa chỉ: {shippingAddress}</AppText>
            <Divider width={2} style={{ marginVertical: 14 }}></Divider>
            <AppText
              style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 8 }}
            >
              DANH SÁCH SẢN PHẨM
            </AppText>
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
                  <View style={{ marginBottom: 3 }}>
                    <AppText>
                      {cartItem.qty} x ${numberFormat(cartItem.price)} = $
                      {numberFormat(cartItem.qty * cartItem.price)} VNĐ
                    </AppText>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Divider width={2}></Divider>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ paddingHorizontal: 22, marginBottom: 16 }}>
          <View style={styles.contentBox}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 5,
              }}
            >
              <AppText style={[styles.fontNormal, { fontWeight: 'bold' }]}>
                THÔNG TIN ĐƠN HÀNG
              </AppText>
            </View>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Sản Phẩm</AppText>
            <AppText>
              $
              {numberFormat(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}{' '}
              VNĐ
            </AppText>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Phí Ship</AppText>
            <AppText>$0.00 VNĐ</AppText>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Thuế</AppText>
            <AppText>$0.00 VNĐ</AppText>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Tổng Cộng</AppText>
            <AppText>
              $
              {numberFormat(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}{' '}
              VNĐ
            </AppText>
          </View>
          <View style={styles.contentBoxV2}>
            <TouchableOpacity
              activeOpacity={cartItems.length === 0 ? 1 : 0.7}
              onPress={() => {
                if (cartItems.length !== 0) {
                  navigation.navigate('Cart');
                } else {
                  return;
                }
              }}
            >
              <AppText
                style={{
                  backgroundColor:
                    cartItems.length !== 0
                      ? colors.active
                      : '#rgb(107,107,107)',
                  color: colors.white,
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderRadius: 30,
                  textAlign: 'center',
                }}
              >
                ĐẶT HÀNG
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentBox: {
    flexDirection: 'column',
    border: `1px solid ${colors.grey}`,
    padding: 10,
    marginTop: 10,
  },
  contentBoxV2: {
    flexDirection: 'column',
    border: `1px solid ${colors.grey}`,
    borderTopWidth: '0px',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contenBoxV3: {
    flexDirection: 'row',
    border: `1px solid ${colors.grey}`,
    borderTopWidth: '0px',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSmall: {
    fontSize: 18,
  },
  fontNormal: {
    fontSize: 22,
  },
});

export default PlaceOrderScreen;
