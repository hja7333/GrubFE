import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const NavBar = ({ params }) => {
  const { navigation, route, options, back } = params;
  const { user, setUser } = useContext(UserContext);
  const atLogin = route.name === "Login" || route.name === "AccountConfirmed"
  const atSignUp = route.name === "CreateAccount";
  const atMapView = route.name === "MapScreen";
  const atListItem = route.name === "ListItem";
  const atViewItem = route.name === "ViewItems";

  return atLogin ? (
    <View></View>
  ) : (
    <View style={styles.container}>
      {atSignUp ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setUser(null);
            navigation.popToTop();
          }}
        >
          <Text style={styles.headerText}>Logout</Text>
        </TouchableOpacity>
      )}
      {!atSignUp && (
        <TouchableOpacity
          style={atMapView && styles.buttonSelected}
          onPress={() => navigation.navigate("MapScreen")}
        >
          <Text
            style={atMapView ? styles.headerTextSelected : styles.headerText}
          >
            Map
          </Text>
        </TouchableOpacity>
      )}
      {!atSignUp && (
        <TouchableOpacity
          style={atListItem && styles.buttonSelected}
          onPress={() => navigation.navigate("ListItem")}
        >
          <Text
            style={atListItem ? styles.headerTextSelected : styles.headerText}
          >
            List an item
          </Text>
        </TouchableOpacity>
      )}
      {!atSignUp && (
        <TouchableOpacity
          style={atViewItem && styles.buttonSelected}
          onPress={() => navigation.navigate("ViewItems")}
        >
          <Text
            style={atViewItem ? styles.headerTextSelected : styles.headerText}
          >
            Items
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ECC763",
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
  headerText: {
    fontWeight: "bold",
  },
  headerTextSelected: {
    color: "#fff",
  },
  buttonSelected: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: "#680A20",
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
