import React from "react";
import { View, Text, Button } from "react-native";


const App = () => {
  return (
    <View>
      <Text>Hello, nabil!</Text>
      <Button title="Get BTC Price" onPress={cryptoAPI} />
    </View>
  );
}

export default App;