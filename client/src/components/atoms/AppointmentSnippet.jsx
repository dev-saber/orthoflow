import React from "react";
import { motion } from "framer-motion";

function formatTime(time) {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function AppointmentSnippet({ appointment, show }) {
  const startTime = formatTime(appointment.start_time);
  const endTime = formatTime(appointment.end_time);

  return (
    <motion.div
      className="text-sm bg-blue text-white w-11/12 rounded cursor-pointer flex justify-around items-center"
      whileTap={{ scale: 0.95 }}
      onClick={() => show(appointment)}
    >
      <span>
        {startTime}-{endTime}
      </span>
      <span>
        {appointment.patient.first_name.charAt(0)}.{" "}
        {appointment.patient.last_name}
      </span>
    </motion.div>
  );
}

export default AppointmentSnippet;
