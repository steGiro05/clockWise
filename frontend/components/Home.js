import React from "react";
import { View, Text, Button } from "react-native";


const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Welcome to the Home page!</Text>
      <Button
        title="Go to Scanner"
        onPress={() => navigation.navigate("Scanner")}
      />
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
export default Home;
