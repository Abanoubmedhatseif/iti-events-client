import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const createStudents = createAsyncThunk(
  "users/createStudents",
  async (newStudents, thunkAPI) => {
    try {
      const response = await api.post(`${BASE_URL}/users/import`, newStudents);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create students"
      );
    }
  }
);

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

export const createAdmin = createAsyncThunk(
  "users/createUser",
  async (newUser, thunkAPI) => {
    try {
      const response = await api.post(`${BASE_URL}/users`, newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`${BASE_URL}/users/${id}`);
      response.data = id;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to delete user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser, thunkAPI) => {
    try {
      const response = await api.patch(`${BASE_URL}/users/me`, updatedUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to update user");
    }
  }
);

export const fetchUserRegisteredEvents = createAsyncThunk(
  "users/fetchUserRegisteredEvents",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/users/me`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch user-registered events"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userRegisteredEvents: [],
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
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = "Failed to delete user";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createAdmin.rejected, (state) => {
        state.error = "Failed to create user";
      })
      .addCase(fetchUserRegisteredEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRegisteredEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.userRegisteredEvents = action.payload;
      })
      .addCase(fetchUserRegisteredEvents.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch user-registered events";
      })
      .addCase(createStudents.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(createStudents.rejected, (state) => {
        state.error = "Failed to create students";
        state.loading = false;
      })
      .addCase(createStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = "Failed to update user";
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
