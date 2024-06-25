import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const BASE_URL = "https://iti-events-server.onrender.com/api/v1";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`${BASE_URL}/users/${id}`);
      console.log(response);
      response.data = id;
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message || "Failed to delete user");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = state.users.filter(
            (user) => user.id !== action.payload
          );
        }
        console.log(action.payload);
        state.error = null; // Clear error on success
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = "Failed to delete user";
      });
  },
});

export default usersSlice.reducer;
