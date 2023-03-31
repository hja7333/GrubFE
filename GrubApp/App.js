import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./components/Login";
import { ListItem } from "./components/ListItem";
import { MapScreen } from "./components/MapScreen";
import { CreateAccount } from "./components/CreateAccount";
import { UserProvider } from "./contexts/UserContext";
import React, { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="ListItem" component={ListItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
