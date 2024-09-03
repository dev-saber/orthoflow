import React from "react";
import CalendarDay from "./CalendarDay";

const CalendarGrid = ({ currentDate, today, getDaysInMonth }) => {
  const daysInMonth = getDaysInMonth(currentDate);
  return (
    <div className="grid grid-cols-7 gap-1">
      {[...Array(daysInMonth)].map((_, index) => {
        const dayNumber = index + 1;
        const isToday =
          dayNumber === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear();
        return (
          <CalendarDay key={index} dayNumber={dayNumber} isToday={isToday} />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
