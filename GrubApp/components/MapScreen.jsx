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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { fetchLocalItems, getLocationDetails } from "../api";
import { ItemMarker } from "./ItemMarker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
const { GOOGLE_API_KEY } = require("../googleMapsAPIkey");
import Modal from "react-native-modal";
import { Svg, Image as ImageSvg } from "react-native-svg";

export const MapScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [region, setRegion] = useState({
    latitude: user.user.location.coordinates[1],
    longitude: user.user.location.coordinates[0],
    latitudeDelta: 0.03,
    longitudeDelta: 0.06,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})

  AsyncStorage.getItem("GRUB_APP::USER_DETAILS").then((user) =>
    console.log(user)
  );



  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
          moveOnMarkerPress={false}
          onRegionChangeComplete={(selectedRegion) => {
            setRegion(selectedRegion);
          }}
          style={styles.map}>
          {items.length > 0
            ? items.map((item) => {
                return (
                  <ItemMarker
                    key={item._id}
                    item={item}
                    navigation={navigation}
                    setIsModalVisible={setIsModalVisible}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                );
              })
            : null}
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
              onPress={handleUserLocation}>
              <Text
                style={{ position: "absolute", color: "#fff", fontSize: 12 }}>
                Current location
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={isModalVisible}
            hasBackdrop={true}
            backdropOpacity={0}
            onBackdropPress={toggleModal}
            swipeDirection="down"
            onSwipeComplete={toggleModal}
            style={{ justifyContent: "flex-end" }}
            propagateSwipe>
            <View style={styles.modalContent}>
            <Svg width={150} height={100}>
              <ImageSvg
                width={"100%"}
                height={"100%"}
                preserveAspectRatio="xMidYMid slice"
                href={{ uri: selectedItem.item_url }}
              />
            </Svg>
            <View style={styles.modalText}>
              <Text><Text style={styles.wordBold}>Item: </Text> {selectedItem.name}</Text>
              <Text><Text style={styles.wordBold}>Category: </Text> {isModalVisible ? selectedItem.category.name : null}</Text>
              <Text numberOfLines={2}>{selectedItem.description}</Text> 
              <Text><Text style={styles.wordBold}>Expires on:</Text> {new Date(selectedItem.expiry_date).toDateString()}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("ViewDetails", { id: selectedItem._id })}> 
              <Text numberOfLines={1} style={{color: "#9c0444", fontWeight: "bold", top: 5}}>See full item details</Text>
              
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",

    top: 5,
    width: "97%",
    alignSelf: "center",
    backgroundColor: "white",

    elevation: 3,
    padding: 4,
    paddingBottom: 1,
    borderRadius: 8,
  },
  userLocationBtn: {
    top: 4,
    position: "absolute",
    marginTop: 3.5,

    padding: 15,
    borderRadius: 15,
    backgroundColor: "#680A20",
    width: 120,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#e6fdf4",
  },
  wordBold: {
    fontWeight: "bold",
    color: "black",
  },
  modalText: {
    marginHorizontal: 5,
    flexDirection: "column",
    flexShrink: 1
  }
});
