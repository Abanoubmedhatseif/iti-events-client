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

export const acceptAttendee = createAsyncThunk(
  "events/acceptAttendee",
  async (attendeeId) => {
    try {
      const response = await api.post(
        `${BASE_URL}/attendees/${attendeeId}/approve`
      );
      return response.data.attendee;
    } catch (error) {
      return Promise.reject(
        error.response?.data?.message ||
          error.message ||
          "Failed to accept attendee"
      );
    }
  }
);

export const rejectAttendee = createAsyncThunk(
  "events/rejectAttendee",
  async (attendeeId) => {
    try {
      const response = await api.delete(`${BASE_URL}/attendees/${attendeeId}`);
      return response.data.attendee;
    } catch (error) {
      return Promise.reject(
        error.response?.data?.message ||
          error.message ||
          "Failed to reject attendee"
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
        console.log(action.payload);
        state.pendingAttendees = action.payload;
      })
      .addCase(fetchPendingAttendees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(acceptAttendee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptAttendee.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.pendingAttendees = state.pendingAttendees.filter(
            (attendee) => attendee.id !== action.payload.id
          );
        }
      })
      .addCase(acceptAttendee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(rejectAttendee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectAttendee.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.pendingAttendees = state.pendingAttendees.filter(
            (attendee) => attendee.id !== action.payload.id
          );
        }
      })
      .addCase(rejectAttendee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attendeesSlice.reducer;
