import React from 'react'
import { View, Text, Button } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Welcome to the Splash Screen!</Text>
    </View>
  )
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

export default SplashScreen
