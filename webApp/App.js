import React, { useState, useEffect } from "react";
import AppComponents from "./components/AppComponents";
import AuthComponents from "./components/AuthComponents";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Esegui il recupero dell'utente quando il componente viene montato
    getUser();
  }, []);

  const login = async () => {
    setIsLoading(true)
    console.log('login');
    await fetch('http://192.168.1.40:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "marcussmith",
        password: "marcussmith",
      }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsLoggedIn(true);
        setUser(json); // Imposta il nome utente
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il login
      });
  }

  const getUser = async () => {
    setIsLoading(true)
    console.log('get_user');
    await fetch('http://192.168.1.40:5000/get_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.username) {
          setIsLoggedIn(true);
          setUser(json);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il recupero dell'utente
      });
  }

  const logout = async () => {
    setIsLoading(true);
    console.log('logout');
    await fetch('http://192.168.1.40:5000/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIsLoggedIn(false);
        setUsername(null);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il logout
      });
  }

  return (
    <>
      {isLoading ? ( // Se isLoading è true, visualizza un indicatore di caricamento
        <SplashScreen />
      ) : (
        isLoggedIn ? (  
          <AppComponents user={user} /> 
        ) : (
          <AuthComponents login={login} />
        )
      )}
    </>
  );
}

export default App;
