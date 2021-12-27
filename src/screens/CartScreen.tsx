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
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems } = cartReducer;
  console.log('CartScreen - cartReducer: ', cartItems);

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
              textAlign: 'center',
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 5,
                      backgroundColor: '#rgba(210, 235, 245, 0.5)',
                      borderColor: 'c0e3f2',
                      marginBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          paddingRight: 12,
                        }}
                      >
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
                      <View
                        style={{
                          paddingRight: 12,
                        }}
                      >
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
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          removeFromCartHandler(cartItem.productId)
                        }
                      >
                        <AntDesign name='delete' size={32} color='#dc3545' />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginBottom: 16 }}>
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
              <AppText style={styles.fontNormal}>
                Tổng Cộng ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Sản Phẩm
              </AppText>
              <AppText style={[styles.fontNormal, { marginTop: 2 }]}>
                $
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
                  textAlign: 'center',
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
  fontSmall: {
    fontSize: 18,
  },
  fontNormal: {
    fontSize: 22,
  },
});

export default CartScreen;
