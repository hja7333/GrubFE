import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import React, { useState, useEffect, useContext } from "react";
import { FilterBar } from "./FilterBar";
import { ItemCard } from "./ItemCard";
import { BottomBar } from "./BottomBar";
import axios from "axios";

export const ViewItems = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [location, setLocation] = useState(user.user.location.coordinates);
  const [totalItems, setTotalItems] = useState(null);
  const [range, setRange] = useState(5345);

  const headers = { Authorization: `Bearer ${user.token}` };
  const home = location === user.user.location.coordinates;
  const focus = useIsFocused();

  useEffect(() => {
    setItemsLoading(true);
    axios
      .get(
        `https://grub-group-project.onrender.com/api/items/${user.user.location.coordinates[1]}/${user.user.location.coordinates[0]}?page=${page}&limit=10&range=${range}`,
        {
          headers,
        }
      )
      .then(({ data: { items, total_items } }) => {
        setItems(items);
        setTotalItems(total_items);
        setItemsLoading(false);
      })
      .catch((err) => navigation.navigate("Login"));
  }, [page, range, location, focus]);

  return (
    <View style={styles.container}>
      <FilterBar
        style={styles.filterBar}
        setRange={setRange}
        setLocation={setLocation}
      />
      <ScrollView style={styles.scrollContainer}>
        {itemsLoading ? (
          <Text>Loading items</Text>
        ) : (
          items.map((item, index) => {
            return (
              <ItemCard
                key={item._id}
                navigation={navigation}
                item={item}
                home={home}
                background={Boolean(index % 2)}
                style={styles.itemCard}
              />
            );
          })
        )}
      </ScrollView>
      <BottomBar page={page} setPage={setPage} totalItems={totalItems} />
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
    backgroundColor: "#def9ef",
  },
  itemCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBar: {
    width: "100%",
  },
});
