import React from "react";
import Input from "../atoms/Input";
import ErrorMessage from "../atoms/ErrorMessage";

function InputWithErrorMessage({
  label,
  type,
  name,
  value,
  onChange,
  errorCondition,
  message,
}) {
  return (
    <div className="flex flex-col items-start">
      <Input label={label} type={type} name={name} value={value} onChange={onChange} />
      <ErrorMessage errorCondition={errorCondition} message={message} />
    </div>
  );
}

export default InputWithErrorMessage;
