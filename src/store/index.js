import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import vendorReducer from "./vendor";

import { productApi } from "../services/productService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendors: vendorReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
});
