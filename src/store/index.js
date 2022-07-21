import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

import { productApi } from "services/productService";
import { smApi } from "services/smService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [smApi.reducerPath]: smApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
});
