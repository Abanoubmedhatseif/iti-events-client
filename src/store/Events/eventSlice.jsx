import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import staticEvents from '../../data/events';



export const fetchEvents = createAsyncThunk(
  'events/fetchEvents', async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(staticEvents);
      }, 500); 
    });
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
