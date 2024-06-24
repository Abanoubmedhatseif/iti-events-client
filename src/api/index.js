import axios from "axios";
import {
  selectAccessToken,
  selectRefreshToken,
  logOut,
} from "../store/auth/authSlice";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { refreshTokenAction } from "../store/auth/authActions";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

// Create Axios instance
const api = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshApi = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to decode token and check if it is expired
export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp || 0;
    return expiryTime < moment().unix();
  } catch (error) {
    return true;
  }
};

// Function to refresh access token
const refreshAccessToken = async (store, refreshToken) => {
  await store.dispatch(refreshTokenAction(`Bearer ${refreshToken}`));
  return selectAccessToken(store.getState());
};

// Setup interceptors
export const setupInterceptors = (store) => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = selectAccessToken(store.getState());
      const refreshToken = selectRefreshToken(store.getState());
      if (accessToken && !isTokenExpired(accessToken)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else if (refreshToken && !isTokenExpired(refreshToken)) {
        const newAccessToken = await refreshAccessToken(store, refreshToken);
        if (!isTokenExpired(newAccessToken)) {
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          store.dispatch(logOut());
        }
      } else {
        store.dispatch(logOut());
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default api;
