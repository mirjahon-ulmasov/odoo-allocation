import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import vendorReducer from "./vendor";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendors: vendorReducer,
  },
});
