import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import React, { useState, useContext } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const ViewDetails = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { item } = route.params;

  const headers = { Authorization: `Bearer ${user.token}` };

  return (
    <View>
      <Image source={{ uri: item.item_url, width: 200, height: 200 }} />
      <Text>{item.name}</Text>
      <Text>{item.category.name}</Text>
      <Text>{item.description}</Text>
      <Text>
        {item.is_available
          ? "This item is available!"
          : "This item has been reserved"}
      </Text>
      <TouchableOpacity style={styles.returnBtn}onPress={() => navigation.goBack()}> 
      <Text style={{color: "white", textAlign: "center"}}>Previous page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  returnBtn: {
    top: 10,
    backgroundColor:"#680A20",
    width: 170,
    borderRadius: 15,
    padding: 5
  }
});
