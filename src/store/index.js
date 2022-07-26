import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "services/productService";
import { smApi } from "services/smService";
import notifReducer from "./notification";
import authReducer from "./auth";
import prodReducer from "./product";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: prodReducer,
    notification: notifReducer,
    [smApi.reducerPath]: smApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
});
