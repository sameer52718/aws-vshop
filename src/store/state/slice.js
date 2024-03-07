// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getState } from '../../constant/apiRoutes';


export const fetchState = createAsyncThunk('states/fetchState', async (country_id) => {
  const response = await axios.post(getState,{country_id});
  return response.data;
});

const stateSlice = createSlice({
  name: 'states',
  initialState: {
    options:[],
    states: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchState.pending, (state) => {
        state.isLoading = true;
        state.options = [];
        state.states = [];
      })
      .addCase(fetchState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.states = action.payload.data.state;
        state.error = action.payload.error
        state.options = action.payload.data.state.map((item) => ({id:item.state_id , name:item.name}))
      })
      .addCase(fetchState.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.states = [];
        state.error = true;
      });
  },
});

export default stateSlice.reducer;
