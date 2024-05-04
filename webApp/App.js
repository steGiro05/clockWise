import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native"; // Importato ActivityIndicator per mostrare un indicatore di caricamento
import AppComponents from "./components/AppComponents";
import AuthComponents from "./components/AuthComponents";
import SplashScreen from "./components/SplashScreen";
import QrScanner from "./components/QrScanner";

const App = () => {
  const url = "http://192.168.178.23:5000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Esegui il recupero dell'utente quando il componente viene montato
    getUser();
  }, []);

  const login = async () => {
    setIsLoading(true);
    console.log("login");
    await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "marcussmith",
        password: "marcussmith",
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsLoggedIn(true);
        setUsername(json.username); // Imposta il nome utente
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il login
      });
  };

  const getUser = async () => {
    setIsLoading(true);
    console.log("get_user");
    await fetch(`${url}/get_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.username) {
          setIsLoggedIn(true);
          setUsername(json.username);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il recupero dell'utente
      });
  };

  const logout = async () => {
    setIsLoading(true);
    console.log("logout");
    await fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsLoggedIn(false);
        setUsername(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il logout
      });
  };

  return (
    <>
      {isLoading ? ( // Se isLoading è true, visualizza un indicatore di caricamento
        <SplashScreen />
      ) : isLoggedIn ? (
        <>
          <QrScanner />
        </>
      ) : (
        <AuthComponents login={login} />
      )}
    </>
  );
};

export default App;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
};
