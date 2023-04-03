import { View, StyleSheet, Button } from "react-native";
import {SelectList} from "react-native-dropdown-select-list";
import {useState} from "react"
const distItems = [
  {key: 1, value: 100, name: "100m"},
  {key: 2, value: 200, name: "200m"},
  {key: 3, value: 500, name: "500m"},
  {key: 4, value: 1069, name: "1 mile"},
  {key: 5, value: 2 * 1069, name: "2 miles"},
  {key: 6, value: 3 * 1069, name: "3 miles"},
  {key: 7, value: 4 * 1069, name: "4 miles"},
  {key: 8, value: 5 * 1069, name: "5 miles"},
  {key: 9, value: 10690, name: "10 miles"},
  {key: 10, value: 106900, name: "100 miles"}
]

export const FilterBar = () => {
  const [range, setRange] = useState(5345)
  const [location, setLocation] = useState("Home");
  const changeLocation = () => {
    if (location === "Home") {
      setLocation("Current Location")
    } else {
      setLocation("Home")
    }
  }
  return <View style={styles.container}>
    <Button title={location} onPress={changeLocation}/>
    <SelectList setSelect={(val) => setRange(val)} data={distItems} save={"value"}/>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#dff5e6",
    height: 40,
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
});
