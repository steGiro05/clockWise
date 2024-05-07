import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const LoginPage = ({}) => {
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);

    // Rimuovi eventuali spazi bianchi dalla fine delle stringhe
    const trimmedUsername = credentials.username.trim();
    const trimmedPassword = credentials.password.trim();

    // Controllo se sono stati inseriti entrambi i parametri
    if (!trimmedUsername || !trimmedPassword) {
      if (!trimmedUsername && !trimmedPassword) {
        setLoginError("No username or password provided");
      } else if (!trimmedUsername) {
        setLoginError("No username provided");
      } else {
        setLoginError("No password provided");
      }
      setIsLoading(false);
      return;
    }

    // Controllo se lo username ha almeno 5 caratteri
    if (trimmedUsername.length < 5) {
      setLoginError("Username must be at least 5 characters long");
      setIsLoading(false);
      return;
    }

    const result = await onLogin(trimmedUsername, trimmedPassword);
    if (result.status != 200) {
      setLoginError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}> LogIn</Text>
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
    </ImageBackground>
  );
};

export default LoginPage;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20, // Angoli inferiori arrotondati
    borderBottomRightRadius: 20, // Angoli inferiori arrotondati
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
    width: "50%",
    backgroundColor: "#85C2FF", // Cambia il colore di sfondo del bottone
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
};
