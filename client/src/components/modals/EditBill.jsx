import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateBill } from "../../data/bills/billsThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";
import SelectInputWithErrorMessage from "../molecules/SelectInputWithErrorMessage";

function EditBill({ isOpen, onClose, data, triggerEffect, toast }) {
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
      try {
        await dispatch(updateBill(values));
        await triggerEffect();
        toast("Bill updated successfully");
      } catch (error) {
        toast("An error occurred. Please try again.");
      }
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

        <SelectInputWithErrorMessage
          label="status"
          name="status"
          value={editInfo.values.status}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          options={[
            { value: "unpaid", label: "Unpaid" },
            { value: "paid", label: "Paid" },
          ]}
          errorCondition={editInfo.errors.status}
          message={editInfo.errors.status}
        />

        <Button label="Edit" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default EditBill;
