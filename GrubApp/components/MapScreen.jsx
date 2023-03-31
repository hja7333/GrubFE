import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { fetchAllItems, getUser } from "../api";

export const MapScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [region, setRegion] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUser(user).then((responseUser) => {
      setRegion({
        latitude: responseUser.location.latitude,
        longitude: responseUser.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
    fetchAllItems(user.token).then((itemsResponse) => {
      setItems(itemsResponse);
    });
  }, [user]);

  AsyncStorage.getItem("GRUB_APP::USER_DETAILS").then((user) =>
    console.log(user)
  );

  return (
    <View>
      <MapView
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomControlEnabled={true}
        zoomEnabled={true}
      >
        {items.map((item) => {
          return (
            <Marker
              key={item._id}
              title={item.name}
              description={item.description}
              coordinate={item.location}
            ></Marker>
          );
        })}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
