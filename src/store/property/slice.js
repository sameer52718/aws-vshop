// src/features/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProperty } from "../../constant/apiRoutes";

const initialFilterState = {
  purpose: "0",
  type_id: "0",
  subtype_id: "0",
  condition: "0",
  country_id: "0",
  state_id: "0",
  city_id: "0",
  location: "0",
  min_price: "0",
  max_price: "0",
  bathroom: "0",
  bedroom: "0",
  area: "0",
  unit: "0",
  sort: "0",
};

export const fetchProperty = createAsyncThunk("property/fetchProperty", async (_, { getState, signal }) => {
  const filterState = getState().property.filter;

  try {
    const response = await axios.post(getProperty, filterState, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request was canceled:", error.message);
    } else {
      throw error; // Rethrow the error for handling in the rejection case
    }
  }
});

const propertySlice = createSlice({
  name: "property",
  initialState: {
    property: [],
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
      .addCase(fetchProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.property = action.payload.data.property;
        state.error = action.payload.error;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.property = [];
        state.error = true;
      })
      // Add an extra reducer to handle updateFilter action
      .addCase(updateFilter, (state) => {
        state.isLoading = true;
      });
  },
});

export const { updateFilter } = propertySlice.actions;

export default propertySlice.reducer;
