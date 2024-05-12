import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useSession } from "../context/SessionContext";
import StatsCard from "../components/StatsCard";
import { MaterialIcons } from "@expo/vector-icons";
import url from "../utils/url";

const ProfilePage = () => {
  const { user, onLogout } = useAuth();
  const { session } = useSession();

  const { username, first_name, last_name, birthday } = user;

  const [userStats, setUserStats] = useState();
  const [error, setError] = useState(false);

  const logout = () => {
    onLogout();
  };

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${url}/get_user_stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle your data here
      console.log(data);
      setError(false);

      return data;
    } catch (error) {
      // Handle the error here
      setError(true);
      console.log("There has been a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await fetchUserStats();
        setUserStats(result);
      } catch (error) {
        console.log("Failed to fetch user stats:", error);
      }
    };

    fetchStats();
  }, [session]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && (
        <View style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}>
          <Text style={{ color: "white" }}>No user Data!</Text>
        </View>
      )}
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
          onPress={logout}
          style={[styles.button, styles.redButton]}
        >
          <Text style={[styles.buttonText, { marginRight: 10 }]}>Logout</Text>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {!error && (
        <>
          <Text style={styles.title}>My Stats</Text>
          <View style={styles.myAccount}>
            <StatsCard
              title={"Average Entry Hour"}
              data={userStats?.avg_entry_time.split(":").slice(0, 2).join(":")}
              mainColor={"blue"}
              backgroundColor={"#EAEFFF"}
            />
            <StatsCard
              title={"Average Exit Hour"}
              data={userStats?.avg_exit_time.split(":").slice(0, 2).join(":")}
              mainColor={"red"}
              backgroundColor={"#FFC8C0"}
            />
            <StatsCard
              title={"Average Break"}
              data={(userStats?.avg_pause_duration / 60).toFixed(2) + " min"}
              mainColor={"orange"}
              backgroundColor={"#FFEEC0"}
            />
          </View>
        </>
      )}
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
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  redButton: {
    backgroundColor: "#FF4141",
  },
});

export default ProfilePage;
