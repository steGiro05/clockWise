import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Home = () => {
    const [name, setName] = useState('John Doe')

    return (
        <View>
            <Text>Home</Text>
            <Text>{name}</Text>
            <Button title = "Change Name" onPress = {() => setName("This is changed")} />
        </View>
    );
};

export default Home;
