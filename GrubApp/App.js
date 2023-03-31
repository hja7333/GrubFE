import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./components/Login";
import { ListItem } from "./components/ListItem";
import { MapView } from "./components/MapView";
import { NavBar } from "./components/NavBar";
import { CreateAccount } from "./components/CreateAccount";
import { UserProvider } from "./contexts/UserContext";
import React, { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (params) => <NavBar params={params} />,
            headerStyle: 80,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="MapView" component={MapView} />
          <Stack.Screen name="ListItem" component={ListItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
