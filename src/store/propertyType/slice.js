// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getPropertyType } from '../../constant/apiRoutes';


export const fetchType = createAsyncThunk('type/fetchType', async () => {
  const response = await axios.get(getPropertyType);
  return response.data;
});

const typeSlice = createSlice({
  name: 'type',
  initialState: {
    options:[],
    type: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.type = action.payload.data.type;
        state.error = action.payload.error
        state.options = action.payload.data.type.map((item) => ({id:item.type_id , name:item.name}))
      })
      .addCase(fetchType.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.type = [];
        state.error = true;
      });
  },
});

export default typeSlice.reducer;
