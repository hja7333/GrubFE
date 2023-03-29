import { Button, View, StatusBar } from "react-native";

export const Test = ({ navigation }) => {
  return (
    <View>
      <StatusBar style="auto" />
      <Button
        title="Login to your account"
        onPress={() => navigation.navigate("Login")}
      ></Button>
    </View>
  );
};
