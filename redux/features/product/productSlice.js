import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: [],
  // extraReducers: {},
  reducers: {
    addProductToFavorite: (state, action) => {
      const product = action.payload;
      const index = state.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(product);
      }
    },
  },
});

export const { addProductToFavorite } = productSlice.actions;

export const getFavoriteProducts = (state) => state.productSlice;

export default productSlice.reducer;
