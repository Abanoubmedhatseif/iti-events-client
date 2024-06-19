
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categories from '../../data/categories'; 

const initialState = {
  category: null,
  loading: false,
  error: null,
};

export const fetchCategoryDetails = createAsyncThunk(
  'categoryDetails/fetchCategoryDetails',
  async (categoryId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const category = categories.find(cat => cat.id.toString() === categoryId);
      
      if (category) {
        dispatch(setCategory(category));
      } else {
        throw new Error(`Category with id ${categoryId} not found.`);
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const categoryDetailsSlice = createSlice({
  name: 'categoryDetails',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearCategory(state) {
      state.category = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCategory, setLoading, setError, clearCategory } = categoryDetailsSlice.actions;

export default categoryDetailsSlice.reducer;
