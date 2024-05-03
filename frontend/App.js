import React from "react";
import { View, Text, Button } from "react-native";

const App = () => {
  return (
    <View>
      <Text>React Native Web</Text>
      <Button title="Click me" onPress={() => alert("Button clicked")} />
    </View>
  );
}

export default App;