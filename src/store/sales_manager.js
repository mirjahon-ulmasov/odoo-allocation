import { createSlice } from "@reduxjs/toolkit";
import { 
	fetchDealers, 
	fetchSmProds, 
	fetchOrders, 
	fetchOrderDetail 
} from "middlewares/sales_manager";

const initialState = {
	dealers: null,
	sm_prods: null,
	orders: null,
	order_detail: null,
	loading: false,
	error: null,
};

export const smSlice = createSlice({
	name: "sales_manager",
	initialState,
	reducers: {
		editSmProds(state, { payload }) {
			const { prodId, quantity } = payload;
			state.sm_prods = state.sm_prods.map((prod) => {
				if (prod.id === prodId) return { ...prod, request: quantity };
				return prod;
			});
		},
	},
	extraReducers: {
		[fetchDealers.pending]: (state) => {
			state.loading = true;
			state.dealers = null;
		},
		[fetchDealers.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.dealers = payload;
		},
		[fetchDealers.rejected]: (state) => {
			state.loading = false;
		},


		[fetchSmProds.pending]: (state) => {
			state.loading = true;
			state.sm_prods = null;
		},
		[fetchSmProds.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.sm_prods = payload;
		},
		[fetchSmProds.rejected]: (state) => {
			state.loading = false;
		},


		[fetchOrders.pending]: (state) => {
			state.loading = true;
			state.orders = null;
		},
		[fetchOrders.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.orders = payload;
		},
		[fetchOrders.rejected]: (state) => {
			state.loading = false;
		},


		[fetchOrderDetail.pending]: (state) => {
			state.loading = true;
			state.order_detail = null;
		},
		[fetchOrderDetail.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.order_detail = payload;
		},
		[fetchOrderDetail.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export const { editSmProds } = smSlice.actions;
const { reducer } = smSlice;
export default reducer;
