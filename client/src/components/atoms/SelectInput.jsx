import React from "react";

function SelectInput({ label, name, value, onChange, onBlur, options }) {
  return (
    <>
      <label className="text-blue text-lg pl-2 font-semibold">{label}</label>
      <div className="shadow-sm border border-solid rounded-lg border-gray-300">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="pl-4 pr-6 h-9 block border-gray-200 rounded-lg text-sm focus:border-blue disabled:opacity-50 disabled:pointer-events-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue w-[200px]"
        >
          <option value=""></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectInput;
