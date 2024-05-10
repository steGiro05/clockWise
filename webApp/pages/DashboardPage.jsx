import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const url = "http://192.168.85.139:5000";

  const [error, setError] = useState(false);
  const [record, setRecord] = useState();

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

  return (
    <View>
      {error ? (
        <Text>No data for that day</Text>
      ) : (
        <View>
          <Text>Entry time: {record?.entry_time.substring(0, 5)}</Text>
          <Text>Exit time: {record?.exit_time.substring(0, 5)} </Text>
        </View>
      )}
    </View>
  );
};

export default DashboardPage;
