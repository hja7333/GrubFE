import { View, StyleSheet } from "react-native";

export const FilterBar = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#dff5e6",
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
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
