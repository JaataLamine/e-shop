import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("card")
  ? JSON.parse(localStorage.getItem("card"))
  : { cardItems: [] };

const addDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const item = action.payload;
      const existItem = state.cardItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cardItems = state.cardItems.find((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cardItems = [...state.cardItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cardItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price (If order is over $100 then free, else $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Save all the price to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCard } = cartSlice.actions;

export default cartSlice.reducer;
