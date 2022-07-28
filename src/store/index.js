import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "services/productService";
import { smApi } from "services/smService";
import notifReducer from "./notification";
import smReducer from "./sales_manager"
import prodReducer from "./product";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: prodReducer,
    notification: notifReducer,
    sales_manager: smReducer,
    [smApi.reducerPath]: smApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
});
