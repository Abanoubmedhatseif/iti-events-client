import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  refreshTokenAction,
  registerAction,
  userDataAction,
  editUserAction,
  sendResetPasswordAction,
  resetPasswordAction,
  verifyEmailAction,
  sendVerificationEmailAction,
} from "./authActions";
import { toast } from "react-toastify";

const initialState = {
  access_token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  loading: false,
  error: false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  errorData: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = false;
};

const handleRejected = (defaultMessage) => (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorData = action.payload;
  const message = action.payload?.message || defaultMessage;
  toast.error(message, { position: "bottom-left" });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    },
    logOut: (state) => {
      state.access_token = "";
      state.refresh_token = "";
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, handlePending)
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.access_token = action.payload.access;
        state.refresh_token = action.payload.refresh;
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
      })
      .addCase(loginAction.rejected, handleRejected("Invalid credentials"))
      .addCase(registerAction.pending, handlePending)
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorData = null;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        toast.success("Registration successful", { position: "bottom-left" });
      })
      .addCase(registerAction.rejected, handleRejected("Error registering"))
      .addCase(refreshTokenAction.pending, handlePending)
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.access_token = action.payload.access;
        localStorage.setItem("access_token", action.payload.access);
      })
      .addCase(
        refreshTokenAction.rejected,
        handleRejected("Error refreshing token")
      )
      .addCase(userDataAction.pending, handlePending)
      .addCase(userDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userDataAction.rejected, (state, action) => {
        handleRejected("Error fetching user data")(state, action);
        state.access_token = "";
        state.refresh_token = "";
        state.user = null;
        localStorage.clear();
      })
      .addCase(editUserAction.pending, handlePending)
      .addCase(editUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(
        editUserAction.rejected,
        handleRejected("Error editing user data")
      )
      .addCase(sendResetPasswordAction.pending, handlePending)
      .addCase(sendResetPasswordAction.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        toast.success("Password reset link sent to your email", {
          position: "bottom-left",
        });
      })
      .addCase(
        sendResetPasswordAction.rejected,
        handleRejected("Error sending reset password link")
      )
      .addCase(resetPasswordAction.pending, handlePending)
      .addCase(resetPasswordAction.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        toast.success("Password reset successful", { position: "bottom-left" });
      })
      .addCase(
        resetPasswordAction.rejected,
        handleRejected("Error resetting password")
      )
      .addCase(verifyEmailAction.pending, handlePending)
      .addCase(verifyEmailAction.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        toast.success("Email verified", { position: "bottom-left" });
      })
      .addCase(
        verifyEmailAction.rejected,
        handleRejected("Error verifying email")
      )
      .addCase(sendVerificationEmailAction.pending, handlePending)
      .addCase(sendVerificationEmailAction.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        toast.success("Verification email sent", { position: "bottom-left" });
      })
      .addCase(
        sendVerificationEmailAction.rejected,
        handleRejected("Error sending verification email")
      );
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state) => state.auth.access_token;
export const selectRefreshToken = (state) => state.auth.refresh_token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;
export const selectAuthErrData = (state) => state.auth.errorData;
