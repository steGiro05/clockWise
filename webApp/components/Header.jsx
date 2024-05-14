import React from "react";
import { View, Text, ImageBackground } from "react-native";

const HeaderComponent = ({ user, status }) => {
  let statusColor;
  let statusName;
  switch (status) {
    case 0:
      statusColor = "red";
      statusName = "Not Clocked In";
      break;
    case 1:
      statusColor = "lightgreen"; // Verde più acceso per stato 1
      statusName = "Clocked In";
      break;
    case 2:
      statusColor = "yellow"; // Colore giallo per stato 2
      statusName = "On Break";
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
            <Text style={styles.welcomeText}>Welcome,</Text>

            <Text style={styles.text}>
              {user.first_name} {user.last_name}
            </Text>
            {/* Status Indicator */}
            <View style={styles.statusView}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: statusColor },
                ]}
              ></View>
              <Text style={styles.statusName}>{statusName}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {
    height: 110,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  background: {
    paddingHorizontal: 10,
    flex: 1, // Imposta l'immagine a riempire completamente lo spazio
  },
  content: {
    justifyContent: "center", // Spazio tra gli elementi
    flexDirection: "column",
    alignItems: "flex-start", // Allinea gli elementi a sinistra
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
  statusView: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    marginTop: 5,
    width: 50,
    height: 15,
    borderRadius: 15,
  },
  statusName: {
    color: "#fff",
    fontWeight: "500", // Semibold
    marginLeft: 10, // Spazio tra l'indicatore di stato e il nome dello stato
  },
};

export default HeaderComponent;
