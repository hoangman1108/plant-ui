import React from 'react';
import { Dimensions, GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('window').width * 0.4;
console.log('width: ', width);

interface Props {
  name: string
  location: string
  price: number
  image: ImageSourcePropType
  widthChange?: number
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const AppCard: React.FC<Props> = ({ name, location, price, image, widthChange = 1, onPress }) => (
  <TouchableOpacity style={styles.conatiner} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <View style={styles.detailsContainer}>
      <View style={styles.details}>
        <AppText style={styles.text}>{name}</AppText>
      </View>
      <View>
        <AppText style={[styles.text]}>{price} VNĐ</AppText>
      </View>
      {/* <View style={styles.details}>
        <AppText style={[styles.text, styles.location]}>{location}
        </AppText>
        <AppText><Ionicons
          name='heart'
          color={'red'}
          size={20}
        /></AppText>
      </View> */}

    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    width: '64.5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  details: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  image: {
    resizeMode: 'scale',
    height: 180,
    width: '100%'
  },
  location: {
    color: colors.primary,
    opacity: 0.3
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
  price: {
    color: colors.primary
  },
});

export default AppCard;