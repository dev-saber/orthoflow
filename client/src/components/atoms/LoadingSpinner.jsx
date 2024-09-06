import React from "react";
import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      className="loader"
      variants={spinnerVariants}
      animate="animate"
      style={{
        width: "50px",
        height: "50px",
        border: "5px solid lightgray",
        borderTop: "5px solid #4a72ff",
        borderRadius: "50%",
      }}
    />
  );
};

export default LoadingSpinner;
