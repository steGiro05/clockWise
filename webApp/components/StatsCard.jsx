import { View, Text, StyleSheet } from "react-native";
import React from "react";

const StatsCard = ({ title, data, mainColor, backgroundColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: backgroundColor }]}>
      <View style={[styles.borderLeft, { borderLeftColor: mainColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Text>{data}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Aligns content in the center
    width: "100%",
    height: "70%",
    paddingHorizontal: 10,
    borderLeftWidth: 4,
  },
  card: {
    justifyContent: "center", // Aligns content in the center vertically
    padding: 10,
    borderRadius: 10,
    height: 80, // Adjust this value to change the height
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});

export default StatsCard;
