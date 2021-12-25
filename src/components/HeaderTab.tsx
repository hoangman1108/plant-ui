import React from 'react';
import AppText from './AppText';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HeaderTab(props: any) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome name='chevron-left' size={28} color='rgba(0,0,0,.69)' />
      <AppText
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginLeft: 70,
        }}
      >
        {props.children}
      </AppText>
    </View>
  );
}
