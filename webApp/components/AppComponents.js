import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeaderComponent from './HeaderComponent';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Scanner from './Scanner';

const Tab = createBottomTabNavigator();

const AppComponents = ({ user }) => {
  const [activityState, setActivityState] = useState(null);

  useEffect(() => {
    fetchActivityState();
  }, []);

  const fetchActivityState = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_state', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Includi eventuali header aggiuntivi richiesti dal backend
        },
      });
      const data = await response.json();
      // Imposta lo stato di attività
      setActivityState(data);
    } catch (error) {
      console.error('Errore nel fetch dello stato di attività:', error);
      // Gestisci l'errore in base alle tue esigenze
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ header: () => <HeaderComponent name={user.first_name} surname={user.last_name} /> }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Scanner" component={Scanner} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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

export default AppComponents;