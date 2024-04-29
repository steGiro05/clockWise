import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'
import Scanner from './Scanner'

const Stack = createNativeStackNavigator();

const Components = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown : false}}>
                <Stack.Screen name="Main" component={Home} />
                <Stack.Screen name="Scanner" component={Scanner} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Components