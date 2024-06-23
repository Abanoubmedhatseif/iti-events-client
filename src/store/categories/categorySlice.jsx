import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://iti-events-server.onrender.com/api/v1';

export const fetchEventCategories = createAsyncThunk('eventCategories/fetchEventCategories', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/event-categories`);
    return response.data.categories; 
  } catch (error) {
    return Promise.reject(error.message || 'Failed to fetch event categories');
  }
});

export const createEventCategory = createAsyncThunk('eventCategories/createEventCategory', async (categoryData, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/event-categories`, categoryData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.category; 
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return thunkAPI.rejectWithValue('Category Name already exists');
    } else if (error.response && error.response.status === 400) { 
      return thunkAPI.rejectWithValue('Category Name must be at least 3 characters');
    } else {
      return thunkAPI.rejectWithValue(error.message || 'Failed to create category');
    }
  }
});

export const updateEventCategory = createAsyncThunk('eventCategories/updateEventCategory', async ({ id, name }, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/event-categories/${id}`, { name }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.category; 
  } catch (error) {
    if (error.response && error.response.status === 500) {
    } else if (error.response && error.response.status === 400) { 
      return thunkAPI.rejectWithValue('Category Name already exists');
    } else {
      return thunkAPI.rejectWithValue(error.message || 'Failed to create category');
    }
  }
});

export const deleteEventCategory = createAsyncThunk('eventCategories/deleteEventCategory', async (categoryId, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/event-categories/${categoryId}`);
    return categoryId; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchEventCategoryDetails = createAsyncThunk('eventCategories/fetchEventCategoryDetails', async (categoryId, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/event-categories/${categoryId}`);
    return response.data.category;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const eventCategorySlice = createSlice({
  name: 'eventCategories',
  initialState: {
    eventCategories: [],
    eventCategory: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    createUpdateError: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventCategories = action.payload;
        state.error = null;
      })
      .addCase(fetchEventCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create Event Category reducers
      .addCase(createEventCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEventCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventCategories.push(action.payload);
        state.createUpdateError = null;
      })
      .addCase(createEventCategory.rejected, (state, action) => {
        state.status = 'succeeded'; 
        state.createUpdateError = action.payload; 
      })
      .addCase(updateEventCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEventCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.eventCategories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.eventCategories[index] = action.payload;
        }
        state.createUpdateError = null;
      })
      .addCase(updateEventCategory.rejected, (state, action) => {
        state.status = 'succeeded'; 
        state.createUpdateError = action.payload; 
      })
      .addCase(deleteEventCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEventCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventCategories = state.eventCategories.filter((category) => category.id !== action.payload);
      })
      .addCase(deleteEventCategory.rejected, (state, action) => {
        state.status = 'succeeded'; 
        state.createUpdateError = action.payload; 
      })
      .addCase(fetchEventCategoryDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventCategoryDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventCategory = action.payload;
      })
      .addCase(fetchEventCategoryDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch category details';
      });
      
  },
});

export default eventCategorySlice.reducer;