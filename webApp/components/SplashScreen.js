import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
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
