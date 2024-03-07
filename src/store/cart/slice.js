
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCart, insertCart } from '../../constant/apiRoutes';

export const fetchCart = createAsyncThunk('cart/fetchData', async (token) => {
  try {
    const response = await axios.get(getCart, { headers: { Authorization: token } });
    return response.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addToCart = createAsyncThunk('cart/addItem', async ({ body, token }) => {
  try {
    const response = await axios.post(insertCart,  body  , { headers: { Authorization: token } });
    return response.data; 
  } catch (error) {
    throw new Error(error.message);
  }
});


const initialState = {
  cart: [],
  total: 0,
  shipment: 0,
  subtotal: 0,
  error: false,
  status: 'idle', 
  loading: false,
  message:""
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(item => item.code !== action.payload);
    },
    SetCart: (state, action) => {
      state.cart = action.payload.cart,
      state.total = action.payload.total,
      state.shipment = action.payload.shipment,
      state.subtotal =  action.payload.subtotal
    },
    clearMessaga:(state)=> {
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const { cart, total, shipment, subtotal, error } = action.payload;
        state.cart = cart;
        state.total = total;
        state.shipment = shipment;
        state.subtotal = subtotal;
        state.error = error;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { data:{subtotal}, error , message } = action.payload;
        state.subtotal = subtotal;
        state.error = error;
        state.status = 'succeeded';
        state.loading = false;
        state.message = message
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.message = action.error.message
      });
  },
});

export default cartSlice.reducer;
export const {deleteItem, SetCart,clearMessaga} = cartSlice.actions
