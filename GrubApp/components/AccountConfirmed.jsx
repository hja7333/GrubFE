import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export const AccountConfirmed = ({ route, navigation }) => {
  const { newUser } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo_transparent.png")}
        style={styles.logoImage}
      />
      <Text style={styles.welcomeText}>
        {`Welcome to Grub ${newUser.username}!\nYour account has been created`}
      </Text>
      <TouchableOpacity
        color="#334bd6"
        style={styles.createBtn}
        onPress={() => navigation.navigate("Login", {newUser})}>
        <Text style={{ color: "#fff", fontSize: 17 }}>Log in now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  createBtn: {
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "#680A20",
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 300,
    height: 300,
  },
  welcomeText: {
    fontSize: 18,
    color: "#680A20",
    //#680A20
    textAlign: "center",
    fontWeight: "bold",
    margin: 1,
  },
});
