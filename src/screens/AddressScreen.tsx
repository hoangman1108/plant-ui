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
import { saveShippingAddress } from "../actions/cartActions";
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

const AddressScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [selectedValueProvince, setSelectedValueProvince] = useState("TP HCM");
  const [selectedValueDistrict, setSelectedValueDistrict] = useState("Q.1");
  const [selectedValueWard, setSelectedValueWard] = useState("P.1");

  const Province = ["TP HCM", "Vũng tàu"];

  const District = ["Q.1", "Q.2", "Q.3"];

  const Ward = ["P.1", "P.2", "P.3"];

  const cartReducer = useSelector((state: any) => state.cartReducer);
  const { cartItems } = cartReducer;
  console.log("CartScreen - cartReducer: ", cartItems);

  return (
    <Screen style={{ backgroundColor: "#FFFFFF" }}>
      <View style={{ marginTop: 20 }}>
        <HeaderTab navigation={navigation}>Địa chỉ giao hàng</HeaderTab>
      </View>
      <View style={{ paddingVertical: 40, paddingHorizontal: 22 }}>
        <View style={styles.field}>
          <Text style={styles.label}>Thành phố</Text>
          <Picker
            selectedValue={selectedValueProvince}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValueProvince(itemValue)
            }
          >
            {Province.map((e) => (
              <Picker.Item label={e} value={e} />
            ))}
          </Picker>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Quận</Text>
          <Picker
            selectedValue={selectedValueDistrict}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValueDistrict(itemValue)
            }
          >
            {District.map((e) => (
              <Picker.Item key={e} label={e} value={e} />
            ))}
          </Picker>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Phường</Text>
          <Picker
            selectedValue={selectedValueWard}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValueWard(itemValue)
            }
          >
            {Ward.map((e) => (
              <Picker.Item label={e} value={e} />
            ))}
          </Picker>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Địa chỉ nhà: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Địa chỉ nhà"
            // keyboardType="numeric"
          />
        </View>

        <AppText
          onPress={() => {
            navigation.navigate("PlaceOrder");

            console.log(Ward);
            dispatch(
              saveShippingAddress(
                `${address}, ${selectedValueWard}, ${selectedValueDistrict}, ${selectedValueProvince}`
              )
            );
          }}
          style={{
            backgroundColor:
              cartItems.length !== 0 ? colors.active : "#rgb(107,107,107)",
            color: colors.white,
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 30,
            textAlign: "center",
          }}
        >
          LƯU ĐỊA CHỈ
        </AppText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  label:{

    fontSize:18

  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    borderRadius: 10,
  },
  field: {
    marginBottom: 30,
  },
});

export default AddressScreen;
