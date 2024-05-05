import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../context/AuthContext";

const PagesHandler = () => {
  const { onLogout, user } = useAuth();

  const logout = async () => {
    await onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {user.username}</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PagesHandler;
