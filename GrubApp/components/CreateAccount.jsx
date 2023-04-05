import {
  View,
  Button,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { AccountConfirmed } from "./AccountConfirmed";
const { getLocationDetails, createUser } = require("../api");

const AccountCreationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("You must confirm your password!"),
  location: Yup.string().required("An address is required"),
  contact: Yup.string()
    .min(11, "Enter a valid phone number")
    .max(11, "Enter a valid phone number")
    .required("Contact number is required"),
});

export const CreateAccount = (props) => {
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
          location: "",
          contact: "",
        }}
        validationSchema={AccountCreationSchema}
        onSubmit={(values) => {
          let location = {};
          setIsLoading(true);
          getLocationDetails(values.location)
            .then((res) => {
              location.latitude = res.lat;
              location.longitude = res.lng;
              return location;
            })
            .then((newLocation) => {
              const newUser = {
                ...values,
                location: {
                  type: "Point",
                  coordinates: [newLocation.longitude, newLocation.latitude],
                },
              };
              delete newUser.confirmPassword;
              return createUser(newUser);
            })
            .then((newUser) => {
              setIsLoading(false);

              setIsCreated(true);
              props.navigation.navigate("AccountConfirmed", { newUser });
            })
            .catch((err) => {
              setIsCreated(false);
            });
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <Text style={styles.header}>Fill in your details below:</Text>

            <TextInput
              style={errors.username ? styles.inputViewErr : styles.inputView}
              value={values.username}
              placeholder="username"
              onChangeText={handleChange("username")}
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
            <TextInput
              style={errors.password ? styles.inputViewErr : styles.inputView}
              value={values.password}
              secureTextEntry={true}
              placeholder="password"
              onChangeText={handleChange("password")}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TextInput
              style={
                errors.confirmPassword ? styles.inputViewErr : styles.inputView
              }
              value={values.confirmPassword}
              secureTextEntry={true}
              placeholder="confirm password"
              onChangeText={handleChange("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
            <TextInput
              style={errors.location ? styles.inputViewErr : styles.inputView}
              value={values.location}
              placeholder="address"
              onChangeText={handleChange("location")}
            />
            {errors.location ? (
              <Text style={styles.errorText}>{errors.location}</Text>
            ) : null}
            <TextInput
              style={errors.contact ? styles.inputViewErr : styles.inputView}
              value={values.contact}
              placeholder="contact"
              keyboardType="phone-pad"
              onChangeText={handleChange("contact")}
            />
            {errors.contact ? (
              <Text style={styles.errorText}>{errors.contact}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.createBtn}
              disabled={isLoading || isCreated}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={{ color: "#fff", fontSize: 17 }}>
                  Create account
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#680A20",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 30,
    marginVertical: 20,
  },
  inputView: {
    backgroundColor: "#ECC763",
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 35,
    alignItems: "center",
    paddingLeft: 15,
  },
  inputViewErr: {
    backgroundColor: "#ECC763",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 35,
    alignItems: "center",
    paddingLeft: 15,
  },
  errorText: {
    // position: "absolute",
    bottom: 35,
    color: "red",
    fontStyle: "italic",
    // marginTop: 0,
    // marginBottom: 30,
  },
  createBtn: {
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#680A20",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
