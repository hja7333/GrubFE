import {
  View,
  Button,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
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
  const [newUserMessage, setNewUserMessage] = useState("");
  const [isCreated, setIsCreated] = useState(false);

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
              setIsCreated(true);
              setNewUserMessage(
                `Welcome to Grub ${newUser.username}! Your account has been created`
              );
            })
            .catch((err) => {
              console.log(err);
              setIsCreated(false);
            });
        }}>
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <Text style={styles.header}>Fill in your details below:</Text>
            {isCreated ? (
              <View>
                <AccountConfirmed newUserMessage={newUserMessage} />
                <Button
                  color="#334bd6"
                  style={styles.createBtn}
                  title="Log in now!"
                  onPress={() => props.navigation.navigate("Login")}
                />
              </View>
            ) : null}
            <TextInput
              style={styles.inputView}
              value={values.username}
              placeholder="username"
              onChangeText={handleChange("username")}
            />
            {errors.username ? <Text>{errors.username}</Text> : null}
            <TextInput
              style={styles.inputView}
              value={values.password}
              secureTextEntry={true}
              placeholder="password"
              onChangeText={handleChange("password")}
            />
            {errors.password ? <Text>{errors.password}</Text> : null}
            <TextInput
              style={styles.inputView}
              value={values.confirmPassword}
              secureTextEntry={true}
              placeholder="confirm password"
              onChangeText={handleChange("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <Text>{errors.confirmPassword}</Text>
            ) : null}
            <TextInput
              style={styles.inputView}
              value={values.location}
              placeholder="address"
              onChangeText={handleChange("location")}
            />
            {errors.location ? <Text>{errors.location}</Text> : null}
            <TextInput
              style={styles.inputView}
              value={values.contact}
              placeholder="contact"
              keyboardType="phone-pad"
              onChangeText={handleChange("contact")}
            />
            {errors.contact ? <Text>{errors.contact}</Text> : null}
            <Button
              color="#334bd6"
              style={styles.createBtn}
              title="submit"
              disabled={isCreated}
              onPress={handleSubmit}></Button>
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
    color: "#334bd6",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 30,
    marginVertical: 20,
  },
  inputView: {
    backgroundColor: "#94d2a9",
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 35,
    alignItems: "center",
    paddingLeft: 15,
  },
  createBtn: {
    borderRadius: 30,
    backgroundColor: "#334bd6",
    width: "30%",
    height: 45,
    alignItems: "center",
  },
});
