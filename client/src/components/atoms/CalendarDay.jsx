import React from "react";

const CalendarDay = ({ dayNumber, isToday }) => {
  return (
    <div className="h-40 border border-gray-200 p-1">
      <div
        className={`w-6 h-6 rounded-full text-center ml-auto ${
          isToday ? "bg-blue text-white font-semibold" : "text-black"
        }`}
      >
        {dayNumber}
      </div>
    </div>
  );
};

export default CalendarDay;
