import React from 'react';
import AppText from './AppText';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HeaderTab(props: any) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome 
        style={{ position: 'absolute', left: 20 }} 
        name='chevron-left' 
        size={28} 
        color='rgba(0,0,0,.69)'
        onPress={() => props.navigation.goBack()}
      />
      <AppText
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}
      >
        {props.children}
      </AppText>

        {props.rightIconName ? 
              <FontAwesome 
              style={{ position: 'absolute', right: 20 }} 
              name={props.rightIconName} 
              size={28} 
              color='rgba(0,0,0,.69)'
              onPress={() => props.navigation.goBack()}
            /> : null
        }

    </View>
  );
}
