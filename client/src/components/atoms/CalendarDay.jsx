import React from "react";
import AppointmentSnippet from "./AppointmentSnippet";

const CalendarDay = ({ dayNumber, isToday, appointments, show }) => {
  return (
    <div className="min-h-40 border border-gray-200 p-1">
      <div
        className={`w-6 h-6 rounded-full text-center ml-auto mb-2 ${
          isToday ? "bg-blue text-white font-semibold" : "text-black"
        }`}
      >
        {dayNumber}
      </div>
      <div className="flex flex-col items-center gap-2">
        {appointments.map((appointment, index) => (
          new Date(appointment.date).getDate() === dayNumber && (
            <AppointmentSnippet key={index} appointment={appointment} show={show} />
          )
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
