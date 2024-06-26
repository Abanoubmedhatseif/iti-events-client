import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const fetchPendingAttendees = createAsyncThunk(
  "events/fetchPendingAttendees",
  async () => {
    try {
      const response = await api.get(`${BASE_URL}/attendees/pending`);
      return response.data.attendees;
    } catch (error) {
      return Promise.reject(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch pending attendees"
      );
    }
  }
);

const attendeesSlice = createSlice({
  name: "pendingAttendees",
  initialState: {
    pendingAttendees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingAttendees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingAttendees.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingAttendees = action.payload;
      })
      .addCase(fetchPendingAttendees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attendeesSlice.reducer;
