import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../data/patients/patientsThunk";
import * as Yup from "yup";
import ModalContainer from "./ModalContainer";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import { createAppointment } from "../../data/appointments/appointmentsThunk";

function AddAppointment({ isOpen, onClose, triggerEffect }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showFilteredPatients, setShowFilteredPatients] = useState(false);
  const [isSelected, setIsSelected] = useState(false); // to prevent showing the filtered patients list when a patient is selected

  useEffect(() => {
    if (patients.length == 0) {
      dispatch(getPatients());
    }
  }, [dispatch, patients.length]);

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

  const appointmentInfo = useFormik({
    initialValues: {
      date: "",
      start_time: "",
      end_time: "",
      patient_id: "",
      status: "pending",
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Required").min(new Date(), "Invalid date"),
      start_time: Yup.string().required("Required"),
      end_time: Yup.string()
        .required("Required")
        .test("is-greater", "Invalid time", function (value) {
          const { start_time } = this.parent;
          return start_time && value ? start_time < value : true;
        }),
      patient_id: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await dispatch(createAppointment(values));
      await triggerEffect();
      onClose();
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={appointmentInfo.handleSubmit}
        className="flex flex-col items-center gap-8 w-4/5 mx-auto"
      >
        <Title text="Add an appointment" />
        <InputWithErrorMessage
          label="Date"
          name="date"
          type="date"
          value={appointmentInfo.values.date}
          onChange={appointmentInfo.handleChange}
          onBlur={appointmentInfo.handleBlur}
          errorCondition={appointmentInfo.errors.date}
          message={appointmentInfo.errors.date}
        />
        <InputWithErrorMessage
          label="Start Time"
          name="start_time"
          type="time"
          value={appointmentInfo.values.start_time}
          onChange={appointmentInfo.handleChange}
          onBlur={appointmentInfo.handleBlur}
          errorCondition={appointmentInfo.errors.start_time}
          message={appointmentInfo.errors.start_time}
        />
        <InputWithErrorMessage
          label="End Time"
          name="end_time"
          type="time"
          value={appointmentInfo.values.end_time}
          onChange={appointmentInfo.handleChange}
          onBlur={appointmentInfo.handleBlur}
          errorCondition={appointmentInfo.errors.end_time}
          message={appointmentInfo.errors.end_time}
        />
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
            onBlur={appointmentInfo.handleBlur}
            errorCondition={appointmentInfo.errors.patient_id}
            message={appointmentInfo.errors.patient_id}
            onFocus={() => setShowFilteredPatients(true)}
          />

          {/* search patients list (filtered by searchValue) */}
          {showFilteredPatients && filteredPatients.length > 0 && (
            <ul className="absolute z-50 w-full bg-white rounded-xl shadow-lg mt-1 max-h-60 overflow-auto">
              {filteredPatients.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => {
                    setSearchValue(
                      `${patient.first_name} ${patient.last_name}`
                    );
                    appointmentInfo.setFieldValue("patient_id", patient.id);
                    setShowFilteredPatients(false);
                    setIsSelected(true);
                  }}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                >
                  {patient.first_name} {patient.last_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button label="Add Appointment" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default AddAppointment;
