import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  Image,
  StyleSheet,
  Button,
  Text,
  TextInput,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export const Login = ({ navigation, route}) => {
  
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
    <ScrollView>
    <View style={styles.container}>
      <View>
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


  onChangeText={(username) => {
            setUsername(username);
          }}
        >
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
      <TouchableOpacity
        style={styles.createAccount}
        disabled={checkingCredentials}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        
          <Text style={{ color: "#fff", fontSize: 17 }}>Create account</Text>
        
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#def9ef",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#ECC763",
    borderRadius: 20,
    width: "70%",
    height: 45,
    bottom: 70,
    marginBottom: 40,
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
    bottom: 85,
    marginBottom: 40,
    backgroundColor: "#680A20",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  createAccount: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    bottom: 90,
    marginBottom: 40,
    backgroundColor: "#680A20",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    alignItems: "center",
    height: 450,
    width: 450,
  },
  authFail: {
    color: "#f00",
    marginBottom: 5,
  },
});
