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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.background}
        resizeMode="cover" // Imposta la modalità di ridimensionamento dell'immagine
      >
        <View style={styles.content}>
          {/* Testo di benvenuto */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Benvenuto,</Text>

            <Text style={styles.text}>
              {user.first_name} {user.last_name}
            </Text>
          </View>

          {/* Status Indicator */}
          <View
            style={[styles.statusIndicator, { backgroundColor: statusColor }]}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {
    height: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  background: {
    flex: 1, // Imposta l'immagine a riempire completamente lo spazio
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribuisce gli elementi all'estremità dei contenitori flessibili
    alignItems: "center",
    paddingHorizontal: 10,
    height: "100%", // Altezza del contenitore pari all'altezza del componente
  },
  welcomeContainer: {
    flex: 1,
    marginTop: 30,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
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
