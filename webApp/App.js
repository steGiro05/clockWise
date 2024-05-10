<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
// import AuthComponents from "./components/AuthComponents";
// import SplashScreen from "./components/SplashScreen";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Esegui il recupero dell'utente quando il componente viene montato
//     getUser();
//   }, []);

//   const login = async () => {
//     setIsLoading(true)
//     console.log('login');
//     await fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: "marcussmith",
//         password: "marcussmith",
//       }),
//       credentials: 'include',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         setIsLoggedIn(true);
//         setUser(json); // Imposta il nome utente
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Imposta isLoading a false una volta completato il login
//       });
//   }

//   const getUser = async () => {
//     setIsLoading(true)
//     console.log('get_user');
//     await fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/get_user', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         if (json.username) {
//           setIsLoggedIn(true);
//           setUser(json);
//         } else {
//           setIsLoggedIn(false);
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Imposta isLoading a false una volta completato il recupero dell'utente
//       });
//   }

//   const logout = async () => {
//     setIsLoading(true);
//     console.log('logout');
//     await fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/logout', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         setIsLoggedIn(false);
//         setUsername(null);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Imposta isLoading a false una volta completato il logout
//       });
//   }

//   return (
//     <>
//       {isLoading ? ( // Se isLoading è true, visualizza un indicatore di caricamento
//         <SplashScreen />
//       ) : (
//         isLoggedIn ? (  
//           <AppComponents user={user} /> 
//         ) : (
//           <AuthComponents login={login} />
//         )
//       )}
//     </>
//   );
// }

const App = () => {
  return (
    <HomeScreen />
>>>>>>> 8ec45a23582a7183aafb696a3b23f74627bc7644
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
