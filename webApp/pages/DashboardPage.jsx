import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import moment from "moment";
import { url } from "../components/url";

const RecordScreen = ({ record }) => {
  console.log(record);
  // Verifica se record è definito
  if (!record) {
    return <Text>No record data available</Text>;
  }

  return (
    <View>
      <View>
        <Text>Entry Time:</Text>
        <Text>{record.entry_time}</Text>
      </View>
      <View>
        <Text>Exit Time:</Text>
        <Text>{record.exit_time}</Text>
      </View>
      <View>
        <Text>Pauses:</Text>
        {record.pauses.length > 0 ? (
          record.pauses.map((pause, index) => (
            <View key={index}>
              <Text>Pause {index + 1}:</Text>
              <Text>Start: {pause.start_time}, End: {pause.end_time}</Text>
            </View>
          ))
        ) : (
          <Text>No pauses</Text>
        )}
      </View>
    </View>
  );
};



const DashboardPage = () => {
  const [error, setError] = useState(false);
  const [record, setRecord] = useState();
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  
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
      
      // Handle your data here
      setError(false);
      
      return data;
    } catch (error) {
      // Handle the error here
      setError(true);
      console.log("There has been a problem with your fetch operation:", error);
    }
  };
  
  const handleDateSelection = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    
    const fetchRecord = async () => {
      try {
        const result = await fetchRecordData();
        setRecord(result.message);
        // console.log(record);
      } catch (error) {
        console.log("Failed to fetch user stats:", error);
      }
    }
    
    fetchRecord();
  };
  
  return (
    <View>
      <Calendar
        onDateSelected={handleDateSelection}
        selectedDate={selectedDate}
        />
      {error ? (
        <Text>No data for that day</Text>
      ) : (
        <RecordScreen record={record} />
      )}
    </View>
  );
};


export default DashboardPage;