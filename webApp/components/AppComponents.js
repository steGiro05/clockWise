import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HeaderComponent = ({ name, surname }) => {
    return (
        <View style={{ height: 60, backgroundColor: '#007bff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
            {/* Parametri name e surname a sinistra */}
            <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>{name} {surname}</Text>
            </View>
            {/* Icona di campanello per le notifiche a destra */}
            {/* <TouchableOpacity onPress={() => console.log('Notifiche')}>
                <Ionicons name="ios-notifications-outline" size={24} color="#fff" />
            </TouchableOpacity> */}
        </View>
    );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const AppComponents = ({ name, surname }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ header: () => <HeaderComponent name={name} surname={surname} /> }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
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