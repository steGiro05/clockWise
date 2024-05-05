import React from "react";
import { View, Text } from "react-native";

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
      {/* Testo di benvenuto */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Benvenuto,</Text>

        <Text style={styles.text}>
          {user.first_name} {user.last_name}
        </Text>
      </View>

      {/* Stato */}
      <View
        style={[styles.statusIndicator, { backgroundColor: statusColor }]}
      />
    </View>
  );
};

const styles = {
  container: {
    height: 100,
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    marginLeft: 10,
  },
};

export default HeaderComponent;
