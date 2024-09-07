import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../data/auth/authThunk";
import Title from "../components/atoms/Title";
import InputWithErrorMessage from "../components/molecules/InputWithErrorMessage";
import Button from "../components/atoms/Button";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerInfo = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      start_time: "",
      end_time: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirm_password: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      start_time: Yup.string().required("Required"),
      end_time: Yup.string()
        .required("Required")
        .test("end-time", "Invalid time", function (value) {
          const { start_time } = this.parent;
          if (!start_time || !value) {
            return true;
          }
          return value > start_time;
        }),
    }),
    onSubmit: async (values) => {
      let response = await dispatch(register(values));
      if (response?.error?.code === "ERR_BAD_REQUEST") {
        console.log("invalid credentials");
      } else {
        navigate("/login");
      }
    },
  });

  return (
    <div className="flex flex-col items-center h-screen justify-around">
      <Title text="Register" />
      <form
        onSubmit={registerInfo.handleSubmit}
        className="flex flex-col items-center gap-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-lg">
          <InputWithErrorMessage
            label="First Name"
            type="text"
            name="first_name"
            value={registerInfo.values.first_name}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.first_name && registerInfo.errors.first_name
            }
            message={registerInfo.errors.first_name}
          />
          <InputWithErrorMessage
            label="Last Name"
            type="text"
            name="last_name"
            value={registerInfo.values.last_name}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.last_name && registerInfo.errors.last_name
            }
            message={registerInfo.errors.last_name}
          />
          <InputWithErrorMessage
            label="Email"
            type="email"
            name="email"
            value={registerInfo.values.email}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.email && registerInfo.errors.email
            }
            message={registerInfo.errors.email}
          />
          <InputWithErrorMessage
            label="Password"
            type="password"
            name="password"
            value={registerInfo.values.password}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.password && registerInfo.errors.password
            }
            message={registerInfo.errors.password}
          />
        </div>
        <div className="w-full max-w-lg flex justify-center">
          <InputWithErrorMessage
            label="Confirm Password"
            type="password"
            name="confirm_password"
            value={registerInfo.values.confirm_password}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.confirm_password &&
              registerInfo.errors.confirm_password
            }
            message={registerInfo.errors.confirm_password}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
          <InputWithErrorMessage
            label="Start Time"
            type="time"
            name="start_time"
            value={registerInfo.values.start_time}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.start_time && registerInfo.errors.start_time
            }
            message={registerInfo.errors.start_time}
          />
          <InputWithErrorMessage
            label="End Time"
            type="time"
            name="end_time"
            value={registerInfo.values.end_time}
            onChange={registerInfo.handleChange}
            errorCondition={
              registerInfo.touched.end_time && registerInfo.errors.end_time
            }
            message={registerInfo.errors.end_time}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button label="Register" />
          <h3 className="text-gray-500 flex gap-2">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue cursor-pointer font-semibold"
            >
              Login
            </span>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Register;
