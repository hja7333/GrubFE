import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import React, { useState, useContext } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const ViewDetails = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { item } = route.params;

  const headers = { Authorization: `Bearer ${user.token}` };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.item_url, width: 200, height: 200 }} />
      <View style={styles.textContainer}>
        <Text>{item.name}</Text>

        <Text>{item.category.name}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <Text>
          {item.is_available
            ? "This item is available!"
            : "This item has been reserved"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Previous page
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  returnBtn: {
    top: 10,
    backgroundColor: "#680A20",
    width: 170,
    borderRadius: 15,
    padding: 5,
  },
  textContainer: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // rowGap: 4000,
  },
  descriptionText: {
    textSize: 200,
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
  },
  container: {
    paddingTop: 20,

    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#def9ef",
  },
});
