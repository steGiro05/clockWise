import { View, Text, StyleSheet } from "react-native";
import React from "react";

const StatsCard = ({ title, data, barColor }) => {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.cardContent,
          { backgroundColor: barColor, borderLeftColor: barColor },
        ]}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardData}>{data}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Arrange content horizontally
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, // Add margin below title
  },
  cardDetails: {
    alignItems: "flex-start", // Align items to the top
  },
  cardData: {
    fontSize: 14,
  },
});

export default StatsCard;
