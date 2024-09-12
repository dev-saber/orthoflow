import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateBill } from "../../data/bills/billsThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";

function EditBill({ isOpen, onClose, data, triggerEffect }) {
  const dispatch = useDispatch();

  const editInfo = useFormik({
    initialValues: {
      id: data.id,
      amount: data.amount,
      status: data.status,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      amount: Yup.number().required("Required"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await dispatch(updateBill(values));
      await triggerEffect();
      onClose();
    },
  });
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col items-center gap-8 w-4/5 mx-auto"
        onSubmit={editInfo.handleSubmit}
      >
        <Title text="Edit Bill" />
        <InputWithErrorMessage
          label="patient name"
          name="patient"
          type="text"
          value={`${data.patient.first_name} ${data.patient.last_name}`}
        />

        <InputWithErrorMessage
          label="Amount"
          name="amount"
          type="number"
          value={editInfo.values.amount}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.amount}
          message={editInfo.errors.amount}
        />

        <div className="flex flex-col items-start">
          <label className="text-blue text-lg pl-2 font-semibold">Status</label>
          <div className="shadow-sm border border-solid rounded-lg border-gray-300">
            <select
              name="status"
              value={editInfo.values.status}
              onChange={editInfo.handleChange}
              onBlur={editInfo.handleBlur}
              className="pl-4 pr-6 h-9 block border-gray-200 rounded-lg text-sm focus:border-blue disabled:opacity-50 disabled:pointer-events-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue w-[200px]"
            >
              <option value=""></option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          {editInfo.errors.status && editInfo.touched.status && (
            <div className="text-red-500 pl-4">{editInfo.errors.status}</div>
          )}
        </div>

        <Button label="Edit" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default EditBill;
