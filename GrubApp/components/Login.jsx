import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  StatusBar,
} from "react-native";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Welcome to Grub!</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username..."
          onChangeText={(username) => {
            setUsername(username);
          }}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(username) => {
            setUsername(username);
          }}
        ></TextInput>
      </View>

      <View style={styles.loginView}>
        <Button title="login" color="#334bd6"></Button>
      </View>
      <View style={styles.createAccount}>
        <Button
          title="Create Account"
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
    borderRadius: 30,
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
  loginView: {
    borderRadius: 30,
    backgroundColor: "#334bd6",
    width: "30%",
    height: 45,
    alignItems: "center",
  },
  createAccount: {
    marginTop: 30,
  },
});
