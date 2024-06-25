import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api"; // Ensure you have your API configuration set up properly

const BASE_URL = import.meta.env.VITE_SERVER_URL; // Ensure this points to your server URL

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    try {
      const response = await api.get(`${BASE_URL}/events`);
      return response.data.events;
    } catch (error) {
      return Promise.reject(error.message || "Failed to fetch events");
    }
  }
);

export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcomingEvents",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events/upcoming`);
      return response.data.events;
    } catch (error) {
      return Promise.reject(error.message || "Failed to fetch upcoming events");
    }
  }
);

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

export const fetchEventDetails = createAsyncThunk(
  'eventDetails/fetchEventDetails',
  async (eventId) => {
    try {
      const response = await axios.get(`${BASE_URL}/events/${eventId}`);
      return response.data.event;
    } catch (error) {
      return Promise.reject(error.message || 'Failed to fetch event details');
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
    eventDetails: {
      event: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    clearEvent: (state) => {
      state.eventDetails.event = null;
      state.eventDetails.error = null;
    },
  },
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
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.eventDetails.loading = true;
        state.eventDetails.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.eventDetails.loading = false;
        state.eventDetails.event = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.eventDetails.loading = false;
        state.eventDetails.error = action.error.message;
      });
  },
});

export const { clearEvent } = eventSlice.actions;

export default eventSlice.reducer;
