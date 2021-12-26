import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import data from '.././../config/data';

const ProductCartItems = () => {
  const [cartItems, setCartItems] = useState(data.slice(5));
  return (
    <View>
      <Text>This is products card items</Text>
    </View>
  );
};

export default ProductCartItems;
