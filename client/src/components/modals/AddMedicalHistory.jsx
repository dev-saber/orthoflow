import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import PatientSearchList from "../atoms/PatientSearchList";
import Button from "../atoms/Button";
import { createMedicalHistory } from "../../data/medicalHistories/medicalsThunk";

function AddMedicalHistory({ isOpen, onClose, triggerEffect, toast }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showFilteredPatients, setShowFilteredPatients] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (searchValue && !isSelected) {
      setFilteredPatients(
        patients.filter((patient) =>
          `${patient.first_name} ${patient.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
      setShowFilteredPatients(true);
    } else {
      setFilteredPatients([]);
      setShowFilteredPatients(false);
    }
  }, [searchValue, isSelected]);

  const medicInfo = useFormik({
    initialValues: {
      patient_id: "",
      diagnosis: "",
      treatment: "",
      visit_date: "",
      notes: "",
    },
    validationSchema: Yup.object({
      patient_id: Yup.string().required("Required"),
      diagnosis: Yup.string().required("Required"),
      treatment: Yup.string().required("Required"),
      visit_date: Yup.date()
        .max(new Date(), "Invalid date")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(createMedicalHistory(values));
        await triggerEffect();
        toast("Medical history added successfully!");
      } catch (error) {
        console.error(error.message);
        toast("An error occurred. Please try again.");
      } finally {
        onClose();
      }
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <form
        onSubmit={medicInfo.handleSubmit}
        className="flex flex-col items-center gap-8 mx-auto"
      >
        <Title text="Add medical history" />

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="relative">
              <InputWithErrorMessage
                label="Patient"
                name="patient_id"
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setIsSelected(false);
                }}
                errorCondition={
                  medicInfo.touched.patient_id && medicInfo.errors.patient_id
                }
                message={medicInfo.errors.patient_id}
                onFocus={() => setShowFilteredPatients(true)}
              />

              <PatientSearchList
                isShowing={showFilteredPatients}
                filteredData={filteredPatients}
                formData={medicInfo}
                hide={() => setShowFilteredPatients(false)}
                selected={() => setIsSelected(true)}
                search={setSearchValue}
              />
            </div>
            <InputWithErrorMessage
              label="Visit Date"
              name="visit_date"
              type="date"
              value={medicInfo.values.visit_date}
              onChange={medicInfo.handleChange}
              errorCondition={
                medicInfo.touched.visit_date && medicInfo.errors.visit_date
              }
              message={medicInfo.errors.visit_date}
            />
          </div>
          <div className="flex space-x-4">
            <InputWithErrorMessage
              label="Diagnosis"
              name="diagnosis"
              type="text"
              value={medicInfo.values.diagnosis}
              onChange={medicInfo.handleChange}
              errorCondition={
                medicInfo.touched.diagnosis && medicInfo.errors.diagnosis
              }
              message={medicInfo.errors.diagnosis}
            />
            <InputWithErrorMessage
              label="Treatment"
              name="treatment"
              type="text"
              value={medicInfo.values.treatment}
              onChange={medicInfo.handleChange}
              errorCondition={
                medicInfo.touched.treatment && medicInfo.errors.treatment
              }
              message={medicInfo.errors.treatment}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-blue text-lg pl-2 font-semibold">
              Notes
            </label>
            <textarea
              name="notes"
              value={medicInfo.values.notes}
              onChange={medicInfo.handleChange}
              onBlur={medicInfo.handleBlur}
              className="w-full h-32 p-2 shadow-sm border border-solid rounded-lg border-gray-300"
            ></textarea>
          </div>
        </div>
        <Button label="Add Medical History" />
      </form>
    </ModalContainer>
  );
}

export default AddMedicalHistory;