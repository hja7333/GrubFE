import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import * as Location from "expo-location";
import { SelectList } from "react-native-dropdown-select-list";
import { UserContext } from "../contexts/UserContext";
import { useState, useContext } from "react";

const distItems = [
  { key: 1, value: 100, name: "100m" },
  { key: 2, value: 200, name: "200m" },
  { key: 3, value: 500, name: "500m" },
  { key: 4, value: 1069, name: "1 mile" },
  { key: 5, value: 2 * 1069, name: "2 miles" },
  { key: 6, value: 3 * 1069, name: "3 miles" },
  { key: 7, value: 4 * 1069, name: "4 miles" },
  { key: 8, value: 5 * 1069, name: "5 miles" },
  { key: 9, value: 10690, name: "10 miles" },
  { key: 10, value: 106900, name: "100 miles" },
];

export const FilterBar = ({ setLocation }) => {
  const { user } = useContext(UserContext);
  const [range, setRange] = useState(5345);
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
      <SelectList
        setSelect={(val) => setRange(val)}
        data={distItems}
        save={"value"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#dff5e6",
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
    backgroundColor: "#334bd6",
    paddingLeft: 10,
    paddingRight: 10,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  locateText: {
    color: "#fff",
  },
});
