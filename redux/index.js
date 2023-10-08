import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import productSlice from "./features/product/productSlice";
import generalSlice from "./features/general/generalSlice";
import basketSlice from "./features/basket/basketSlice";

const reducers = combineReducers({
  productSlice,
  generalSlice,
  basketSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["productSlice", ""],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
