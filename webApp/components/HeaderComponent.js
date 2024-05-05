import React from "react";
import { View, Text } from "react-native";

const HeaderComponent = ({ user }) => {
    return (
        <View style={styles.container}>
            {/* Testo di benvenuto */}
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Benvenuto,</Text>
            
            
            
                <Text style={styles.text}>{user.first_name} {user.last_name}</Text>
            </View>
        </View>
    );
}

const styles = {
    container: {
        height: 100,
        backgroundColor: '#007bff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    welcomeContainer: {
        flex: 1,
        marginTop: 30
    },
    welcomeText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 2,
    },
    title : {
        
    },
    text : {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
}

export default HeaderComponent;
