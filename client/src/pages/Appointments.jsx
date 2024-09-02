import React, { useState } from "react";
import ViewToggle from "../components/atoms/ViewToggle";
import Button from "../components/atoms/Button";

function Appointments() {
  const periods = ["day", "month", "year"];
  const [view, setView] = useState(periods[0]);
  return (
    <div className="flex flex-col items-start justify-around w-full gap-4">
      <Button
        label="New Appointment"
        onClick={() => console.log("New Appointment")}
      />
      <div className="flex items-center justify-between w-[95%]">
        <input className="border" type="text" placeholder="Search" />
        <ViewToggle activeView={view} onViewChange={setView} views={periods} />
      </div>
    </div>
  );
}

export default Appointments;
