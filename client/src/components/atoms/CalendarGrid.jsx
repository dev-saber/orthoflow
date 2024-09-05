import React from "react";
import CalendarDay from "./CalendarDay";
import { useSelector } from "react-redux";

const CalendarGrid = ({ currentDate, today, getDaysInMonth, show }) => {
  const appointments = useSelector((state) => state.appointments.appointments);

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysInPrevMonth = getDaysInMonth(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  );

  const days = [];

  // adding days from previous month to fill the first week line
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      daysInPrevMonth - i
    );
    days.push({ number: daysInPrevMonth - i, isCurrentMonth: false, date });
  }

  // adding days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    days.push({ number: i, isCurrentMonth: true, date });
  }

  // adding days from next month to fill the last week line
  const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      i
    );
    days.push({ number: i, isCurrentMonth: false, date });
  }

  // split days into weeks for the month grid
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // filter weeks to only show weeks with at least one day from the current month
  const filteredWeeks = weeks.filter((week) =>
    week.some((day) => day.isCurrentMonth)
  );

  return (
    <div className="grid gap-1">
      {filteredWeeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1">
          {week.map((day, dayIndex) => {
            const dayAppointments = appointments.filter((appointment) => {
              const appointmentDate = new Date(appointment.date);
              return appointmentDate.toDateString() == day.date.toDateString();
            });

            return (
              <CalendarDay
                key={dayIndex}
                dayNumber={day.number}
                isToday={day.date.toDateString() == today.toDateString()}
                isCurrentMonth={day.isCurrentMonth}
                appointments={dayAppointments}
                show={show}
                date={day.date}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
