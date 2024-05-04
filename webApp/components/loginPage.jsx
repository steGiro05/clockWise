import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"; // Importato ActivityIndicator per mostrare un indicatore di caricamento
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const LoginPage = ({ navigation }) => {
  const url = "http://192.168.178.23:5000";

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fireUserControl, setFireUserControl] = useState(false);

  useEffect(() => {
    console.log("useffect");
    /* getUser(); */
  }, [fireUserControl]);

  const login = async () => {
    setIsLoading(true);

    // Controllo se sono stati inseriti entrambi i parametri
    if (!credentials.username || !credentials.password) {
      if (!credentials.username && !credentials.password) {
        setLoginError("No username or password provided");
      } else if (!credentials.username) {
        setLoginError("No username provided");
      } else {
        setLoginError("No password provided");
      }
      setIsLoading(false); // Non dimenticare di impostare isLoading su false
      return;
    }

    // Controllo se lo username ha almeno 5 caratteri
    if (credentials.username.length < 5) {
      setLoginError("Username must be at least 5 characters long");
      setIsLoading(false); // Non dimenticare di impostare isLoading su false
      return;
    }

    // Se entrambi i controlli passano, procedi con il login
    await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          setLoginError("Invalid Credentials");
          // Esci dalla catena di promesse
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then(() => {
        setFireUserControl((prev) => !prev);
        setLoginError(null);
      })
      .catch((error) => {
        // Se la risposta non è "ok", questa sezione verrà eseguita
        console.log("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false una volta completato il login
        // Qui non viene chiamato setLoginError(null) se la risposta non è "ok"
      });
  };

  const getUser = async () => {
    await fetch(`${url}/get_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((json) => {
        /* console.log(json); */
      })
      .catch((error) => {
        console.log("Error:", error);
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
      <View style={styles.container}>
        <Text style={styles.title}> Login</Text>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={(text) => {
              setCredentials((prev) => ({ ...prev, username: text }));
            }}
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={(text) => {
              setCredentials((prev) => ({ ...prev, password: text }));
            }}
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={login}
          style={[styles.loginBtn, isLoading && styles.disabledBtn]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.loginText}>LOGIN </Text>
          )}
        </TouchableOpacity>
        {loginError && <Text style={styles.errorText}>{loginError}</Text>}
      </View>
    </>
  );
};

export default LoginPage;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3AB4BA",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#FFFFFF",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3AB4BA",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: "#3AB4BA",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#3AB4BA", // Cambia il colore del bottone di login a blu
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
};
