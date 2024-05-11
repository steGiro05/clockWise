import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./pages/LoginPage";
import PagesHandler from "./pages/PagesHandler";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionContext";
import "react-native-reanimated"; //comando per fixare la navigazione da IOS

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <Layout></Layout>
      </SessionProvider>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="Test" component={PagesHandler} />
        ) : (
          <Stack.Screen name="Home" component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
