import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import ClassHome from './components/ClassHome';

const App = () => {
  return (
    <View style={styles.container}>
      <Home />
      <ClassHome name = "Nabil Touri" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
