import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

import { productApi } from "../services/productService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
});
