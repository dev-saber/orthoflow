import React from "react";

function Input({ label, type, name, value, onChange }) {
  return (
    <>
      <label className="text-blue text-lg pl-2 font-semibold">{label}</label>
      <input
        className="px-3 py-2 bg-white border border-blue rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue-500"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
