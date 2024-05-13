import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import moment from "moment";
import { url } from "../components/url";

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
  const [record, setRecord] = useState();
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [error, setError] = useState();
  
  const fetchRecordData = async () => {
    try {
      const response = await fetch(`${url}/get_records?day=${selectedDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setRecord(data.message);
      setError(null);
    } catch (error) {
      console.log("There has been a problem with your fetch operation:", error);
      setError(error);
    }
  };
  
  const handleDateSelection = async (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    await fetchRecordData();
  };
  
  return (
    <View>
      <Calendar onDateSelection={handleDateSelection} />
      {error ? (
        <Text>There was an error loading the data</Text>
      ) : (
        <RecordScreen record={record} />
      )}
    </View>
  );
};


export default DashboardPage;


/////////////////////////////////////////////////////


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

