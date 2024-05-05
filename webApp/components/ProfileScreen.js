import React from "react";
import { Text, View } from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Profile page!</Text>
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

export default ProfileScreen;