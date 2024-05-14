import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import moment from "moment";
import url from "../utils/url";

const RecordScreen = ({ record }) => {
  // Verifica se record è definito e gestisce la visualizzazione dei dati
  
  if (record) {
    return (
      <View style={styles.container}>
        <View style={[styles.item, styles.green]}>
          <Text style={styles.label}>Start Time:</Text>
          <Text style={styles.value}>{record.entry_time}</Text>
        </View>
        {record.pauses && record.pauses.length > 0 && (
          <View style={[styles.item, styles.yellow]}>
            <Text style={styles.label}>Pauses:</Text>
            {record.pauses.map((pause, index) => (
              <View key={index} style={styles.pauseContainer}>
                <Text style={styles.pauseText}>Pause {index + 1}:</Text>
                <Text style={styles.pauseTime}>Start: {pause.start_time}, End: {pause.end_time}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={[styles.item, styles.red]}>
          <Text style={styles.label}>End Time:</Text>
          <Text style={styles.value}>{record.exit_time}</Text>
        </View>
      </View>
    );
  }
};

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [records, setRecords] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`${url}/get_records?day=${selectedDate}`);
    if (!response.ok) {
      console.log("Failed to fetch data");
      setRecords(null);
      return;
    }
    const data = await response.json();
    setRecords(data.message)

  }

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]); // Aggiunta di selectedDate come dipendenza

  const handleDateSelected = async (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    // await fetchData(); // Non è necessario chiamare fetchData qui perché useEffect lo farà quando selectedDate cambierà
  }

  return (
      <View>
          <Text>Dashboard</Text>
          <Calendar
              onDateSelected={handleDateSelected}
              selectedDate={selectedDate}
          />
          {records ? (
              
              <RecordScreen record={records} />
              
          ) : (
              <View style={styles.noDataContainer}>
                  <Text>No data available for this day</Text>
              </View>
          )}
      </View>
  );
}

export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  green: {
    backgroundColor: "green",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  red: {
    backgroundColor: "red",
  },
  pauseContainer: {
    marginBottom: 5,
  },
  pauseText: {
    fontWeight: "bold",
  },
  pauseTime: {
    marginLeft: 20,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});