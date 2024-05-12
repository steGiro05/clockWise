import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const Calendar = ({ onDateSelected, selectedDate }) => {
  const [holidaysArray, setHolidaysArray] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const response = await fetch(
        `https://openholidaysapi.org/PublicHolidays?countryIsoCode=IT&validFrom=${moment()
          .startOf("year")
          .format("YYYY-MM-DD")}&validTo=${moment()
          .endOf("year")
          .format("YYYY-MM-DD")}`
      );
      const holidaysData = await response.json();
      const holidays = holidaysData
        .map((holiday) => {
          const startDate = moment(holiday.startDate);
          const endDate = moment(holiday.endDate);
          const dates = [];
          while (startDate.isSameOrBefore(endDate)) {
            dates.push(startDate.format("YYYY-MM-DD"));
            startDate.add(1, "day");
          }
          return dates;
        })
        .flat();
      setHolidaysArray(holidays);
    };

    fetchHolidays();
  }, []);
  const markedDatesFunc = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    if (
      date.isoWeekday() === 6 ||
      date.isoWeekday() === 7 ||
      holidaysArray.includes(formattedDate)
    ) {
      // Saturdays, Sundays and holidays
      return {
        lines: [
          {
            color: "green", // replace <string> with the actual color
            selectedColor: "transparent", // replace <string> (optional) with the actual color
          },
        ],
      };
    }
    return {};
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
        selectedDate={selectedDate}
        maxDate={moment()}
        minDate={moment().startOf("year")}
        markedDates={markedDatesFunc}
        onDateSelected={onDateSelected}
      />
    </View>
  );
};
export default Calendar;