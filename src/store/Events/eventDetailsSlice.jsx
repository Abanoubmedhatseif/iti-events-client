import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import events from '../../data/events';

const initialState = {
  event: null,
  loading: false,
  error: null,
};

export const fetchEventDetails = createAsyncThunk(
  'eventDetails/fetchEventDetails',
  async (eventId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const event = events.find(evt => evt.id.toString() === eventId);
      
      if (event) {
        dispatch(setEvent(event));
      } else {
        throw new Error(`Event with id ${eventId} not found.`);
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const eventDetailsSlice = createSlice({
  name: 'eventDetails',
  initialState,
  reducers: {
    setEvent(state, action) {
      state.event = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearEvent(state) {
      state.event = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setEvent, setLoading, setError, clearEvent } = eventDetailsSlice.actions;

export default eventDetailsSlice.reducer;
