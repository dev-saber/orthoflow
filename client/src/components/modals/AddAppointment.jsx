import React from "react";
import { useFormik } from "formik";
import ModalContainer from "./ModalContainer";

function AddAppointment({ isOpen, onClose }) {
  const appointmentInfo = useFormik({
    initialValues: {
      date: "",
      start_time: "",
      end_time: "",
      patient_id: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      Add Appointment
    </ModalContainer>
  );
}

export default AddAppointment;
