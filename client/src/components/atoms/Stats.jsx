import React from "react";

function Stats({ beginText, data, endText }) {
  return (
    <div className="shadow-sm border border-solid rounded-lg border-gray-200 w-3/4 p-8 text-xl text-center">
      {beginText}
      <span className="text-blue font-medium text-2xl px-2">{data}</span>
      {endText}
    </div>
  );
}

export default Stats;
