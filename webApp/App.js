import React from "react";
import { View, Text, Button } from "react-native";
import AppComponents from "./components/AppComponents";
import AuthComponents from "./components/AuthComponents";

const 

const App = () => {
  return (
    <View>
      <Text>React Native Web</Text>
      <Button title="Click me" onPress={() => alert("Button clicked")} />
    </View>
  );
}

export default App; 