import { View, Text, StatusBar, StyleSheet} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { fetchAllItems, getLocationDetails, getUser } from "../api";
import { ItemMarker } from "./ItemMarker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import Geolocation from '@react-native-community/geolocation';

// Geolocation.setRNConfiguration(config);

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
          region={region}
          provider={PROVIDER_GOOGLE}
          zoomControlEnabled={true}
          zoomEnabled={true}
          style={styles.map}>
          {items.map((item) => {
            return (
              <ItemMarker
                key={item._id}
                item={item}
              />
            );
          })}
        </MapView>
        <View style={styles.searchContainer}>
    <GooglePlacesAutocomplete
      placeholder='Search location...'
      onPress={(data, details = null) => {
        getLocationDetails(data.description).then((locationDetails) => {
          setRegion((currentRegion) => {
            return {...currentRegion, latitude: locationDetails.lat, longitude: locationDetails.lng}
          })
        })
      }}
      // currentLocation={true}
      // currentLocationLabel='Select current location'
      query={{
        key: 'AIzaSyDbifXH9H07fHVrciISF08USUoW2Zg-oXo',
        language: 'en',
      }}
    />   
    </View>
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
  searchContainer: {
    position: 'absolute', 
    top: 10, 
    width: '95%',
    backgroundColor: "white",
    elevation: 3,
    padding: 4, 
    borderRadius: 8, 
  },
});
