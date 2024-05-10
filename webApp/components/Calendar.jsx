import { View, Text } from "react-native";
import React from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const Calendar = ({ onDateSelected }) => {
  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7; // disable Saturdays and Sundays
  };

  return (
    <View>
      <CalendarStrip
        scrollable
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 300,
          highlightColor: "#9265DC",
        }}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={"transparent"}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        iconContainer={{ flex: 0.1 }}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateContainerStyle={{ backgroundColor: "blue" }}
        selectedDate={moment()}
        maxDate={moment()}
        datesBlacklist={datesBlacklistFunc}
        onDateSelected={onDateSelected}
      />
    </View>
  );
};

export default Calendar;
