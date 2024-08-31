import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      className="bg-blue hover:bg-white hover:border-2 box-border hover:border-blue hover:text-blue text-white font-bold py-2 px-16 rounded-xl"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
