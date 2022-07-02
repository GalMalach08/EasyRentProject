import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const AuthGaurd = (props) => {
  const auth = useSelector((state) => state.users.auth);
  const location = useLocation();
  if (!auth)
    return <Navigate to="/signin" state={{ from: location }} replace />;

  return props.children;
};

export default AuthGaurd;
