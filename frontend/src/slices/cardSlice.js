import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("card")
  ? JSON.parse(localStorage.getItem("card"))
  : { cardItems: [] };

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
});

export default cardSlice.reducer;
