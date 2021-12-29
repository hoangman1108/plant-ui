import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import HeaderTab from '../components/HeaderTab';
import { AppNavigatorProps } from '../navigation/types';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import AppText from '../components/AppText';
import colors from '../config/colors';

import Screen from './Screen';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const EditProductScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FontAwesome
            style={{ paddingLeft: 16 }}
            name='chevron-left'
            size={28}
            color='rgba(0,0,0,.69)'
            onPress={() => navigation.goBack()}
          />
          <AppText
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'center',
              paddingHorizontal: 16,
            }}
          >
            CHỈNH SỬA THÔNG TIN SẢN PHẨM
          </AppText>
        </View>
      </View>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 16, marginLeft: 10 }}>Tên sản phẩm</Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder='Tên sản phẩm'
              keyboardType='default'
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 16, marginLeft: 8 }}>
              Hình ảnh sản phẩm
            </Text>
          </View>

          <View>
            <TextInput
              style={{
                height: 40,
                marginHorizontal: 12,
                marginBottom: 8,
                marginTop: 5,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}
              placeholder='/images/default.jpg'
              keyboardType='default'
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 16,
                    borderWidth: 1,
                    borderColor: '#20232a',
                    paddingHorizontal: 20,
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: '#ddd',
                  }}
                >
                  Chọn ảnh
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, marginLeft: 8 }}>Chưa chọn ảnh</Text>
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 16, marginLeft: 8 }}>Giá sản phẩm</Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder='0'
              keyboardType='default'
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 16, marginLeft: 8 }}>Thuộc danh mục</Text>
          </View>

          <View style={{ position: 'relative' }}>
            <TouchableOpacity>
              <TextInput
                style={[styles.input, { backgroundColor: '#ddd' }]}
                placeholder='Bonsai'
                keyboardType='default'
              />
              <View style={{ position: 'absolute', right: 30, top: 12 }}>
                <AntDesign name='down' size={24} color='black' />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 16, marginLeft: 8 }}>
              Số lượng có trong kho
            </Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder='1'
              keyboardType='default'
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 16, marginLeft: 8 }}>Mô tả sản phẩm</Text>
          </View>

          <View>
            <TextInput
              multiline={true}
              style={{
                marginHorizontal: 12,
                marginBottom: 12,
                marginTop: 5,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                height: 130,
              }}
              keyboardType='default'
              placeholder='Cây tùng lá kim bonsai này được tạo dáng bay, tán hướng xuống qua miệng chậu đến 80 cm. Dáng này còn được gọi là dáng bán huyền, một dáng cơ bản và phổ biến trong nghệ thuật bonsai. Chậu cây tùng lá kim này có kích thược nhỏ, phù hợp trang trí nhiều nơi, dễ di chuyển, đặt để.'
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingLeft: 30,
            paddingRight: 30,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Plants')}>
            <AppText
              style={{
                backgroundColor: colors.active,
                color: colors.white,
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderRadius: 30,
                textAlign: 'center',
              }}
            >
              LƯU THAY ĐổI
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginBottom: 12,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default EditProductScreen;
