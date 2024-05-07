import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { onLogout } = useAuth();

  const logout = () => {
    onLogout();
  };

  return (
    <View>
      <Text>ProfilePage</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default ProfilePage;
