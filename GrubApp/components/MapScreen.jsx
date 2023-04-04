import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { fetchLocalItems, getLocationDetails, getUser } from "../api";
import { ItemMarker } from "./ItemMarker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
const { GOOGLE_API_KEY } = require("../googleMapsAPIkey");

export const MapScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [region, setRegion] = useState({
    latitude: user.user.location.coordinates[1],
    longitude: user.user.location.coordinates[0],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [items, setItems] = useState([]);

  AsyncStorage.getItem("GRUB_APP::USER_DETAILS").then((user) =>
    console.log(user)
  );

  const handleUserLocation = () => {
    Location.requestForegroundPermissionsAsync()
      .then((permissionResponse) => {
        Location.getCurrentPositionAsync().then((position) => {
          setRegion((currentRegion) => {
            return {
              ...currentRegion,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocalItems(user.token, region.latitude, region.longitude)
      .then((itemsResponse) => {
        setItems(itemsResponse);
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate("Login");
      });
  }, [region, user]);

  return (
    <View>
      <View style={styles.mapContainer}>
        <MapView
          region={region}
          provider={PROVIDER_GOOGLE}
          zoomControlEnabled={true}
          zoomEnabled={true}
          style={styles.map}
        >
          {items.map((item) => {
            return <ItemMarker key={item._id} item={item} />;
          })}
        </MapView>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search location..."
            autoFillOnNotFound={true}
            onPress={(data, details = null) => {
              getLocationDetails(data.description).then((locationDetails) => {
                setRegion((currentRegion) => {
                  return {
                    ...currentRegion,
                    latitude: locationDetails.lat,
                    longitude: locationDetails.lng,
                  };
                });
              });
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
          <View>
            <TouchableOpacity
              style={styles.userLocationBtn}
              onPress={handleUserLocation}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>
                Current location
              </Text>
            </TouchableOpacity>
          </View>
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
    position: "absolute",
    top: 10,
    width: "95%",
    backgroundColor: "C5F7E5",
    elevation: 3,
    padding: 4,
    paddingBottom: 1,
    marginBottom: 2,
    borderRadius: 8,
  },
  userLocationBtn: {
    position: "absolute",
    marginTop: 3.5,
    borderRadius: 15,
    backgroundColor: "#680A20",
    width: 150,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
