import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Function to get the day name
const getDayName = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
};

const HomeScreen = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Create an array of days from today to 01/01/2024
    const daysArray = [];
    let currentDate = new Date(today);
    const endDate = new Date('2024-01-01');
    while (currentDate >= endDate) {
      daysArray.push(new Date(currentDate)); // Add the day to the end of the array
      currentDate.setDate(currentDate.getDate() - 1); // Go to the next day
    }

    // Set the state with the array of days
    setDays(daysArray);
  }, []);

  const handleClick = (date) => {
    const dayName = getDayName(date);
    console.log("Selected Date:", date, "Day Name:", dayName);
  };

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {days.map((date, index) => (
        <TouchableOpacity key={index} style={styles.dayContainer} onPress={() => handleClick(date)}>
          <View>
            <Text style={styles.dayName}>{getDayName(date)}</Text>
            <Text style={styles.dayNumber}>{date.getDate()}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scroll: {
    transform: [{ scaleX: -1 }],
  },
  dayContainer: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    transform: [{ scaleX: -1 }],
  },
  dayName: {
    fontSize: 16,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
