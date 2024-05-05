import React from "react";
import { View, Text, Button } from "react-native";


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Welcome to the Home page!</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
}
export default HomeScreen;
