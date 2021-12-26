import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import HeaderTab from '../../components/HeaderTab';
import { AppNavigatorProps } from '../../navigation/types';
import profile from '../../assets/profile.png';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons'; 

import Screen from '../Screen';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <View style={{ marginTop: 20 }}>
        <HeaderTab navigation={navigation} rightIconName="edit">tài khoản</HeaderTab>
      </View>
        <ScrollView style={{flex: 1, padding: 20}}>
          <View style={styles.container}>
          <Image
          source={profile}
          style={{height: 200, width: 200}}
          />
          </View>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="person" size={24} color="black" />
              <Text style={{fontSize: 16, marginLeft: 10}}>Họ và tên</Text>
            </View>

            <View>
            <TextInput
              style={styles.input}
              placeholder="Nguyễn Văn A"
              keyboardType="default"
            />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="mail" size={24} color="black" />
              <Text style={{fontSize: 16, marginLeft: 10}}>Địa chỉ email</Text>
            </View>

            <View>
            <TextInput
              style={styles.input}
              placeholder="test@gmail.com"
              keyboardType="default"
            />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="phone" size={24} color="black" />
              <Text style={{fontSize: 16, marginLeft: 10}}>Số điện thoại</Text>
            </View>

            <View>
            <TextInput
              style={styles.input}
              placeholder="0123456789"
              keyboardType="default"
            />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="home" size={24} color="black" />
              <Text style={{fontSize: 16, marginLeft: 10}}>Địa chỉ nhà</Text>
            </View>

            <View>
            <TextInput
              style={styles.input}
              placeholder="100/53 DBT"
              keyboardType="default"
            />
            </View>
          </View>

          <View style={{marginTop: 20, paddingLeft: 30, paddingRight: 30}}>
            <Button onPress={() => {}} title='ĐĂNG XUẤT' color="black" />
          </View>
        </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
});

export default AccountScreen;