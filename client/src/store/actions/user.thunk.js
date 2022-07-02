import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastify } from "../../utils/tools";
import { getAuthHeader, getTokenCookie } from "../../utils/tools";
// Sign in user
export const signinUser = createAsyncThunk(
  "users/signinUser",
  async (values) => {
    try {
      const response = await fetch(`/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const { user, message } = await response.json();
      if (user) {
        return {
          data: user,
          auth: true,
        };
      } else {
        toastify("ERROR", message);
        return {
          data: null,
          auth: false,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
);

// Sign in user by google
export const signinUserByGoogle = createAsyncThunk(
  "users/signinUserByGoogle",
  async (googleId) => {
    try {
      const response = await fetch(`/user/isexcist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleId, facebookId: null }),
      });
      const { success, user } = await response.json();
      return { auth: success, data: user };
    } catch (error) {
      return { data: null, auth: false };
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (values) => {
    const response = await fetch(`/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });
    const { user, message } = await response.json();
    if (user) {
      return {
        data: user,
        auth: true,
      };
    } else {
      toastify("ERROR", message);
      return { data: null, auth: false };
    }
  }
);

// Check if the user authenticated
export const isAuth = createAsyncThunk("users/isAuth", async () => {
  try {
    const res = await fetch("/user/isauth", getAuthHeader());
    const data = await res.json();
    if (data.user) {
      return { data: data.user, auth: true };
    } else {
      return { data: null, auth: false };
    }
  } catch (error) {
    console.log(error);
  }
});

// Set up the user prefrences
export const setUserPrefrences = createAsyncThunk(
  "users/setUserPrefrences",
  async (prefObj) => {
    try {
      const response = await fetch(`/user/addpref`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        body: JSON.stringify(prefObj),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);

// Set up the user prefrences
export const resetUserPassword = createAsyncThunk(
  "users/resetUserPassword",
  async (userObj) => {
    try {
      const response = await fetch(`/user/changepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        body: JSON.stringify(userObj),
      });
      const { success } = await response.json();
      return { success };
    } catch (error) {
      console.log(error);
    }
  }
);

// Skip changing the password
export const skipResetUserPassword = createAsyncThunk(
  "users/skipResetUserPassword",
  async (id) => {
    try {
      const response = await fetch(`/user/skipreset/${id}`);
      const { success } = await response.json();
      return { success };
    } catch (error) {
      console.log(error);
    }
  }
);

// Verify user account
export const verifyUserEmail = createAsyncThunk(
  "users/verifyUserEmail",
  async (token) => {
    try {
      const res = await fetch(
        "/user/verify?" + new URLSearchParams({ validation: token }),
        getAuthHeader()
      );
      const { verified, message } = await res.json();

      return { verified, message };
    } catch (error) {
      throw error;
    }
  }
);

// Send varifactio email after registerUser
export const sendVerificationMail = createAsyncThunk(
  "users/sendVerificationMail",
  async (id) => {
    try {
      const res = await fetch("/user/sendverifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        body: JSON.stringify({ id, token: getTokenCookie() }),
      });
      const { success } = await res.json();
      return { success };
    } catch (error) {
      throw error;
    }
  }
);

// Check if User excist by email
export const checkIfUserExcistByEmail = createAsyncThunk(
  "users/checkIfUserExcistByEmail",
  async (email) => {
    try {
      const response = await fetch(`/user/isexcistbyemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        body: JSON.stringify({ email }),
      });
      const { success, user } = await response.json();
      return { success, user };
    } catch (error) {
      throw error;
    }
  }
);

// Check if User excist by email
export const sendResetPasswordMail = createAsyncThunk(
  "users/sendResetPasswordMail",
  async (email) => {
    try {
      const response = await fetch(`/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        body: JSON.stringify({ email }),
      });
      const { success } = await response.json();
      return { success };
    } catch (error) {
      throw error;
    }
  }
);
