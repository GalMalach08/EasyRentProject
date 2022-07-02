import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/reducers/users_reducer";
import { removeTokenCookie } from "../../utils/tools";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    console.log("asd");
    dispatch(signOut());
    removeTokenCookie();
    navigate("/signin");
  };

  useEffect(() => {
    logOut();
  }, []);

  return null;
};

export default LogOut;
