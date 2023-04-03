import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {useContext, useEffect} from "react";
import {UserContext} from "../contexts/UserContext"
import axios from "axios"

export const ItemCard = ({ item, background }) => {
  const {user} = useContext(UserContext);
  
  const formatDistance = (distance) => {
    if (distance < 1609) {
      return Math.ceil(distance) + "m"
    } else if (distance < 16090) {
      const newDistance = Number(distance / 1609).toFixed(1)
      return `${newDistance} mile${newDistance === 1 ? null : "s"}`
    } else {
      return Math.ceil(distance / 1609) + " miles"
    }

  }


  return (
    <TouchableOpacity style={background ? styles.container1 : styles.container2}>
      <Image source={{uri: item.item_url, width: 150, height: 150}}/>
      <View>
      <Text>{item.name}</Text>
      <Text>{item.category.name}</Text>
      <Text>{formatDistance(item.distance)}</Text>
      <Text>{item.description}</Text>
      <Text>{user.contact}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#D7EEFC",
    flex: 1,
    alignItems: "center"
  }
})