import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthGuard from "./components/hoc/authGaurd";
import { isAuth } from "./store/actions/user.thunk";
import { Loader } from "./utils/tools";
import Header from "./components/header";
import Home from "./components/home";
import Asset from "./components/asset";
import UploadAsset from "./components/uploadAsset";
import NotApprovedAssets from "./components/notApprovedAssets";
import QuestionsAndAnswers from "./components/questionsAndAnswers";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/signup/SignUp";
import MyAssets from "./components/myAssets";
import Verification from "./components/varification";
import NotVerified from "./components/notVerified";
import Logout from "./components/logout";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CustomTheme } from "./utils/tools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Router = () => {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user.auth !== null) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={CustomTheme}>
          <StylesProvider jss={jss}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route
                  path="/upload"
                  element={
                    <AuthGuard>
                      <UploadAsset />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/update/:id"
                  element={
                    <AuthGuard>
                      <UploadAsset />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/asset/:id"
                  element={
                    <AuthGuard>
                      <Asset />
                    </AuthGuard>
                  }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/myassets/:id"
                  element={
                    <AuthGuard>
                      <MyAssets />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/assets/notApproved"
                  element={
                    <AuthGuard>
                      <NotApprovedAssets />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/qanda"
                  element={
                    <AuthGuard>
                      <QuestionsAndAnswers />{" "}
                    </AuthGuard>
                  }
                />
                <Route path="/user/verification" element={<Verification />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                  path="/:id"
                  element={
                    <AuthGuard>
                      <Home />
                    </AuthGuard>
                  }
                />{" "}
                <Route path="*" element={<Navigate to="/5" />} />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
            <NotVerified />
          </StylesProvider>
        </ThemeProvider>
      )}
    </>
  );
};

export default Router;
