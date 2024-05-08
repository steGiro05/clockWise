import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import StatsCard from "../components/StatsCard";
import RingStatsCard from "../components/RingStatsCard";

const ProfilePage = () => {
  const { user, onLogout } = useAuth();

  const { username, first_name, last_name, birthday } = user;

  const logout = () => {
    onLogout();
  };

  const changePassword = () => {
    // Implement password change logic here
    // For example, navigate to a change password page
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <View style={styles.myAccount}>
        <View style={styles.userData}>
          <View style={styles.row}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.text}>{username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.text}>{first_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.text}>{last_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Birthday:</Text>
            <Text style={styles.text}>{birthday}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={changePassword}
          style={[styles.button, styles.blueButton]}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={[styles.button, styles.redButton]}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>My Stats</Text>
      <View style={styles.myAccount}>
        <StatsCard title={"Average entry hour"} data={10} barColor={"red"} />
        <StatsCard title={"Average exit hour"} data={8.69} />
        <RingStatsCard title={"Average working hours"} />
        <RingStatsCard title={"Average break hours"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Makes the content container fill available vertical space
    justifyContent: "center", // Vertically centers the content
    alignItems: "center",
    flexDirection: "column", // Stacks content vertically
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  myAccount: {
    padding: 10,
    width: "100%",
  },
  userData: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  blueButton: {
    backgroundColor: "blue",
  },
  redButton: {
    backgroundColor: "red",
  },
});

export default ProfilePage;
