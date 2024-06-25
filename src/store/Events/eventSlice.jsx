import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";


const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await api.get(`${BASE_URL}/events`);
    return response.data.events;
  } catch (error) {
    return Promise.reject(error.message || "Failed to fetch events");
  }
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, thunkAPI) => {
    try {
      const response = await api.post(`${BASE_URL}/events`, eventData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.event;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      } else {
        return thunkAPI.rejectWithValue(
          error.message || "Failed to create event"
        );
      }
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    try {
      await api.delete(`${BASE_URL}/events/${eventId}`);
      return eventId;
    } catch (error) {
      return Promise.reject(error.message || "Failed to delete event");
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, ...eventData }, thunkAPI) => {
    try {
      const response = await api.put(`${BASE_URL}/events/${id}`, eventData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.event;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      } else {
        return thunkAPI.rejectWithValue(
          error.message || "Failed to update event"
        );
      }
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    createEventError: null,
    updateEventError: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.createEventError = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.createEventError = action.payload;
        } else {
          state.createEventError = "Failed to create event";
        }
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.updateEventError = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.updateEventError = action.payload;
        } else {
          state.updateEventError = "Failed to update event";
        }
      });
  },
});

export default eventSlice.reducer;
