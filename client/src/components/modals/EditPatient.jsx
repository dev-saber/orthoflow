import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePatient } from "../../data/patients/patientsThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";

function EditPatient({ isOpen, onClose, data, triggerEffect }) {
  const dispatch = useDispatch();
  const editInfo = useFormik({
    initialValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      phone: data.phone,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      date_of_birth: Yup.date().required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await dispatch(updatePatient({ id: data.id, ...values }));
      await triggerEffect();
      onClose();
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={editInfo.handleSubmit}
        className="flex flex-col items-center gap-8 w-4/5 mx-auto"
      >
        <Title text="Edit patient information" />

        <InputWithErrorMessage
          label="First Name"
          name="first_name"
          type="text"
          value={editInfo.values.first_name}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.first_name}
          message={editInfo.errors.first_name}
        />

        <InputWithErrorMessage
          label="Last Name"
          name="last_name"
          type="text"
          value={editInfo.values.last_name}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.last_name}
          message={editInfo.errors.last_name}
        />

        <InputWithErrorMessage
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          value={editInfo.values.date_of_birth}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.date_of_birth}
          message={editInfo.errors.date_of_birth}
        />

        <InputWithErrorMessage
          label="Phone"
          name="phone"
          type="text"
          value={editInfo.values.phone}
          onChange={editInfo.handleChange}
          onBlur={editInfo.handleBlur}
          errorCondition={editInfo.errors.phone}
          message={editInfo.errors.phone}
        />

        <Button label="Save Changes" type="submit" />
      </form>
    </ModalContainer>
  );
}

export default EditPatient;
