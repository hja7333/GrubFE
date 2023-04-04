import { Text, StyleSheet, View, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import React, { useState, useContext } from "react";

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
    </View>
  );
};

const styles = StyleSheet.create({});
