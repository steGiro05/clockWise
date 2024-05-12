import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import moment from "moment";
import url from "../utils/url";

const DashboardPage = () => {
  const [error, setError] = useState(false);
  const [record, setRecord] = useState();
  const [selectedDate, setSelectedDate] = useState(moment());

  const fetchRecordData = async () => {
    try {
      const response = await fetch(`${url}/get_records`, {
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

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const result = await fetchRecordData();
        setRecord(result.message[0]);
      } catch (error) {
        console.log("Failed to fetch user stats:", error);
      }
    };

    fetchRecord();
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
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
        <View>
          <Text>Entry time: {record?.entry_time.substring(0, 5)}</Text>
          <Text>Exit time: {record?.exit_time.substring(0, 5)} </Text>
          <Text>day: {selectedDate.format("DD/MM/YYYY")} </Text>
        </View>
      )}
    </View>
  );
};

export default DashboardPage;
