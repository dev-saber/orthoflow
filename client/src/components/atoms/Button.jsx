import React from "react";
import { motion } from "framer-motion";

function Button({ label, onClick, className }) {
  return (
    <motion.button
      className={`px-4 py-1 font-medium focus:ring-white bg-blue text-white hover:bg-blue-700 focus:outline-none rounded-lg ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}

export default Button;
