import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export const ItemCard = ({ item, background, home }) => {
  const { user } = useContext(UserContext);

  const formatDistance = (distance) => {
    if (distance < 1609) {
      return Math.ceil(distance) + "m";
    } else if (distance < 16090) {
      const newDistance = Number(distance / 1609).toFixed(1);
      return `${newDistance} mile${newDistance === 1 ? null : "s"}`;
    } else {
      return Math.ceil(distance / 1609) + " miles";
    }
  };

  return (
    <TouchableOpacity
      style={background ? styles.container1 : styles.container2}
    >
      <Image
        source={{ uri: item.item_url, width: 100, height: 100 }}
        style={item.distance === 0 ? styles.itemImageYours : styles.itemImage}
      />
      <View style={styles.textBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.category.name}</Text>
        <Text>
          {formatDistance(item.distance)} from {home ? "your home" : "you"}
        </Text>
        <Text> </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container2: {
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    margin: 10,
    borderRadius: 10,
  },
  itemImageYours: {
    margin: 10,
    borderRadius: 10,
    opacity: 0.5,
  },
  textBox: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
