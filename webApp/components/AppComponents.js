import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Scanner from "./Scanner";

const Stack = createNativeStackNavigator();

// const AppComponents = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown : false}}>
//                 <Stack.Screen name="Main" component={Home} />
//                 <Stack.Screen name="Scanner" component={Scanner} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

const AppComponents = ({ logout }) => {
  return (
    <>
      <Text style={styles.text}>App Components</Text>
      <Button title="Click me" onPress={logout} />
    </>
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
};

export default AppComponents;
