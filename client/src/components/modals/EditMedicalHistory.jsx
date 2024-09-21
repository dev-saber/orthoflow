import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateMedicalHistory } from "../../data/medicalHistories/medicalsThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";

function EditMedicalHistory({ isOpen, onClose, data, triggerEffect, toast }) {
  const dispatch = useDispatch();

  const editInfo = useFormik({
    initialValues: {
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      notes: data.notes,
    },
    validationSchema: Yup.object({
      diagnosis: Yup.string().required("Required"),
      treatment: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(updateMedicalHistory({ id: data.id, ...values }));
        await triggerEffect();
        toast("Medical history updated successfully!");
        onClose();
      } catch (error) {
        console.error(error.message);
        toast("An error occurred. Please try again.");
      }
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col items-center gap-8 w-4/5 mx-auto"
        onSubmit={editInfo.handleSubmit}
      >
        <Title text="Edit medical history" />
        <InputWithErrorMessage
          label="Diagnosis"
          name="diagnosis"
          type="text"
          value={editInfo.values.diagnosis}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.diagnosis}
          message={editInfo.errors.diagnosis}
        />

        <InputWithErrorMessage
          label="Treatment"
          name="treatment"
          type="text"
          value={editInfo.values.treatment}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.treatment}
          message={editInfo.errors.treatment}
        />

        <div className="flex flex-col items-start">
          <label className="text-blue text-lg pl-2 font-semibold">notes</label>
          <textarea
            name="notes"
            value={editInfo.values.notes}
            onChange={editInfo.handleChange}
            onBlur={editInfo.handleBlur}
            className="w-52 h-32 p-2 shadow-sm border border-solid rounded-lg border-gray-300"
          ></textarea>
        </div>

        <Button label="Submit" />
      </form>
    </ModalContainer>
  );
}

export default EditMedicalHistory;
