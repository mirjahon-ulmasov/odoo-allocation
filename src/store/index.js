import { configureStore } from "@reduxjs/toolkit";
import notifReducer from "./notification";
import smReducer from "./sales_manager";
import prodReducer from "./product";
import authReducer from "./auth";
import setting from "./setting";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: prodReducer,
		sales_manager: smReducer,
		notification: notifReducer,
		setting
	},
});
