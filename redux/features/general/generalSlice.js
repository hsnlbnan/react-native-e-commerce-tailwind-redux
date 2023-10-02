import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState: {
    productView: "grid",
    sortValue: "popularity",
    size: [],
    colors: [],
  },
  reducers: {
    setProductView: (state, action) => {
      state.productView = action.payload;
    },

    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },

    setSize: (state, action) => {
      state.size = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
  },
});

export const { setProductView, setSortValue, setSize, setColors } =
  generalSlice.actions;

export const getProductView = (state) => state.generalSlice.productView;
export const getSortValue = (state) => state.generalSlice.sortValue;
export const getSize = (state) => state.generalSlice.size;
export const getColors = (state) => state.generalSlice.colors;

export default generalSlice.reducer;
