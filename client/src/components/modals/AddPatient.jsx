import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import ModalContainer from "./ModalContainer";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import { useDispatch } from "react-redux";
import { addPatient, getPatients } from "../../data/patients/patientsThunk";

function AddPatient({ isOpen, onClose, triggerEffect }) {
  const dispatch = useDispatch();

  const patientInfo = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      phone: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("required"),
      last_name: Yup.string().required("required"),
      date_of_birth: Yup.string().required("required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .required("required"),
    }),
    onSubmit: async (values) => {
      await dispatch(addPatient({...values}));
      await triggerEffect();
      onClose();
    },
  });

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-4xl mx-auto"
    >
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={patientInfo.handleSubmit}
      >
        <Title text="Add Patient" />
        <div className="flex flex-col items-start w-1/2 gap-8">
          <InputWithErrorMessage
            label="First Name"
            type="text"
            name="first_name"
            value={patientInfo.values.first_name}
            onChange={patientInfo.handleChange}
            errorCondition={patientInfo.errors.first_name}
            message={patientInfo.errors.first_name}
          />
          <InputWithErrorMessage
            label="Last Name"
            name="last_name"
            type="text"
            value={patientInfo.values.last_name}
            onChange={patientInfo.handleChange}
            errorCondition={patientInfo.errors.last_name}
            message={patientInfo.errors.last_name}
          />
          <InputWithErrorMessage
            label="Date of Birth"
            type="date"
            name="date_of_birth"
            value={patientInfo.values.date_of_birth}
            onChange={patientInfo.handleChange}
            errorCondition={patientInfo.errors.date_of_birth}
            message={patientInfo.errors.date_of_birth}
          />
          <InputWithErrorMessage
            label="Phone number"
            type="text"
            name="phone"
            value={patientInfo.values.phone}
            onChange={patientInfo.handleChange}
            errorCondition={patientInfo.errors.phone}
            message={patientInfo.errors.phone}
          />
        </div>
        <Button label="Add Patient" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default AddPatient;
