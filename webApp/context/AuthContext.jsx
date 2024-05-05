import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const url = "http://192.168.178.23:5000";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const get_user = async () => {
      try {
        const response = await fetch(`${url}/get_user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Invalid response");
        }

        const json = await response.json();
        setUser(json);
      } catch (error) {
        console.log("Error:", error);
        return;
      }
    };

    get_user();
  }, []);

  const login = async (username, password) => {
    return await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          // Esci dalla catena di promesse
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((json) => {
        setUser(json.user);
        return { message: "Loggin in", status: 401 };
      })
      .catch((error) => {
        // Se la risposta non è "ok", questa sezione verrà eseguita
        console.log("Error:", error);
        return { message: "Unauthorized", status: 401 };
      });
  };

  const logout = async () => {
    try {
      await fetch(`${url}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
