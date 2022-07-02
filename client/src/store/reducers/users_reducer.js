import { createSlice } from "@reduxjs/toolkit";
import {
  signinUser,
  registerUser,
  isAuth,
  resetUserPassword,
  skipResetUserPassword,
  verifyUserEmail,
  signinUserByGoogle,
} from "../actions/user.thunk";

let DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    phoneNumber: null,
    isJustChangedPassword: null,
    preferences: null,
    isAdmin: null,
    isVerified: null,
    justEntered: null,
  },
  auth: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    ...DEFAULT_USER_STATE,
  },
  reducers: {
    signOut: (state, action) => {
      state.auth = false;
      state.data = DEFAULT_USER_STATE.data;
    },
    setJustEntered: (state, action) => {
      state.data.justEntered = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // sign in
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data = { ...action.payload.data, justEntered: true };
          state.auth = action.payload.auth;
        } else {
          state.data = { ...state.data };
          state.auth = action.payload.auth;
        }
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
      })
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data = { ...action.payload.data, justEntered: true };
          state.auth = action.payload.auth;
        } else {
          state.data = { ...state.data };
          state.auth = action.payload.auth;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      })
      // sign in by google
      .addCase(signinUserByGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUserByGoogle.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data = { ...action.payload.data };
          state.auth = action.payload.auth;
        } else {
          state.data = { ...state.data };
          state.auth = action.payload.auth;
        }
      })
      .addCase(signinUserByGoogle.rejected, (state, action) => {
        state.loading = false;
      })
      // is Auth
      .addCase(isAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = { ...action.payload.data };
          state.auth = action.payload.auth;
        } else {
          state.data = { ...state.data };
          state.auth = false;
        }
        state.loading = false;
      })
      .addCase(isAuth.rejected, (state, action) => {
        state.loading = false;
      })
      // reset password
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        const { success } = action.payload;
        if (success) {
          state.data = { ...state.data, isJustChangedPassword: false };
        }
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
      })
      // skip reset password
      .addCase(skipResetUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(skipResetUserPassword.fulfilled, (state, action) => {
        const { success } = action.payload;
        if (success) {
          state.data = { ...state.data, isJustChangedPassword: false };
        }
      })
      .addCase(skipResetUserPassword.rejected, (state, action) => {
        state.loading = false;
      })
      // skip reset password
      .addCase(verifyUserEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserEmail.fulfilled, (state, action) => {
        const { verified } = action.payload;
        if (verified) {
          state.data = { ...state.data, isVerified: true };
        }
      })
      .addCase(verifyUserEmail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { signOut, setJustEntered } = usersSlice.actions;
export default usersSlice.reducer;
