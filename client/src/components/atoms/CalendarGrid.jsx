import React from "react";
import CalendarDay from "./CalendarDay";
import { useSelector } from "react-redux";

const CalendarGrid = ({ currentDate, today, getDaysInMonth, show }) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const appointments = useSelector(state => state.appointments.appointments);

  const appointmentsInMonth = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getMonth() === currentDate.getMonth() &&
      appointmentDate.getFullYear() === currentDate.getFullYear()
    );
  });
  console.log(appointmentsInMonth);

  return (
    <div className="grid grid-cols-7 gap-1">
      {[...Array(daysInMonth)].map((_, index) => {
        const dayNumber = index + 1;
        const isToday =
          dayNumber === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear();
        return (
          <CalendarDay key={index} dayNumber={dayNumber} isToday={isToday} appointments={appointmentsInMonth} show={show} />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
