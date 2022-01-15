import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import Screen from './Screen';
import AppText from '../components/AppText';
import HeaderTab from '../components/HeaderTab';
import colors from '../config/colors';
import { AppNavigatorProps } from '../navigation/types';
import numberFormat from '../util/formatNumberMoney';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const OrderDetailScreen: React.FC<Props> = ({ navigation }) => {
  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems, shippingAddress } = cartReducer;
  console.log('OrderDetailScreen - cartReducer: ', cartReducer);

  return (
    <Screen>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FontAwesome
            style={{ position: 'absolute', left: 20 }}
            name='chevron-left'
            size={28}
            color='rgba(0,0,0,.69)'
            onPress={() => navigation.navigate('Plants')}
          />
          <AppText
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            ĐƠN HÀNG
          </AppText>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      >
        <View style={{ paddingHorizontal: 22 }}>
          <AppText
            style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 6 }}
          >
            ĐƠN HÀNG
          </AppText>
          <AppText>Khách hàng: Hoàng Nghĩa</AppText>
          <AppText>Mã đơn hàng: 5f776ab</AppText>
          <View style={{ marginVertical: 10 }}></View>
          <AppText
            style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 6 }}
          >
            GIAO HÀNG
          </AppText>
          <AppText>Địa chỉ: {shippingAddress}</AppText>
          <AppText>Trạng thái: Đang vận chuyển</AppText>
          <View style={{ marginVertical: 10 }}></View>
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
                  <AppText style={{ fontWeight: 'bold' }}>
                    {cartItem.qty} x {numberFormat(cartItem.price)} ={' '}
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
                paddingBottom: 5
              }}
            >
              <AppText style={[styles.fontNormal, { fontWeight: 'bold' }]}>
                THÔNG TIN ĐƠN HÀNG
              </AppText>
            </View>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Sản Phẩm</AppText>
            <AppText style={{ fontWeight: 'bold' }}>
              {numberFormat(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}{' '}
              VNĐ
            </AppText>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Phí Ship</AppText>
            <AppText style={{ fontWeight: 'bold' }}>0.00 VNĐ</AppText>
          </View>
          <View style={styles.contenBoxV3}>
            <AppText>Thuế</AppText>
            <AppText style={{ fontWeight: 'bold' }}>0.00 VNĐ</AppText>
          </View>
          <View style={styles.contentBoxV2}>
            <AppText>Tổng Cộng</AppText>
            <AppText style={{ fontWeight: 'bold' }}>
              {numberFormat(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}{' '}
              VNĐ
            </AppText>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentBox: {
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    marginTop: 10
  },
  contentBoxV2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20
  },
  contenBoxV3: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fontSmall: {
    fontSize: 18
  },
  fontNormal: {
    fontSize: 22
  }
});

export default OrderDetailScreen;
