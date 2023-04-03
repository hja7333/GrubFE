import { View, Text, ScrollView, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";
import React, { useState, useEffect, useContext } from "react";
import { FilterBar } from "./FilterBar";
import { ItemCard } from "./ItemCard";
import { BottomBar } from "./BottomBar";
import axios from "axios";

export const ViewItems = () => {
  const [itemsLoading, setItemsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { user } = useContext(UserContext);

  const headers = { Authorization: `Bearer ${user.token}` };

  useEffect(() => {
    setItemsLoading(true);
    axios
      .get(`https://grub-group-project.onrender.com/api/items`, {
        headers,
      })
      .then(({ data: { items } }) => {
        setItems(items);
        setItemsLoading(false);
      })
      .catch((err) => console.log(err, "<---axios error"));
  }, []);

  return (
    <View style={styles.container}>
      <FilterBar />
      <ScrollView style={styles.scrollContainer}>
        {itemsLoading ? (
          <Text>Loading items</Text>
        ) : (
          items.map((item, index) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                background={Boolean(index % 2)}
              />
            );
          })
        )}
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#dff5e6",
    height: 40,
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
  scrollContainer: {
    width: "100%",
    backgroundColor: "#fff",
  },
});
