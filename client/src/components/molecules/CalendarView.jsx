import React, { useState } from "react";
import CalendarNavigation from "../atoms/CalendarNavigation";
import CalendarGrid from "../atoms/CalendarGrid";
import { AnimatePresence } from "framer-motion";

const CalendarView = ({ show, isLoading }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const today = new Date();

  const changeDate = (amount) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentDate(newDate);
    setDirection(amount);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setDirection(0);
  };

  return (
    <div className="p-4 w-full">
      <CalendarNavigation
        currentDate={currentDate}
        changeDate={changeDate}
        goToToday={goToToday}
      />

      <AnimatePresence initial={false} custom={direction}>
        <CalendarGrid
          currentDate={currentDate}
          today={today}
          getDaysInMonth={getDaysInMonth}
          show={show}
          direction={direction}
          isLoading={isLoading}
        />
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
