import React, { useState, useEffect } from "react";
import moment from "moment";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../data/patients/patientsThunk";
import * as Yup from "yup";
import ModalContainer from "./ModalContainer";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import { createAppointment } from "../../data/appointments/appointmentsThunk";
import PatientSearchList from "../atoms/PatientSearchList";

function AddAppointment({ isOpen, onClose, triggerEffect, toast }) {
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

  const { start_time, end_time } = useSelector((state) => state.auth.user);

  const appointmentInfo = useFormik({
    initialValues: {
      date: "",
      start_time: "",
      end_time: "",
      patient_id: "",
      status: "pending",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required("Required")
        .test("is-valid-date", "Invalid date", function (value) {
          const currentDate = moment().startOf("day");
          const selectedDate = moment(value).startOf("day");
          return selectedDate.isSameOrAfter(currentDate);
        }),
      start_time: Yup.string()
        .required("Required")
        .test("is-valid-time", "Invalid time", function (value) {
          const { date } = this.parent;
          const currentDate = moment().format("YYYY-MM-DD");
          const currentTime = moment().format("HH:mm");
          if (
            moment(date).format("YYYY-MM-DD") == currentDate &&
            value <= currentTime
          ) {
            return false;
          }
          return value >= start_time; // start time should be within the working hours
        }),
      end_time: Yup.string()
        .required("Required")
        .test("is-greater", "Invalid time", function (value) {
          const { start_time: formStartTime } = this.parent;
          return formStartTime && value ? formStartTime < value : true;
        })
        .test("is-valid-end-time", "Invalid time", function (value) {
          return value <= end_time; // end time should be within the working hours
        }),
      patient_id: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await dispatch(createAppointment(values)).unwrap();
        await triggerEffect();
        toast("Appointment created successfully!");
      } catch (error) {
        console.error("error", result);
        toast("An error occurred. Please try again.");
      }
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
          errorCondition={
            appointmentInfo.touched.date && appointmentInfo.errors.date
          }
          message={appointmentInfo.errors.date}
        />
        <InputWithErrorMessage
          label="Start Time"
          name="start_time"
          type="time"
          value={appointmentInfo.values.start_time}
          onChange={appointmentInfo.handleChange}
          errorCondition={
            appointmentInfo.touched.start_time &&
            appointmentInfo.errors.start_time
          }
          message={appointmentInfo.errors.start_time}
        />
        <InputWithErrorMessage
          label="End Time"
          name="end_time"
          type="time"
          value={appointmentInfo.values.end_time}
          onChange={appointmentInfo.handleChange}
          errorCondition={
            appointmentInfo.touched.end_time && appointmentInfo.errors.end_time
          }
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
            errorCondition={
              appointmentInfo.touched.patient_id &&
              appointmentInfo.errors.patient_id
            }
            message={appointmentInfo.errors.patient_id}
            onFocus={() => setShowFilteredPatients(true)}
          />

          <PatientSearchList
            isShowing={showFilteredPatients}
            filteredData={filteredPatients}
            formData={appointmentInfo}
            hide={() => setShowFilteredPatients(false)}
            selected={() => setIsSelected(true)}
            search={setSearchValue}
          />
        </div>
        <Button label="Add Appointment" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default AddAppointment;
