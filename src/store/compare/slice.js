
import { createSlice } from '@reduxjs/toolkit';

const loadCompareState = () => {
  try {
    const serializedState = localStorage.getItem('compare');
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (error) {
    console.error('Error loading authentication state from localStorage:', error);
    return null;
  }
};

const saveCompareState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('compare', serializedState);
  } catch (error) {
    console.error('Error saving authentication state to localStorage:', error);
  }
};

const initialState = loadCompareState() || {
  products: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare: (state, action) => {
      let newState = {products:[...state.products ,action.payload ]} 
      state.products.push(action.payload)   
      saveCompareState(newState)
    },
    clearCompare: (state) => {
      let newState = {products:[]} 
      state.products = []
      saveCompareState(newState);
    },
  },
});

export const { setCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
