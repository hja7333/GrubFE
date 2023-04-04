import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const ViewDetails = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [isReserved, setIsReserved] = useState(false);
  const [toggleReload, setToggleReload] = useState(false);
  const [yours, setYours] = useState(false);
  const [userHasReserved, setUserHasReserved] = useState(false);
  const [item, setItem] = useState(null);

  const { id } = route.params;
  const headers = { Authorization: `Bearer ${user.token}` };


  useEffect(() => {
    setLoadingDetails(true);
    axios
      .get(`https://grub-group-project.onrender.com/api/items/${id}`, {
        headers,
      })
      .then(({ data }) => {
        setItem(data.item);
        setIsReserved(!data.item.is_available);
        setYours(data.item.user.username === user.user.username);
        if (data.item.reserved_by) {
          setUserHasReserved(
            data.item.reserved_by.username === user.user.username
          );
        }
        setLoadingDetails(false);
      })
      .catch((err) => navigation.navigate("Login"));
  }, [toggleReload]);

  const deleteItem = () => {
    return axios
      .delete(`https://grub-group-project.onrender.com/api/items/${id}`, {
        headers,
      })
      .then(() => navigation.goBack())
      .catch((err) => navigation.navigate("Login"));
  };

  const reserveItem = () => {
    const body = { username: user.user.username };
    return axios
      .patch(`https://grub-group-project.onrender.com/api/items/${id}`, body, {
        headers,
      })
      .then(() => {
        setToggleReload((current) => !current);
      })
      .catch((err) => console.log(err));
  };

  return loadingDetails ? (
    <Text>Loading Details</Text>
  ) : (
    <View style={styles.container}>
      <Image source={{ uri: item.item_url, width: 200, height: 200 }} />
      <Text>{item.name}</Text>
      <Text>{item.category.name}</Text>
      <Text>{item.description}</Text>
      {yours && !confirmDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setConfirmDelete(true);
          }}
        >
          <Text>Remove Item</Text>
        </TouchableOpacity>
      )}
      {yours && confirmDelete && (
        <View style={styles.confirmDeleteView}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setConfirmDelete(false)}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={deleteItem}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
      {userHasReserved && (
        <Text>
          You have reserved this item! Please contact the other user using the
          following contact details: {item.user.contact}
        </Text>
      )}
      {(yours || userHasReserved) && isReserved && (
        <TouchableOpacity style={styles.unreserveButton} onPress={reserveItem}>
          <Text>Unreserve Item</Text>
        </TouchableOpacity>
      )}
      {!yours && !isReserved && (
        <TouchableOpacity style={styles.reserveButton} onPress={reserveItem}>
          <Text>Reserve Item</Text>
        </TouchableOpacity>
      )}

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


// James' code
  container: {
    flexDirection: "column",
    width: "100%",
  },
  confirmDeleteView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#334bd6",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#334bd6",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#334bd6",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  reserveButton: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#334bd6",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  unreserveButton: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#334bd6",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",

  },
});
