import api from "../../api";
import { refreshApi } from "../../api";

export const login = (
  loginData /* : { username: string; password: string } */
) => api.post("auth/login/", loginData);
export const register = (registerData /* : FormData */) =>
  api.post("auth/register/", registerData);
export const refreshToken = (refreshToken /* : string */) =>
  refreshApi.post("auth/refresh/", { refreshToken });
export const resetPassword = (
  resetData /* : { password: string; token: string } */
) => api.post("auth/reset/", resetData);
export const sendResetPassword = (email /* : string */) =>
  api.post("auth/forgot/", { email });
export const verifyEmail = (token , id) =>
  api.get(`auth/verify/?token=${token}&id=${id}`);
export const getUserData = () => api.get("users/me/");


//Not done in backend yet
export const sendVerificationEmail = () => api.post("users/send-verify-email/");
export const editUser = (userData /* : FormData */) =>
  api.put("users/me/", userData);
