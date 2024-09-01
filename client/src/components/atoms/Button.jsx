import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      className="bg-blue box-border text-white font-bold py-2 px-16 rounded-xl"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
