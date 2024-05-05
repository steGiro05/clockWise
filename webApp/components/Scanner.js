import React from 'react'
import { View, Text } from 'react-native'

const Scanner = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} >Welcome to the Scanner page!</Text>
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

export default Scanner
