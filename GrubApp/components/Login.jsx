import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export const Login = ({ navigation }) => {
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
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          editable={!checkingCredentials}
          selectTextOnFocus={!checkingCredentials}
          placeholder="Username..."
          onChangeText={(username) => {
            setUsername(username);
          }}
        ></TextInput>
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

      <View style={styles.createAccount}>
        <Button
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#334bd6",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 40,
    marginTop: 10,
  },
  inputView: {
    backgroundColor: "#94d2a9",
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
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#334bd6",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  createAccount: {
    marginTop: 30,
  },
  authFail: {
    color: "#f00",
    marginBottom: 5,
  },
});
