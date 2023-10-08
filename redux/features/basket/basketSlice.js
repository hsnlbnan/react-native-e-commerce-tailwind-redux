import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basketSlice",
  initialState: [],
  reducers: {
    addProductToBasket: (state, action) => {
      const product = action.payload;
      const productInBasket = state.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (productInBasket) {
        productInBasket.quantity += product.quantity;
      } else {
        state.push(product);
      }
    },

    incrementToProductQuantity: (state, action) => {
      const product = action.payload;
      console.log("product", product);
      const productInBasket = state.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (productInBasket) {
        productInBasket.quantity += 1;
      }
    },

    decrementToProductQuantity: (state, action) => {
      const product = action.payload;
      const productInBasket = state.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (productInBasket && productInBasket.quantity > 1) {
        productInBasket.quantity -= 1;
      } else {
        const index = state.findIndex(
          (item) =>
            item.id === product.id && item.selectedSize === product.selectedSize
        );

        state.splice(index, 1);
      }
    },

    changeCustomQuantity: (state, action) => {
      const { id, selectedSize, quantity } = action.payload;
      const productInBasket = state.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );

      if (productInBasket) {
        productInBasket.quantity = quantity;
      }
    },

    // if coupon === "DISCOUNT" then calculate the 10% discount on subtotal and return the new subtotal
    // else return the subtotal
    addCouponToBasket: (state, action) => {
      const coupon = action.payload;
      const subtotal = state.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      if (coupon === "DISCOUNT") {
        return subtotal - (subtotal * 10) / 100;
      } else {
        return subtotal;
      }
    },

    removeCouponFromBasket: (state, action) => {
      const coupon = action.payload;
      const subtotal = state.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      if (coupon === "DISCOUNT") {
        return subtotal + (subtotal * 10) / 100;
      } else {
        return subtotal;
      }
    },
  },
});

export const {
  addProductToBasket,
  incrementToProductQuantity,
  decrementToProductQuantity,
  changeCustomQuantity,
  addCouponToBasket,
} = basketSlice.actions;

export const getBasketProducts = (state) => state.basketSlice;

export default basketSlice.reducer;
