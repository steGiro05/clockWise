import React from 'react'
import { View, Text, Button } from 'react-native'

const Scanner = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} >Welcome to the Scanner page!</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Main')}
            />
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
