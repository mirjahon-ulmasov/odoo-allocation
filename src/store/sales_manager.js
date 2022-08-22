import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, instance, regenerate_api } from "services/setting";
import { NotificationManager } from "react-notifications";

export const fetchDealers = createAsyncThunk("sm/fetchDealers", async () => {
	try {
		regenerate_api();
		const response = await instance.get(API + "/customer/list/");
		if (response.status !== 200) {
			throw new Error("Bad Request");
		}
		const data = await response.data;
		return data;
	} catch (err) {
		NotificationManager.error("Couldn't get dealers", "", 2000);
	}
});

export const fetchSmProds = createAsyncThunk(
	"sm/fetchSmProds",
	async ({ dealer }) => {
		try {
			const response = await instance.get(API + "/material/sm_list/", {
				params: { dealer },
			});
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			const data = await response.data;
			return data.map((item) => ({
				...item,
				request: item.allocated,
			}));
		} catch (err) {
			NotificationManager.error("Couldn't get products", "", 2000);
		}
	}
);

export const fetchOrders = createAsyncThunk("sm/fetchOrders", 
	async(dealerId, thunkAPI) => {
		try {
			const response = await instance.get(API + "/order/list/", {
				params: {customer: dealerId }
			});
			if(response.status !== 200) throw new Error("Bad request");
		
			const data = await response.data;
			return data;
		} catch(err) {
			NotificationManager.error("Couldn't get orders", "", 2000);
		}
})

export const fetchOrderDetail = createAsyncThunk("sm/fetchOrderDetail", 
	async(orderId, thunkAPI) => {
		try {
			const response = await instance.get(API + `/order/${orderId}/detail/`);
			if(response.status !== 200) throw new Error("Bad request");
			const data = await response.data;
			return data;

		} catch(err) {
			NotificationManager.error("Couldn't get order detail", "", 2000);
		}
})

export const postReservation = createAsyncThunk(
	"sm/postReservation",
	async ({ data, cb }) => {
		try {
			const response = await instance.post(API + "/order/create/", data);
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			cb();
		} catch (err) {
			NotificationManager.error("Couldn't reserve", "", 2000);
		}
	}
);

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
