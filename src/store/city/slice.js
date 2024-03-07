// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCity } from '../../constant/apiRoutes';


export const fetchCity = createAsyncThunk('cities/fetchCity', async (state_id) => {
  const response = await axios.post(getCity,{state_id});
  return response.data;
});

const citySlice = createSlice({
  name: 'cities',
  initialState: {
    options:[],
    cities: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.isLoading = true;
        state.options = [];
        state.cities = [];
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.cities = action.payload.data.city;
        state.error = action.payload.error
        state.options = action.payload.data.city.map((item) => ({id:item.city_id , name:item.name}))
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.cities = [];
        state.error = true;
      });
  },
});

export default citySlice.reducer;
