import React, { useState } from "react";
import CalendarNavigation from "../atoms/CalendarNavigation";
import CalendarGrid from "../atoms/CalendarGrid";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const changeDate = (amount) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="p-4 w-full">
      <CalendarNavigation
        currentDate={currentDate}
        changeDate={changeDate}
        goToToday={goToToday}
      />
      <CalendarGrid
        currentDate={currentDate}
        today={today}
        getDaysInMonth={getDaysInMonth}
      />
    </div>
  );
};

export default CalendarView;
