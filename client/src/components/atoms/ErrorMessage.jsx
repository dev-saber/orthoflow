import React from "react";

function ErrorMessage({ errorCondition, message }) {
  return errorCondition ? <div className="text-red-500 pl-4">{message}</div> : null;
}

export default ErrorMessage;
