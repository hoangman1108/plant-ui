import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Picker,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Divider } from "react-native-elements";
import Screen from "./Screen";
import AppText from "../components/AppText";
import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";
import { AppNavigatorProps } from "../navigation/types";
import numberFormat from "../util/formatNumberMoney";

interface Props {
  navigation: StackNavigationProp<AppNavigatorProps>;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [selectedValue, setSelectedValue] = useState("java");

  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems } = cartReducer;
  console.log("CartScreen - cartReducer: ", cartItems);

  return (
    <Screen>
      <View style={{ marginTop: 20 }}>
        <HeaderTab navigation={navigation}>Địa chỉ giao hàng</HeaderTab>
      </View>
      <View style={{ paddingVertical: 40, paddingHorizontal: 22 }}>
        <View style={styles.field}>
          <Text>Thành phố</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.field}>
          <Text>Quận</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.field}>
          <Text>Phường</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>

        <View style={styles.field}>
          <Text>Địa chỉ nhà: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Địa chỉ nhà"
            // keyboardType="numeric"
          />
        </View>
        <Button title="Press me" onPress={() => console.log("ok")} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
  },
  field:{
      marginBottom:30
  }
});

export default CartScreen;
