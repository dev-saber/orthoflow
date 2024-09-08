import React from "react";

function Input({ label, type, name, value, onChange, placeholder, step }) {
  return (
    <>
      <label className="text-blue text-lg pl-2 font-semibold">{label}</label>
      <div className="shadow-sm border border-solid rounded-lg border-gray-300">
        <input
          className="pl-4 pr-6 h-9 block border-gray-200 rounded-lg text-sm focus:border-blue disabled:opacity-50 disabled:pointer-events-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue min-w-[200px]"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
        />
      </div>
    </>
  );
}

export default Input;
