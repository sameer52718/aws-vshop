// src/features/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCountries } from '../../constant/apiRoutes';


export const fetchCountries = createAsyncThunk('countries/fetchCountry', async () => {
  const response = await axios.get(getCountries);
  return response.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    options:[],
    countries: [],
    error: null,
    message:"",
    isLoading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.countries = action.payload.data.country;
        state.error = action.payload.error
        state.options = action.payload.data.country.map((item) => ({id:item.country_id , name:item.name}))
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.countries = [];
        state.error = true;
      });
  },
});

export default countriesSlice.reducer;
