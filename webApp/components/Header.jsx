import React from "react";
import { View, Text, ImageBackground } from "react-native";

const HeaderComponent = ({ user, status }) => {
  let statusColor;
  switch (status) {
    case 0:
      statusColor = "red";
      break;
    case 1:
      statusColor = "lightgreen"; // Verde più acceso per stato 1
      break;
    case 2:
      statusColor = "yellow"; // Colore giallo per stato 2
      break;
    default:
      statusColor = "transparent"; // Colore di default o trasparente per altri stati
      break;
  }

  return (
    <ImageBackground
      source={require("../assets/background.png")} // Imposta l'immagine di sfondo
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* Testo di benvenuto */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome,</Text>

          <Text style={styles.text}>
            {user.first_name} {user.last_name}
          </Text>
        </View>

        {/* Stato */}
        <View
          style={[styles.statusIndicator, { backgroundColor: statusColor }]}
        />
      </View>
    </ImageBackground>
  );
};

const styles = {
  container: {
    height: 120, // Altezza aumentata
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20, // Angoli inferiori arrotondati
    borderBottomRightRadius: 20, // Angoli inferiori arrotondati
    paddingBottom: 10, // Padding inferiore aggiunto
  },
  overlay: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between", // Distribuisce gli elementi all'estremità dei contenitori flessibili
    alignItems: "center", // Allinea gli elementi verticalmente
    marginTop: 30,
  },
  welcomeContainer: {
    flexDirection: "row", // Permette di allineare il testo di benvenuto e il nome utente su una riga
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
    marginRight: 10, // Aggiunge un margine tra il testo di benvenuto e il nome utente
  },
  title: {},
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
};

export default HeaderComponent;
