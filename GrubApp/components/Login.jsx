import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  Image,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkingCredentials, setCheckingCredentials] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { setUser } = useContext(UserContext);

  const login = () => {
    setCheckingCredentials(true);
    setAuthError(null);
    axios
      .post("https://grub-group-project.onrender.com/api/auth", {
        username,
        password,
      })
      .then(({ data }) => {
        setCheckingCredentials(false);
        setUser(data);
        navigation.navigate("MapScreen");
      })
      .catch((err) => {
        setCheckingCredentials(false);
        setAuthError(err);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Welcome to Grub!</Text>
        <Image
          source={require("../assets/logo_transparent.png")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          editable={!checkingCredentials}
          selectTextOnFocus={!checkingCredentials}
          placeholder="Username..."
          //         {routeparams ?
          //   setNewUsername(route.params.newUsername) : null
          // }

          onChangeText={(username) => {
            setUsername(username);
          }}
        >
          {/* <Text>{newUsername}</Text> */}
        </TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          editable={!checkingCredentials}
          selectTextOnFocus={!checkingCredentials}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => {
            setPassword(password);
          }}
        ></TextInput>
      </View>
      {authError ? (
        <Text style={styles.authFail}>Authentication Failed!</Text>
      ) : (
        <Text style={styles.authFail}></Text>
      )}
      <TouchableOpacity
        style={styles.loginButton}
        disabled={checkingCredentials}
        onPress={login}
      >
        {checkingCredentials ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "#fff", fontSize: 17 }}>Login</Text>
        )}
      </TouchableOpacity>

      <View>
        <Button
          style={styles.createAccount}
          color="#680A20"
          title="Create Account"
          disabled={checkingCredentials}
          onPress={() => navigation.navigate("CreateAccount")}
        ></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#def9ef",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#680A20",
    fontWeight: "bold",
    fontSize: 35,

    marginBottom: 40,
    marginTop: 10,
  },
  inputView: {
    backgroundColor: "#ECC763",
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 35,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },
  loginButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,

    marginBottom: 40,
    backgroundColor: "#680A20",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  createAccount: {
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 30,
  },
  logoImage: {
    justifyContent: "center",
    alignItems: "center",

    height: 300,
    width: 300,
  },
  authFail: {
    color: "#f00",
    marginBottom: 5,
  },
});
