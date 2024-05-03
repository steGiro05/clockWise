import React from "react";
import { View, Text, Button } from "react-native";
import AppComponents from "./components/AppComponents";
import AuthComponents from "./components/AuthComponents";

const getUser = async () => {
  await fetch("http://localhost:5000/api/user", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.username) {
        auth = true;
      } else {
        auth = false;
      }
    });
  }


const App = () => {
  return (
    auth ? (
      <AppComponents />
    ) : (
      <AuthComponents />
    )
  );
}

export default App; 