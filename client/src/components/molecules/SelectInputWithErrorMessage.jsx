import React from "react";
import ErrorMessage from "../atoms/ErrorMessage";
import SelectInput from "../atoms/SelectInput";

function SelectInputWithErrorMessage({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  errorCondition,
  message,
}) {
  return (
    <div className="flex flex-col items-start">
      <SelectInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
      />
      <ErrorMessage errorCondition={errorCondition} message={message} />
    </div>
  );
}

export default SelectInputWithErrorMessage;
