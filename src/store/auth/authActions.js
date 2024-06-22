import {
  login,
  register,
  refreshToken,
  getUserData,
  resetPassword,
  sendResetPassword,
  sendVerificationEmail,
  verifyEmail,
  editUser,
} from "./authApi";
import {
  LOGIN,
  REGISTER,
  REFRESHTOKEN,
  USERDATA,
  RESET_PASSWORD,
  SEND_RESET_PASSWORD,
  SEND_VERIFY_EMAIL,
  VERIFY_EMAIL,
  EDIT_USER,
} from "../../constants/actionTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
  LOGIN,
  async (payload/* : { username: string; password: string } */) => {
    const response = await login(payload);
    return response.data;
  }
);

export const registerAction = createAsyncThunk(
  REGISTER,
  async (payload/* : FormData */) => {
    const response = await register(payload);
    return response.data;
  }
);

export const refreshTokenAction = createAsyncThunk(
  REFRESHTOKEN,
  async (payload/* : string */) => {
    const response = await refreshToken(payload);
    return response.data;
  }
);

export const userDataAction = createAsyncThunk(USERDATA, async () => {
  const response = await getUserData();
  return response.data;
});

export const resetPasswordAction = createAsyncThunk(
  RESET_PASSWORD,
  async (payload/* : { password: string; token: string } */) => {
    const response = await resetPassword(payload);
    return response.data;
  }
);

export const sendResetPasswordAction = createAsyncThunk(
  SEND_RESET_PASSWORD,
  async (payload/* : string */) => {
    const response = await sendResetPassword(payload);
    return response.data;
  }
);

export const verifyEmailAction = createAsyncThunk(
  VERIFY_EMAIL,
  async (payload/* : string */) => {
    const response = await verifyEmail(payload);
    return response.data;
  }
);

export const sendVerificationEmailAction = createAsyncThunk(
  SEND_VERIFY_EMAIL,
  async () => {
    const response = await sendVerificationEmail();
    return response.data;
  }
);

export const editUserAction = createAsyncThunk(
  EDIT_USER,
  async (payload/* : FormData */) => {
    const response = await editUser(payload);
    return response.data;
  }
);
