// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getModel } from '../../constant/apiRoutes';


export const fetchModel = createAsyncThunk('model/fetchModel', async (make_id) => {
  const response = await axios.post(getModel,{make_id});
  return response.data;
});

const modelSlice = createSlice({
  name: 'model',
  initialState: {
    options:[],
    model: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModel.pending, (state) => {
        state.isLoading = true;
        state.options = [];
        state.model = [];
      })
      .addCase(fetchModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.model = action.payload.data.model;
        state.error = action.payload.error
        state.options = action.payload.data.model.map((item) => ({id:item.model_id , name:item.name}))
      })
      .addCase(fetchModel.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.model = [];
        state.error = true;
      });
  },
});

export default modelSlice.reducer;
