import { View, StyleSheet, Button } from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useState} from "react"
const distItems = [
  {value: 100, label: "100m"},
  {value: 200, label: "200m"},
  {value: 500, label: "500m"},
  {value: 1609, label: "1 mile"},
  {value: 2 * 1609, label: "2 miles"},
  {value: 3 * 1609, label: "3 miles"},
  {value: 4 * 1609, label: "4 miles"},
  {value: 5 * 1609, label: "5 miles"},
  {value: 16090, label: "10 miles"},
  {value: 160900, label: "100 miles"}
]

export const FilterBar = ({setRange}) => {
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
    <Dropdown data={distItems}
    labelField="label"
    valueField="value"
    onChange={(value) => setRange(value.value)}
    style={styles.dropdown}
    />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#dff5e6",
    width: "100%",
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
  dropdown: {
    width: "61.8%",
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  }
});
