// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getPropertySubType } from '../../constant/apiRoutes';


export const fetchSubType = createAsyncThunk('subType/fetchSubType', async (type_id) => {
  const response = await axios.post(getPropertySubType,{type_id});
  return response.data;
});

const stateSlice = createSlice({
  name: 'subType',
  initialState: {
    options:[],
    subType: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubType.pending, (state) => {
        state.isLoading = true;
        state.options = [];
        state.subType = [];
      })
      .addCase(fetchSubType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.subType = action.payload.data.subtype;
        state.error = action.payload.error
        state.options = action.payload.data.subtype.map((item) => ({id:item.subtype_id , name:item.name}))
      })
      .addCase(fetchSubType.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.subType = [];
        state.error = true;
      });
  },
});

export default stateSlice.reducer;
