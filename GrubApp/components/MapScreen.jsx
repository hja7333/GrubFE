import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { fetchAllItems, getUser } from "../api";
import { ItemMarker } from "./ItemMarker";

export const MapScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [region, setRegion] = useState({});
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getUser(user).then((responseUser) => {
      setRegion({
        latitude: responseUser.location.latitude,
        longitude: responseUser.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
    fetchAllItems(user.token)
      .then((itemsResponse) => {
        setItems(itemsResponse);
      })
      .catch(() => navigation.navigate("Login"));
  }, [user]);

  AsyncStorage.getItem("GRUB_APP::USER_DETAILS").then((user) =>
    console.log(user)
  );

  return (
    <View>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          zoomControlEnabled={true}
          zoomEnabled={true}>
          {items.map((item) => {
            return (
              <ItemMarker
                key={item._id}
                setSelectedItem={setSelectedItem}
                item={item}
              />
            );
          })}
        </MapView>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // mapContainer: {
  //   width: "100%",
  //   height: "85%",
  //   zIndex: 2
  // },
  map: {
    width: "100%",
    height: "100%",
    // flex:1
  },
});
