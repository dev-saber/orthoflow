import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../data/patients/patientsThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";
import { createBill } from "../../data/bills/billsThunk";
import PatientSearchList from "../atoms/PatientSearchList";

function CreateBill({ isOpen, onClose, triggerEffect, toast }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [searchValue, setSearchValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showFilteredPatients, setShowFilteredPatients] = useState(false);

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

  useEffect(() => {
    if (patients.length == 0) {
      dispatch(getPatients());
    }
  }, [dispatch, patients.length]);

  const billInfo = useFormik({
    initialValues: {
      amount: "",
      status: "",
      patient_id: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Required").min(1, "Invalid amount"),
      patient_id: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(createBill(values));
        await triggerEffect();
        toast("Bill created successfully");
      } catch (error) {
        toast("An error occurred. Please try again.");
      }
      onClose();
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={billInfo.handleSubmit}
        className="flex flex-col items-center gap-8 w-4/5 mx-auto"
      >
        <Title text="create a new bill" />
        <InputWithErrorMessage
          label="Amount"
          name="amount"
          type="number"
          value={billInfo.values.amount}
          onChange={billInfo.handleChange}
          errorCondition={billInfo.touched.amount && billInfo.errors.amount}
          message={billInfo.errors.amount}
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
              billInfo.touched.patient_id && billInfo.errors.patient_id
            }
            message={billInfo.errors.patient_id}
            onFocus={() => setShowFilteredPatients(true)}
          />

          <PatientSearchList
            isShowing={showFilteredPatients}
            filteredData={filteredPatients}
            formData={billInfo}
            hide={() => setShowFilteredPatients(false)}
            search={setSearchValue}
            selected={setIsSelected}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="text-blue text-lg pl-2 font-semibold">Status</label>
          <div className="shadow-sm border border-solid rounded-lg border-gray-300">
            <select
              name="status"
              value={billInfo.values.status}
              onChange={billInfo.handleChange}
              onBlur={billInfo.handleBlur}
              className="pl-4 pr-6 h-9 block border-gray-200 rounded-lg text-sm focus:border-blue disabled:opacity-50 disabled:pointer-events-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue w-[200px]"
            >
              <option value=""></option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          {billInfo.errors.status && billInfo.touched.status && (
            <div className="text-red-500 pl-4">{billInfo.errors.status}</div>
          )}
        </div>
        <Button label="Add the bill" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default CreateBill;
