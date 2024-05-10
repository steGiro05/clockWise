import { View, Text, StyleSheet } from "react-native";
import React from "react";

const StatsCard = ({ title, data, barColor }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Arrange content horizontally
    justifyContent: "space-between", // Arrange content with space between
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});

export default StatsCard;
