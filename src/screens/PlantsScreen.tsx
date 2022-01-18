import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Screen from './Screen';
// import AppBadge from '../components/AppBadge';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import colors from '../config/colors';
import data from '../config/data';
import categories from '../config/categories';
import { AppNavigatorProps } from '../navigation/types';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const PlantsScreen: React.FC<Props> = ({ navigation }) => {
  const [productsData, setProductsData] = useState(data);
  const categoriesData = categories;
  const [defaultCate, setDefaultCate] = useState(1);

  const dispatch = useDispatch();

  const onSelectedCategory = (id) => {
    setDefaultCate(id);
    const newData = shuffle(data);
    setProductsData(newData);
  };

  const shuffle = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  return (
    <Screen>
      <View style={styles.header}>
        {/* <Ionicons name='reorder-two-outline' size={30} color={colors.light} onPress={() => alert('Menu')} /> */}
        <View style={styles.headerConntainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.headerIcon}
          />
          {/* <AppText style={styles.headerTitle}>Hi Uishopy!</AppText> */}
          <View style={styles.headerSearchContainer}>
            <TextInput placeholder='Search' style={styles.headerSearch} />
            <Ionicons name='search-outline' size={20} color={colors.medium} />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          horizontal={true}
          data={categoriesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { id, name } = item;
            return (
              <TouchableOpacity onPress={onSelectedCategory.bind(this, id)}>
                <View
                  style={[
                    styles.itemCategory,
                    {
                      backgroundColor:
                        defaultCate == id ? colors.active : colors.white
                    }
                  ]}
                >
                  <AppText
                    style={[
                      styles.contentCategory,
                      {
                        color: defaultCate == id ? colors.white : colors.dark
                      }
                    ]}
                  >
                    {name}
                  </AppText>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          style={styles.gridProducts}
          data={productsData}
          numColumns={2}
          contentContainerStyle={{ width: '100%' }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { name, location, price, image } = item;
            return (
              <AppCard
                name={name}
                location={location}
                price={price}
                image={image}
                onPress={() => navigation.navigate('PlantDetail', { item })}
                onRedirectCart={() => {
                  dispatch(addToCart(item, 1));
                  navigation.navigate('Cart');
                }}
              />
            );
          }}
        />
      </ScrollView>
    </Screen>
  );
};
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -10,
    marginTop: 30,
    padding: 20
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.7
  },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1
  },
  headerConntainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
    // marginTop: 10
  },
  headerIcon: {
    height: 60,
    width: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  headerSearch: {
    flex: 1,
    backgroundColor: colors.white,
    outlineStyle: 'none'
  },
  headerSearchContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    left: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%'
  },
  headerTitle: {
    color: colors.light,
    fontSize: 22,
    fontWeight: 'bold'
  },
  itemCategory: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15
  },
  contentCategory: {
    fontSize: 16
  },
  gridProducts: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100vw'
  },
  gridProductItem: {
    flex: 1
  },
  active: {
    backgroundColor: colors.active
  }
});

export default PlantsScreen;
