import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarNavigation = ({ currentDate, changeDate, goToToday }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <div className="flex w-1/8 items-center ml-auto">
        <motion.button
          onClick={() => changeDate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <div
          className="text-lg font-semibold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg"
          onClick={goToToday}
        >
          today
        </div>
        <motion.button
          onClick={() => changeDate(1)}
          className="p-2 rounded-full hover:bg-gray-100"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default CalendarNavigation;
