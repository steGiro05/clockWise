import React from "react";
import { View, Text, Button } from "react-native";

const AuthComponents = () => {
    return (
        <View>
        <Text>Auth Components</Text>
        <Button title="Click me" onPress={() => alert("Button clicked")} />
        </View>
    );
}

export default AuthComponents;