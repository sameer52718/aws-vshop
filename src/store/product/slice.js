// src/features/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProduct } from '../../constant/apiRoutes';

const initialFilterState = {
  reseller_url:"0",
  shop_url:"0",
  category_url:"0",
  brand_url:"0",
  brand_id: "0",
  subcategory_url:"0",
  category_id: "0",
  subcategory_id: "0",
  keyword: "0",
  min_price: "0",
  max_price: "0",
  url: "0",
  top_rated: "0",
  most_viewed: "0",
  select: ["product.name", "product.description", "product.thumbnail", "product.video", "product.rating", "product.price", "product.url", "category.name as category" ,"category.url as category_url"],
  take: 40
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { getState, signal }) => {
    const filterState = getState().product.filter;

    try {
      const response = await axios.post(getProduct, filterState, { signal });
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

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    error: null,
    message: "",
    isLoading: false,
    filter: initialFilterState, // Initialize the filter state
  },
  reducers: {
    // Add a reducer to update the filter state
    updateFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.products = action.payload.data.product;
        state.error = action.payload.error;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.products = [];
        state.error = true;
      })
      // Add an extra reducer to handle updateFilter action
      .addCase(updateFilter, (state) => {
        state.isLoading = true;
      });
  },
});

export const { updateFilter } = productSlice.actions;

export default productSlice.reducer;
