import React from "react";
import { motion } from "framer-motion";

function AppointmentSnippet({ appointment }) {
  return (
    <motion.div
      className="text-sm bg-blue text-white w-11/12 rounded px-2 cursor-pointer"
      whileTap={{ scale: 0.95 }}
    >
      11:15 PM E.Sdsfd
    </motion.div>
  );
}

export default AppointmentSnippet;
