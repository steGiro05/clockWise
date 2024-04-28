import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class ClassHome extends Component {
    state = {
        name: "Nabil Touri"
    }

    render() {
        return (
            <View>
                <Text style = {{fontSize:20, color:'purple'}}>Hello from Class</Text>
                <Text style = {{paddingTop:20, fontSize:20}}>{this.state.name}</Text>
                <Button title = "Change Name" onPress = {() => this.setState({name: "This is changed"})} />
            </View>
        )
    }
}

export default ClassHome
