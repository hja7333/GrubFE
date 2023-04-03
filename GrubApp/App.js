import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./components/Login";
import { ListItem } from "./components/ListItem";
import { MapScreen } from "./components/MapScreen";
import { MapView } from "./components/MapView";
import { NavBar } from "./components/NavBar";
import { ViewItems } from "./components/ViewItems";
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
            headerStyle: {
              height: 40,
            },
            animation: "none",
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="MapView" component={MapView} />
          <Stack.Screen name="ListItem" component={ListItem} />
          <Stack.Screen name="ViewItems" component={ViewItems} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
