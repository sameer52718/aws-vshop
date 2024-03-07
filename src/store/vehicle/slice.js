// src/features/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getVehicles } from '../../constant/apiRoutes';

const initialFilterState = {
    make_id:"0",
    model_id:"0",
    country_id:"0",
    state_id:"0",
    city_id:"0",
    color:"0",
    min_price:"0",
    max_price:"0",
    id:"0",
    sort:"0",
};

export const fetchVehicles = createAsyncThunk(
  'vehicle/fetchVehicles',
  async (_, { getState, signal }) => {
    const filterState = getState().vehicle.filter;

    try {
      const response = await axios.post(getVehicles, filterState, { signal });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request was canceled:', error.message);
      } else {
        throw error; // Rethrow the error for handling in the rejection case
      }
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    vehicle: [],
    error: null,
    message: "",
    isLoading: false,
    filter: initialFilterState, 
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.vehicle = action.payload.data.vehicle;
        state.error = action.payload.error;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.vehicle = [];
        state.error = true;
      })
      // Add an extra reducer to handle updateFilter action
      .addCase(updateFilter, (state) => {
        state.isLoading = true;
      });
  },
});

export const { updateFilter } = vehicleSlice.actions;

export default vehicleSlice.reducer;
