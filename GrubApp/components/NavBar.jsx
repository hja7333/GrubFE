import { View, Text, TouchableOpacity } from "react-native";

export const NavBar = ({ params }) => {
  const { navigation, route, options, back } = params;
  const atLogin = route.name === "Login";
  return atLogin ? (
    <View></View>
  ) : (
    <View>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
