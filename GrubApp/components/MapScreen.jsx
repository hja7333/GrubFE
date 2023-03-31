import { View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';

export const MapScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  console.log(user)
  const [userLocation, setUserLocation] = useState({})
  // const [region, setRegion] = useState({
  //   latitude: 53.4,
  //   longitude: -2.983,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  AsyncStorage.getItem("GRUB_APP::USER_DETAILS").then((user) =>
    console.log(Object.keys(user))
  );

  return (
    <View>
      <Text> This is the map </Text>
      <StatusBar style="auto" />
    </View>
  );
};


//John34
//Bananas1995