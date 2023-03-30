import { View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MapView = ({ navigation }) => {
  const { user } = useContext(UserContext);

  AsyncStorage.getItem("GRUB_APP::USER_DETAILS").then((user) =>
    console.log(user)
  );

  return (
    <View>
      <Text>User {user.user.username}</Text>
      <Text>Token {user.token}</Text>
      <StatusBar style="auto" />
    </View>
  );
};
