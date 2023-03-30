import { View, Text, StatusBar } from "react-native";

export const CreateAccount = ({ navigation }) => {
  return (
    <View>
      <Text>Create your account here {global.token}</Text>
      <StatusBar style="auto" />
    </View>
  );
};
