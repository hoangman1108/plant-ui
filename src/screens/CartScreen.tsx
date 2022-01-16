import React, { useEffect, useState } from 'react';
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
import { FontAwesome } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems } = cartReducer;
  console.log('CartScreen - cartReducer: ', cartItems);

  const [showAlert, setShowAlert] = useState(false);
  const [removeId, setRemoveId] = useState();
  const [forceRerender, setForceRerender] = useState(1);

  const hideAlert = () => {
    setShowAlert(false);
  };

  const startShowAlert = () => {
    console.log('startShowAlert func - showAlert: ', showAlert);

    setShowAlert(true);
  };

  const handleAddToCart = (product, qty) => {
    if (qty === 0) {
      setRemoveId(product.productId);
      setForceRerender((preState) => preState + 1);
      console.log('CartScreen - removeId', removeId);
      startShowAlert();
      return;
    } else {
      hideAlert();
    }
    if (qty > product.countInStock) return;
    dispatch(addToCart(product, qty));
  };

  const removeFromCartHandler = (productID) => {
    console.log('CartScreen - productId: ', productID);
    dispatch(removeFromCart(productID));
  };

  return (
    <Screen style={[styles.screen, { position: 'relative' }]}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title='Xoá sản phẩm'
        message='Bạn thật sự muốn xoá sản phẩm!'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText='Không, huỷ thao tác'
        confirmText='Có, xoá sản phẩm'
        confirmButtonColor='#DD6B55'
        alertContainerStyle={{
          zIndex: 999,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: '100%!important'
        }}
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          removeFromCartHandler(removeId);
          hideAlert();
        }}
      />
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
            GIỎ HÀNG
          </AppText>
        </View>
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
                alignItems: 'center'
              }}
            >
              <AppText style={{ color: '#10516c', fontWeight: 'bold' }}>
                Your cart is emty
              </AppText>
            </View>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 22 }}>
            {cartItems.map((cartItem: any) => {
              return (
                <View
                  key={cartItem.productId}
                  style={{ marginBottom: 16, marginTop: 6 }}
                >
                  <View style={{ marginBottom: 8 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PlantDetail', { item: cartItem })
                      }
                    >
                      <Image
                        source={{ uri: cartItem.image }}
                        style={{
                          width: '100%',
                          height: 220,
                          borderRadius: 20
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginBottom: 3 }}>
                    <AppText>{cartItem.name}</AppText>
                  </View>
                  <View style={{ marginBottom: 6 }}>
                    <AppText style={{ fontWeight: 'bold' }}>
                      {cartItem.qty} x {numberFormat(cartItem.price)} ={' '}
                      {numberFormat(cartItem.qty * cartItem.price)} VNĐ
                    </AppText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 5,
                      backgroundColor: '#rgba(210, 235, 245, 0.5)',
                      borderColor: '#adacac',
                      marginBottom: 16,
                      borderRadius: 5,
                      borderStyle: 'solid',
                      borderWidth: 0.3
                    }}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          handleAddToCart(cartItem, cartItem.qty - 1)
                        }
                      >
                        <AntDesign
                          name='minussquareo'
                          size={32}
                          color='#rgba(12, 12, 12, 0.8)'
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <AppText>{cartItem.qty}</AppText>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          handleAddToCart(cartItem, cartItem.qty + 1)
                        }
                      >
                        <AntDesign
                          name='plussquareo'
                          size={32}
                          color='#rgba(12, 12, 12, 0.8)'
                        />
                      </TouchableOpacity>
                    </View>
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
                paddingBottom: 5
              }}
            >
              <AppText style={styles.fontNormal}>
                Tổng Cộng ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Sản Phẩm
              </AppText>
              <AppText
                style={[
                  styles.fontNormal,
                  { marginTop: 2, fontWeight: 'bold' }
                ]}
              >
                {numberFormat(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )
                )}{' '}
                VNĐ
              </AppText>
            </View>
          </View>
          <View style={styles.contentBoxV2}>
            <TouchableOpacity
              activeOpacity={cartItems.length === 0 ? 1 : 0.7}
              onPress={() => {
                if (cartItems.length !== 0) {
                  navigation.navigate('ShippingAddress');
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
                  textAlign: 'center'
                }}
              >
                TIẾN HÀNH ĐẶT HÀNG
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff'
  },
  contentBox: {
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    marginTop: 10
  },
  contentBoxV2: {
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  fontSmall: {
    fontSize: 18
  },
  fontNormal: {
    fontSize: 22
  }
});

export default CartScreen;
