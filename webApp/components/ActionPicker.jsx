import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";

const ActionPicker = ({ onActionPick }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Pick your action</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FFC574" }]}
          onPress={() => onActionPick("start_break")}
        >
          <Text style={styles.buttonText}>Break</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF4141" }]}
          onPress={() => onActionPick("exit")}
        >
          <Text style={styles.buttonText}>Stop Working</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#FFFFFF", // Colore del testo bianco
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25, // Rendi il bordo dei bottoni più tondo
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Aggiungi spazio tra i bottoni
    backgroundColor: "#4CAF50", // Colore base del bottone (verde)
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10, // Aggiungi spazio verticale tra i bottoni
  },
});

export default ActionPicker;
