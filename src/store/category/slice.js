// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCategories } from '../../constant/apiRoutes';


export const fetchCategories = createAsyncThunk('categories/fetchCategory', async () => {
  const response = await axios.get(getCategories);
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    options:[],
    categories: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.categories = action.payload.data.category;
        state.error = action.payload.error
        state.options = action.payload.data.category.map((item) => ({id:item.category_id , name:item.name}))
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.categories = [];
        state.error = true;
      });
  },
});

export default categoriesSlice.reducer;
