import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserInfo } from "../../data/auth/authThunk";
import ModalContainer from "./ModalContainer";
import Title from "../atoms/Title";
import InputWithErrorMessage from "../molecules/InputWithErrorMessage";
import Button from "../atoms/Button";

function EditUserInfo({ isOpen, onClose, data, triggerEffect }) {
  const dispatch = useDispatch();

  const editUserInfo = useFormik({
    initialValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      password: "",
      confirm_password: "",
      start_time: data.start_time,
      end_time: data.end_time,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      password: Yup.string(),
      confirm_password: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return !this.parent.password || value == this.parent.password;
        }
      ),
      start_time: Yup.string().required("Required"),
      end_time: Yup.string()
        .required("Required")
        .test(
          "end-time",
          "End time must be after start time",
          function (value) {
            const { start_time } = this.parent;
            if (!start_time || !value) {
              return true;
            }
            return value > start_time;
          }
        ),
    }),
    onSubmit: async (values) => {
      if (!values.password) {
        delete values.password;
      }
      delete values.confirm_password;

      await dispatch(updateUserInfo(values));
      await triggerEffect();
      onClose();
    },
  });

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col items-center gap-4 w-4/5 mx-auto"
        onSubmit={editUserInfo.handleSubmit}
      >
        <Title text="Edit user information" />
        <InputWithErrorMessage
          label="First Name"
          name="first_name"
          type="text"
          value={editUserInfo.values.first_name}
          onChange={editUserInfo.handleChange}
          errorCondition={editUserInfo.errors.first_name}
          message={editUserInfo.errors.first_name}
        />
        <InputWithErrorMessage
          label="Last Name"
          name="last_name"
          type="text"
          value={editUserInfo.values.last_name}
          onChange={editUserInfo.handleChange}
          errorCondition={editUserInfo.errors.last_name}
          message={editUserInfo.errors.last_name}
        />
        <InputWithErrorMessage
          label="Password"
          name="password"
          type="password"
          value={editUserInfo.values.password}
          onChange={editUserInfo.handleChange}
          errorCondition={editUserInfo.errors.password}
          message={editUserInfo.errors.password}
        />
        <InputWithErrorMessage
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={editUserInfo.values.confirm_password}
          onChange={editUserInfo.handleChange}
          errorCondition={editUserInfo.errors.confirm_password}
          message={editUserInfo.errors.confirm_password}
        />
        <InputWithErrorMessage
          label="Start Time"
          name="start_time"
          type="time"
          value={editUserInfo.values.start_time}
          onChange={editUserInfo.handleChange}
          errorCondition={editUserInfo.errors.start_time}
          message={editUserInfo.errors.start_time}
        />
        <InputWithErrorMessage
          label="End Time"
          name="end_time"
          type="time"
          value={editUserInfo.values.end_time}
          onChange={editUserInfo.handleChange}
          errorCondition={editUserInfo.errors.end_time}
          message={editUserInfo.errors.end_time}
        />
        <Button label="Save Changes" />
      </form>
    </ModalContainer>
  );
}

export default EditUserInfo;
