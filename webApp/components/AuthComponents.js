import React from "react";
import { View, Text, Button } from "react-native";


const AuthComponents = ({ login }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Auth Components</Text>
        <Button title="Click me" onPress={login} />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
}

export default AuthComponents;