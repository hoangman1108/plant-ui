import React, { useEffect } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  TextInputComponent
} from 'react-native';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { SliderBox } from 'react-native-image-slider-box';
import Screen from './Screen';
import AppButton from '../components/AppButton';
import AppCarousel from '../components/AppCarousel';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { AppNavigatorProps } from '../navigation/types';
import data from '../config/data';
import HeaderTab from '../components/HeaderTab';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import numberFormat from '../util/formatNumberMoney';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps, 'PlantDetail'>;
  route: RouteProp<AppNavigatorProps, 'PlantDetail'>;
}

const PlantDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { name, rating, location, price, image, description, thumnails } =
    route.params.item;

  // useEffect(() => {
  //   document
  //     .querySelector(
  //       "div[dir=auto][class='css-text-901oao r-fontWeight-vw2c0b r-margin-jgcjvd']"
  //     )
  //     ?.remove();
  //   document.querySelector(
  //     "select[data-focusable=true][data-testid='web_picker']"
  //   ).style.height = '30px';
  // }, []);

  return (
    <Screen>
      <View style={{ marginTop: 30 }}>
        <HeaderTab navigation={navigation}>Chi tiết sản phẩm</HeaderTab>
      </View>
      <View style={{ marginTop: 30 }}>
        <SliderBox
          images={thumnails}
          sliderBoxHeight={300}
          autoplay
          circleLoop
          paginationBoxVerticalPadding={20}
          ImageComponentStyle={{
            borderRadius: 15,
            width: '97%',
            marginTop: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22
          }}
          dotColor='#FFEE58'
          inactiveDotColor='#90A4AE'
          resizeMethod={'resize'}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.defaultLayout}>
        <AppText style={styles.name}>{name}</AppText>
        <AppText style={styles.lineHorizontal}></AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={rating}
            size={23}
            ratingContainerStyle={{ margin: 0 }}
          />
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <AppText style={styles.fontSmall}> 99 Đánh giá</AppText>
            <TouchableOpacity>
              <AppText
                style={[
                  styles.fontSmall,
                  {
                    paddingLeft: 12,
                    backgroundColor: '#eeeeee',
                    borderColor: '#555555',
                    borderRadius: 4,
                    borderStyle: 'solid'
                  }
                ]}
              >
                Xem tất cả
                <FontAwesome
                  style={{ paddingLeft: 5 }}
                  name='chevron-right'
                  size={15}
                  color='rgba(0,0,0,.69)'
                />
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        <AppText style={styles.lineHorizontal}></AppText>
        <AppText style={[styles.fontNormal, { fontWeight: 'bold' }]}>
          Giá: {numberFormat(price)} VNĐ
        </AppText>
        <AppText style={styles.lineHorizontal}></AppText>
        <AppText
          style={[
            styles.fontNormal,
            { fontSize: 19, textAlign: 'justify', marginVertical: 1 }
          ]}
        >
          Mô tả: {description}
        </AppText>
        <View style={[styles.contentBox, { marginTop: 28 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5
            }}
          >
            <AppText style={styles.fontNormal}>Giá sản phẩm:</AppText>
            <AppText style={[styles.fontNormal, { fontWeight: 'bold' }]}>
              {numberFormat(price)} VNĐ
            </AppText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5
            }}
          >
            <AppText style={styles.fontNormal}>Trạng thái:</AppText>
            <AppText style={styles.fontNormal}>Còn hàng</AppText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <AppText style={styles.fontNormal}>Chọn số lượng:</AppText>
            <TouchableOpacity>
              <AppText
                style={[
                  styles.fontSmall,
                  {
                    paddingLeft: 12,
                    backgroundColor: '#eeeeee',
                    borderColor: '#555555',
                    borderRadius: 4,
                    borderStyle: 'solid'
                  }
                ]}
              >
                1
                <FontAwesome
                  style={{ padding: 16 }}
                  name='chevron-down'
                  size={15}
                  color='rgba(0,0,0,.69)'
                />
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.contentBoxV2, { marginBottom: 28 }]}>
          <AppText
            style={{
              backgroundColor: colors.active,
              color: colors.white,
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderRadius: 30,
              textAlign: 'center'
            }}
            onPress={() => {
              dispatch(addToCart(route.params.item, 1));
              navigation.navigate('Cart');
            }}
          >
            ĐƯA VÀO GIỎ HÀNG
          </AppText>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 0,
    flexDirection: 'row',
    marginTop: 20,
    position: 'absolute'
  },
  buttonBuyNow: {
    borderTopRightRadius: 30
  },
  buttonDescription: {
    backgroundColor: colors.light
  },
  carousel: {
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    marginTop: 25
  },
  contentTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    backgroundColor: colors.white,
    elevation: 3,
    margin: 30,
    padding: 10
  },
  image: {
    height: '100%',
    width: `${100 / 2}%`
  },
  location: {
    color: colors.primary,
    opacity: 0.3,
    paddingHorizontal: 20
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    top: 20,
    width: '100%',
    zIndex: 1
  },
  navigationIcon: {
    color: colors.dark,
    fontSize: 30,
    opacity: 0.4
  },
  name: {
    fontSize: 30
  },
  price: {
    color: colors.primary,
    letterSpacing: 1.5
  },
  defaultLayout: {
    width: '100vw',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  lineHorizontal: {
    marginVertical: 7
  },
  fontSmall: {
    fontSize: 18
  },
  fontNormal: {
    fontSize: 22
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
  }
});

export default PlantDetailScreen;
