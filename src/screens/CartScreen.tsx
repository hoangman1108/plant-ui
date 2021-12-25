import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Screen from './Screen';
import AppBadge from '../components/AppBadge';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
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
      <View>
        <AppText>This is Shipping-Cart Screen</AppText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
