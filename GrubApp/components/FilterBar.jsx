import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { UserContext } from "../contexts/UserContext";
import { useState, useContext } from "react";
const distItems = [
  { value: 100, label: "100m" },
  { value: 200, label: "200m" },
  { value: 500, label: "500m" },
  { value: 1609, label: "1 mile" },
  { value: 2 * 1609, label: "2 miles" },
  { value: 3 * 1609, label: "3 miles" },
  { value: 4 * 1609, label: "4 miles" },
  { value: 5 * 1609, label: "5 miles" },
  { value: 16090, label: "10 miles" },
  { value: 160900, label: "100 miles" },
];

export const FilterBar = ({ setRange, setLocation }) => {
  const { user } = useContext(UserContext);
  const [locationString, setLocationString] = useState("Home");
  const [findingLocation, setFindingLocation] = useState(false);
  const changeLocation = () => {
    if (locationString === "Home") {
      Location.requestForegroundPermissionsAsync()
        .then((status) => {
          if (status.granted) {
            setFindingLocation(true);
            return Location.getCurrentPositionAsync({});
          }
        })
        .then((location) => {
          setLocation([location.coords.longitude, location.coords.latitude]);
          setFindingLocation(false);
          setLocationString("Current Location");
        })
        .catch((err) => {
          setFindingLocation(false);
        });
    } else {
      setLocationString("Home");
      setLocation(user.user.location.coordinates);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={changeLocation}
        disabled={findingLocation}
      >
        {findingLocation ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.locateText}>{locationString}</Text>
        )}
      </TouchableOpacity>
      <Dropdown
        data={distItems}
        placeholder="Select a distance"
        labelField="label"
        valueField="value"
        onChange={(value) => setRange(value.value)}
        style={styles.dropdown}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ECC763",
    width: "100%",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButton: {
    borderRadius: 20,
    marginLeft: 20,
    backgroundColor: "#680A20",
    paddingLeft: 10,
    paddingRight: 10,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  locateText: {
    color: "#fff",
  },
  dropdown: {
    width: "61.8%",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
