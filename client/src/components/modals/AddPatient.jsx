import { useFormik } from "formik";
import React from "react";
import ModalContainer from "./ModalContainer";

function AddPatient({ isOpen, onClose }) {
  const patientInfo = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center"></div>
    </ModalContainer>
  );
}

export default AddPatient;
