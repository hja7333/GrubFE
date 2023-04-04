import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export const ItemCard = ({
  navigation,
  item,
  background,
  home,
  setViewDetailItem,
}) => {
  const { user } = useContext(UserContext);

  const yours = user.user.username === item.user.username;

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
      style={
        background
          ? yours
            ? styles.container1yours
            : styles.container1
          : yours
          ? styles.container2yours
          : styles.container2
      }
      onPress={() => navigation.navigate("ViewDetails", { item })}
    >
      <Image
        source={{ uri: item.item_url, width: 100, height: 100 }}
        style={styles.itemImage}
      />
      <View style={styles.textBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.category.name}</Text>
        <Text>
          {formatDistance(item.distance)} from {home ? "your home" : "you"}
        </Text>
        <View
          style={
            item.is_available ? styles.availableBox : styles.notAvailableBox
          }
        >
          <Text style={styles.reservationText}>
            {item.is_available ? "Available" : "Reserved"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#f0f9ff",
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
  container1yours: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    opacity: 0.25,
  },
  container2yours: {
    flexDirection: "row",
    backgroundColor: "#f0f9ff",
    flex: 1,
    alignItems: "center",
    opacity: 0.25,
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
  textBox: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  reservationText: {
    color: "#fff",
  },
  availableBox: {
    alignSelf: "flex-end",
    backgroundColor: "#5ba863",
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  notAvailableBox: {
    alignSelf: "flex-end",
    backgroundColor: "#d45542",
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
});
