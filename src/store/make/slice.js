import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMakes } from "../../constant/apiRoutes";

export const fetchMake = createAsyncThunk("make/fetchMake", async () => {
  const response = await axios.get(getMakes);
  return response.data;
});

const makeSlice = createSlice({
  name: "make",
  initialState: {
    options: [],
    make: [],
    error: null,
    message: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMake.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMake.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.make = action.payload.data.make;
        state.error = action.payload.error;
        state.options = action.payload.data.make.map((item) => ({ id: item.make_id, name: item.name }));
      })
      .addCase(fetchMake.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
        state.make = [];
        state.error = true;
      });
  },
});

export default makeSlice.reducer;
