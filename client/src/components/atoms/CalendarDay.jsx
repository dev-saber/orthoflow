import React from "react";
import AppointmentSnippet from "./AppointmentSnippet";

const CalendarDay = ({
  dayNumber,
  isToday,
  isCurrentMonth,
  appointments,
  show,
  date,
}) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className={`min-h-40 border border-gray-200 p-1 ${
        isCurrentMonth ? "bg-white" : "bg-gray-100"
      }`}
    >
      <div className="flex mb-2">
        {dayNumber == 1 && (
          <span
            className={`pl-2 ${
              isCurrentMonth ? "text-blue font-bold" : "text-gray-400"
            }`}
          >
            {monthNames[date.getMonth()]}
          </span>
        )}
        <div
          className={`w-6 h-6 rounded-full text-center ${
            isToday
              ? "bg-blue text-white font-semibold"
              : isCurrentMonth
              ? "text-black"
              : "text-gray-400"
          }`}
        >
          {dayNumber}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {appointments.map(
          (appointment, index) =>
            new Date(appointment.date).getDate() == dayNumber && (
              <AppointmentSnippet
                key={index}
                appointment={appointment}
                show={show}
              />
            )
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
