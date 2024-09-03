import React from "react";
import Button from "../components/atoms/Button";
import SearchBox from "../components/atoms/SearchBox";
import CalendarView from "../components/molecules/CalendarView";

function Appointments() {

  return (
    <div className="flex flex-col items-start justify-around w-full gap-4">
      <div className="flex items-center justify-between w-full">
        <SearchBox />
      <Button
        label="New Appointment"
        onClick={() => console.log("New Appointment")}
      />
      </div>
      <CalendarView  />
    </div>
  );
}

export default Appointments;
