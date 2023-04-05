import {
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
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
    <SafeAreaView>
      
    <ScrollView style={{ backgroundColor: "#e6fdf4", flexDirection: "column" }}
   nestedScrollEnabled={true}
   contentContainerStyle={{ flexGrow: 1 }}>   
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
                console.log(err);
                setIsCreated(false);
              });
          }}>
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.container}>
              
              <Image
          source={require("../assets/logo_transparent.png")}
          style={styles.logoImage}
        />
        <Text style={styles.header}>Create your account</Text>
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
                  errors.confirmPassword
                    ? styles.inputViewErr
                    : styles.inputView
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
              placeholder="Enter your postcode"
              onChangeText={handleChange("location")}
            /> 

            {errors.location ? (
                <View><Text style={styles.errorText}>{errors.location}</Text></View>
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
                onPress={handleSubmit}>
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
 
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    backgroundColor: "#e6fdf4",
    alignItems: "center",
    marginBottom: 40
  },
  header: {
    width: "80%",
    color: "#9c0444",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center"
  },
  logoImage: {
    justifyContent: "center",
    alignItems: "center",
    height: 220,
    width: 400,
  },
  inputView: {
    backgroundColor: "#ECC763",
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 35,
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
    paddingLeft: 15,
  },
  errorText: {
    bottom: 35,
    color: "red",
    fontStyle: "italic",
  },
  createBtn: {
    top: 20,
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: "#9c0444",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
