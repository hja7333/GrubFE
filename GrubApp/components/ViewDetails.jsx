import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

export const ViewDetails = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [isReserved, setIsReserved] = useState(false);
  const [yours, setYours] = useState(false);
  const [userHasReserved, setUserHasReserved] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [item, setItem] = useState({});

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
            data.item.reserved_by.username === user.user.username &&
              data.item.is_available === false
          );
        }
        setLoadingDetails(false);
      })
      .catch((err) => navigation.navigate("Login"));
  }, []);

  const deleteItem = () => {
    setIsDeleting(true);
    return axios
      .delete(`https://grub-group-project.onrender.com/api/items/${id}`, {
        headers,
      })
      .then(() => {
        setIsDeleting(false);
        navigation.goBack();
      })
      .catch((err) => {
        setIsDeleting(false);
        navigation.navigate("Login");
      });
  };

  const reserveItem = () => {
    setIsReserving(true);
    const body = { username: user.user.username };
    return axios
      .patch(`https://grub-group-project.onrender.com/api/items/${id}`, body, {
        headers,
      })
      .then(({ data }) => {
        setItem(data.item);
        setIsReserved(!data.item.is_available);
        setYours(data.item.user.username === user.user.username);
        setUserHasReserved(
          data.item.reserved_by.username === user.user.username &&
            data.item.is_available === false
        );
        setIsReserving(false);
      })
      .catch((err) => {
        setIsReserving(false);
        navigation.navigate("Login");
      });
  };

  const today = new Date();
  const expiry_date = new Date(item.expiry_date || today);
  const dateDiff = expiry_date - today;
  const daysToExpiry = Math.ceil(dateDiff / 86400000);

  return loadingDetails ? (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading Details</Text>
      <ActivityIndicator size="large" color="#680A20" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.itemImage}
          source={{ uri: item.item_url, width: 200, height: 200 }}
        />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemExpiry}>
          {daysToExpiry < 0
            ? `This item expired ${Math.abs(daysToExpiry)} day${
                daysToExpiry < -1 ? "s" : ""
              } ago`
            : daysToExpiry === 0
            ? `This item expires today!`
            : daysToExpiry === 1
            ? `This item expires tomorrow`
            : `This item expires in ${daysToExpiry} days`}
        </Text>
        <Text style={styles.itemCategory}>{item.category.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        {yours && !confirmDelete && (
          <TouchableOpacity
            style={styles.normalBtn}
            onPress={() => {
              setConfirmDelete(true);
            }}
          >
            <Text style={styles.buttonText}>Remove Item</Text>
          </TouchableOpacity>
        )}
        {yours && confirmDelete && (
          <View style={styles.confirmDeleteView}>
            <TouchableOpacity
              style={styles.normalBtn}
              onPress={() => setConfirmDelete(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={deleteItem}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        {userHasReserved && (
          <View style={styles.reservationView}>
            <Text style={styles.reservationText}>
              You have reserved this item! Please contact the other user using
              the following contact details:
              <Text style={{ fontWeight: "bold" }}>{item.user.contact}</Text>
            </Text>
          </View>
        )}
        {(yours || userHasReserved) && isReserved && (
          <TouchableOpacity
            style={styles.normalBtn}
            onPress={reserveItem}
            disabled={isReserving}
          >
            {isReserving ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Unreserve Item</Text>
            )}
          </TouchableOpacity>
        )}
        {!yours && !isReserved && (
          <TouchableOpacity
            style={styles.normalBtn}
            onPress={reserveItem}
            disabled={isReserving}
          >
            {isReserving ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Reserve Item</Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.normalBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Previous page</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  normalBtn: {
    top: 10,
    backgroundColor: "#680A20",
    width: 170,
    borderRadius: 15,
    borderStyle: "solid",
    borderColor: "#680A20",
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
  confirmBtn: {
    top: 10,
    backgroundColor: "#680A20",
    width: 170,
    borderRadius: 15,
    borderStyle: "solid",
    borderColor: "#ECC763",
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
  textContainer: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  itemName: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  itemExpiry: {
    fontStyle: "italic",
  },
  itemCategory: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  itemDescription: {},
  reservationView: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: "#ECC763",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  reservationText: {},
  loadingText: {
    marginTop: 100,
    marginBottom: 20,
    fontSize: 20,
  },
});
