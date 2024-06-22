import api from "../../api";
import { refreshApi } from "../../api";

export const login = (
  loginData /* : { username: string; password: string } */
) => api.post("auth/login/", loginData);
export const register = (registerData /* : FormData */) =>
  api.postForm("auth/register/", registerData);
export const refreshToken = (refreshToken /* : string */) =>
  refreshApi.post("auth/refresh-token/", { refresh: refreshToken });
export const getUserData = () => api.get("users/me/");

//Not done in backend yet
export const resetPassword = (
  resetData /* : { password: string; token: string } */
) => api.post("users/reset-password/", resetData);
export const sendResetPassword = (email /* : string */) =>
  api.post("users/send-reset-password/", { email });
export const verifyEmail = (token /* : string */) =>
  api.post("users/verify-email/", { token });
export const sendVerificationEmail = () => api.post("users/send-verify-email/");
export const editUser = (userData /* : FormData */) =>
  api.putForm("users/me/", userData);
