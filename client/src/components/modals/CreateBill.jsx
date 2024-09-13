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

function CreateBill({ isOpen, onClose, triggerEffect }) {
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
      await dispatch(createBill(values));
      await triggerEffect();
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
                    billInfo.setFieldValue("patient_id", patient.id);
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
