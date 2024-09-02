import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.token)
    ? true
    : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Component />;
};

export default AuthMiddleware;
