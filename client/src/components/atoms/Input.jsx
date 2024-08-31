import React from "react";

function Input({ label, type, name, value, onChange }) {
  return (
    <>
      <label className="text-blue text-lg pl-4 font-semibold">{label}</label>
      <input
        className="border-[2.5px] p-2 m-2 border-blue rounded-2xl focus:outline-none"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
