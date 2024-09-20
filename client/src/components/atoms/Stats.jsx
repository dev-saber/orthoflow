import React from "react";
import { useNavigate } from "react-router-dom";

function Stats({ beginText, data, endText }) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/bills");
    // filter only unpaid bills later
  };

  return (
    <div
      className="shadow-sm border border-solid rounded-lg border-gray-200 w-3/4 p-8 text-xl text-center cursor-pointer hover:bg-gray-50 hover:bg-opacity-50"
      onClick={handleNavigation}
    >
      {beginText}
      <span className="text-blue font-medium text-2xl px-2">{data}</span>
      {endText}
    </div>
  );
}

export default Stats;
