import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../data/auth/authThunk";
import * as Yup from "yup";
import InputWithErrorMessage from "../components/molecules/InputWithErrorMessage";
import Button from "../components/atoms/Button";
import Title from "../components/atoms/Title";

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
    onSubmit: async (values) => {
      let response = await dispatch(login(values))
      if (response?.error?.code =="ERR_BAD_REQUEST") {
        console.log("invalid credentials");
      }
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center h-screen justify-around">
      <Title text="Login" />
      <form
        onSubmit={credentials.handleSubmit}
        className="flex flex-col items-center gap-12"
      >
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
        <div className="flex flex-col items-center gap-4">
          <Button label="Login" />

          <h3 className="text-gray-500 flex gap-2">
            don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue cursor-pointer font-semibold"
            >
              sign up
            </span>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Login;
