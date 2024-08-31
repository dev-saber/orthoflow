import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputWithErrorMessage from "../components/molecules/InputWithErrorMessage";
import Button from "../components/atoms/Button";

function Login() {
  const credentials = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={credentials.handleSubmit}>
      <InputWithErrorMessage
        label="Email"
        type="email"
        name="email"
        value={credentials.values.email}
        onChange={credentials.handleChange}
        errorCondition={credentials.errors.email}
        message={credentials.errors.email}
      />

      <InputWithErrorMessage
        label="Password"
        type="password"
        name="password"
        value={credentials.values.password}
        onChange={credentials.handleChange}
        errorCondition={credentials.errors.password}
        message={credentials.errors.password}
      />

      {/* <button type="submit">Login</button> */}
      <Button label="Login" />
    </form>
  );
}

export default Login;
