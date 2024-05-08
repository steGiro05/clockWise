import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Function to get the day name
const getDayName = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
};

const HomeScreen = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

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

  useEffect(() => {
    if (selectedDay) {
      console.log(selectedDay.toISOString().split('T')[0]);
      const records = fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/get_records', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [selectedDay]);

  const handleClick = (date) => {
    const dayName = getDayName(date);
    setSelectedDay(date);
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.selectedDayContainer}>
        {selectedDay && (
          <Text style={styles.selectedDayText}>
            {selectedDay.toISOString().split('T')[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scroll: {
    transform: [{ scaleX: -1 }],
    backgroundColor: '#f0f0f0',
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
  selectedDayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
