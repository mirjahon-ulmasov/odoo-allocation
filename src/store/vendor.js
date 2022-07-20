import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

export const vendorSlice = createSlice({
  name: "auth",
  initialState,
});

// export const {} = vendorSlice.actions;
const { reducer } = vendorSlice;
export default reducer;
