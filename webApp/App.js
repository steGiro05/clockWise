import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SessionProvider, useSession } from "./context/SessionContext";
import "react-native-reanimated"; //comando per fixare la navigazione da IOS

import DashboardPage from "./pages/DashboardPage";
import ScannerPage from "./pages/ScannerPage";
import ProfilePage from "./pages/ProfilePage";
import HeaderComponent from "./components/Header";
import ChangePwPage from "./pages/ChangePwPage";
import { AntDesign } from "@expo/vector-icons"; // Importa le icone da Expo

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//user routes with footer
function Home() {
  const { user } = useAuth();
  const { session } = useSession();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <HeaderComponent user={user} status={session} />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home"; // Imposta l'icona per la scheda Home
          } else if (route.name === "Scanner") {
            iconName = focused ? "scan1" : "scan1"; // Imposta l'icona per la scheda Scanner
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user"; // Imposta l'icona per la scheda Profile
          }

          // Restituisci l'icona con il nome e il colore appropriati
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue", // Imposta il colore blu per le etichette delle schede attive
        tabBarInactiveTintColor: "gray", // Imposta il colore grigio per le etichette delle schede inattive
        tabBarStyle: {
          display: "flex",
          height: 60, // Altezza del footer
        },
        headerStyle: {
          height: 120, // Altezza dell'header
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardPage} />
      <Tab.Screen name="Scanner" component={ScannerPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

//main navigation layout with protected routes
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
          <>
            <Stack.Screen name="Test" component={Home} />
            <Stack.Screen name="ChangePw" component={ChangePwPage} />
          </>
        ) : (
          <Stack.Screen name="Home" component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//main app component
export default function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <Layout></Layout>
      </SessionProvider>
    </AuthProvider>
  );
}
