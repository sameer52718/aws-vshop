import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getResellers } from "../../constant/apiRoutes";

const initialFilterState = {
  name: "0",
  verified: "0",
  sort: "desc",
  rating: "0",
  select: [
    "first_name",
    "last_name",
    "url",
    "profile",
    "verified", 
  ],
};
export const fetchResellers = createAsyncThunk(
  "shop/fetchResellers",
  async (data, { getState }) => {
    const filterState = getState().reseller.filter;
    try {
      const response = await axios.post(getResellers, filterState, { signal:data.signal ,headers:{Authorization:data.token}});
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
  name: "reseller",
  initialState: {
    resellers: [],
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
      state.resellers = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResellers.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchResellers.fulfilled, (state, action) => {
        state.isloading = false;
        state.message = action.payload.message;
        state.resellers = action.payload.data.reseller;
        state.error = action.payload.error;
      })
      .addCase(fetchResellers.rejected, (state, action) => {
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
