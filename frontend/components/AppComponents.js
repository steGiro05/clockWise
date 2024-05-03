import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'
import Scanner from './Scanner'

export let button

const Stack = createNativeStackNavigator();

const AppComponents = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown : false}}>
                <Stack.Screen name="Main" component={Home} />
                <Stack.Screen name="Scanner" component={Scanner} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppComponents