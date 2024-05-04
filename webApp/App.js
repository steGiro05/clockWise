import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./components/loginPage";
import TestPage from "./components/testPage";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="Test" component={TestPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
