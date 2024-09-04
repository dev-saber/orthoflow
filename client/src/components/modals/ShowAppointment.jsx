import React from "react";
import ModalContainer from "./ModalContainer";
import Button from "../atoms/Button";

function ShowAppointment({ isOpen, onClose, data }) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Date:</span>
              <span>{data.date}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Start Time:</span>
              <span>{data.start_time}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">End Time:</span>
              <span>{data.end_time}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Status:</span>
              <span>{data.status}</span>
            </div>
            <Button label="Edit" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Patient Information</h2>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Full Name:</span>
                <span>
                  {data.patient.first_name} {data.patient.last_name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">Phone:</span>
                <span>{data.patient.phone}</span>
              </div>
              <Button label="Patient details" />
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ShowAppointment;
