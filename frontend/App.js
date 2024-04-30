import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

const postData = {
  username: "marcussmith",
  password: "marcussmith",
};

const login = async () => {
  await fetch("http://192.168.56.1:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getId = async () => {
  try {
    const response = await fetch("http://192.168.56.1:5000/get_user", {
      credentials: "include", // Abilita il supporto dei cookie
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("User data:", data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export default function App() {
  console.log("started");
  return (
    <View style={styles.container}>
      <Text>Ciao touri!!</Text>
      <StatusBar style="auto" />
      <Button title="Click me!" onPress={login}></Button>
      <Button title="Click me!" onPress={getId}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});