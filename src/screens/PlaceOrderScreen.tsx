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
import numberFormat from '../util/formatNumberMoney';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const PlaceOrderScreen: React.FC<Props> = ({ navigation }) => {
  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems, shippingAddress } = cartReducer;
  console.log('PlaceOrderScreen - cartReducer: ', cartReducer);

  return (
    <Screen>
      <View style={{ marginTop: 20 }}>
        <HeaderTab navigation={navigation}>ĐẶT HÀNG</HeaderTab>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      >
        <View style={{ paddingHorizontal: 22 }}>
          <AppText
            style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 6 }}
          >
            GIAO HÀNG
          </AppText>
          <AppText>Địa chỉ: {shippingAddress}</AppText>
          <View style={{ marginVertical: 12 }}></View>
          <AppText
            style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 8 }}
          >
            DANH SÁCH SẢN PHẨM
          </AppText>
          {cartItems.map((cartItem: any) => {
            return (
              <View key={cartItem.productId}>
                <View style={{ marginBottom: 8 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PlantDetail', { item: cartItem })
                    }
                  >
                    <Image
                      source={{ uri: cartItem.image }}
                      style={{ width: '100%', height: 220, borderRadius: 20 }}
                    />
                  </TouchableOpacity>
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
                <View style={{ marginVertical: 10 }}></View>
              </View>
            );
          })}
        </View>
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
                  navigation.navigate('OrderDetail');
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contenBoxV3: {
    flexDirection: 'row',
    border: `1px solid ${colors.grey}`,
    borderTopWidth: '0px',
    borderBottomWidth: '0px',
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
