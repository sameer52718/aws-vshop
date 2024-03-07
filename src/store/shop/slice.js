import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getShops } from "../../constant/apiRoutes";

const initialFilterState = {
  name: "0",
  verified: "0",
  sort: "desc",
  rating: "0",
  select: [
    "shop.name",
    "shop.rating",
    "shop.url",
    "shop.logo",
    "shop.verified",
    "shop.description"
  ],
};
export const fetchShops = createAsyncThunk(
  "shop/fetchShops",
  async (data, { getState}) => {
    const filterState = getState().shop.filter;
    try {
      const response = await axios.post(getShops, filterState, { signal:data.signal,headers:{Authorization:data.token} });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request was canceled:", error.message);
      } else {
        throw error;
      }
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shops: [],
    error: null,
    message: "",
    isloading: false,
    filter: initialFilterState,
  },
  reducers: {
    updateFIlter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    updateData : (state,action) => {
      state.shops = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.isloading = false;
        state.message = action.payload.message;
        state.shops = action.payload.data.shop;
        state.error = action.payload.error;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.shops = [];
        state.error = true;
      })
      .addCase(updateFIlter, (state) => {
        state.isloading = true;
      });
  },
});

export const { updateFIlter,updateData } = shopSlice.actions;
export default shopSlice.reducer;
