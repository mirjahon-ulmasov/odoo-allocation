import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, instance, regenerate_api } from "services/setting";
import { NotificationManager } from "react-notifications";

export const fetchProdsByDealer = createAsyncThunk(
	"product/fetchProdsByDealer",
	async (_, { rejectWithValue }) => {
		try {
			regenerate_api();
			const response = await instance.get(API + "/customer/main_page_list/");
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			const data = await response.data;
			return data.map((el) => ({ ...el, isFull: false }));
		} catch (err) {
			return rejectWithValue("Couldn't get products");
		}
	}
);

export const fetchAllocations = createAsyncThunk(
	"product/fetchAllocations",
	async ({ vendor }, { rejectWithValue }) => {
		try {
			const response = await instance.get(
				API + "/material/list_for_allocation/",
				{ params: { vendor } }
			);
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			const data = await response.data;
			return data.map((item) => ({
				...item,
				total: {
					...item.total,
					available_remains: item.total.total_available,
				},
				customers: item.customers.map((customer) => ({
					...customer,
					allocate: 0,
				})),
			}));
		} catch (err) {
			return rejectWithValue("Couldn't get data");
		}
	}
);

export const fetchVendors = createAsyncThunk(
	"product/fetchVendors",
	async (_, { rejectWithValue }) => {
		try {
			const response = await instance.get(API + "/vendor/list/");
			if (response.status !== 200) throw new Error("Bad Request");
			return response.data;
		} catch (err) {
			return rejectWithValue("Couldn't get data");
		}
	}
);

export const postAllocations = createAsyncThunk(
	"product/postAllocations",
	async ({ data, cb }) => {
		try {
			const response = await instance.post(API + "/allocation/create/", data);
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			cb();
		} catch (err) {
			NotificationManager.error("Couldn't allocate", "", 2000);
		}
	}
);

export const updateStock = createAsyncThunk(
	"product/updateStock",
	async (_, thunkAPI) => {
		try {
			const response = await instance.get(API + "/stock/update_all_stock/");
			if (response.status !== 200) throw new Error("Bad Request");
			thunkAPI.dispatch(fetchVendors());
		} catch (err) {
			return thunkAPI.rejectWithValue("Unable to Update");
		}
	}
);

const initialState = {
	dealer_prods: null,
	allocations: null,
	vendors: null,
	loading: false,
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		clearDealerProds(state) {
			state.dealer_prods = null;
		},
		editDealerProdisFull(state, { payload }) {
			state.dealer_prods = state.dealer_prods.map((dealer) => {
				if (dealer.id === payload) return { ...dealer, isFull: !dealer.isFull };
				return dealer;
			});
		},
		clearAllocation(state) {
			state.allocations = null;
		},
		editAllocation(state, { payload }) {
			const { prodId, customerId, quantity } = payload;

			const prod_index = state.allocations.findIndex(
				(prod) => prod.id === prodId
			);
			const product = state.allocations[prod_index];

			const customer_index = product.customers.findIndex(
				(customer) => customer.customer_id === customerId
			);
			const customer = product.customers[customer_index];

			state.allocations[prod_index].customers[customer_index] = {
				...customer,
				allocate:
					product.total.total_available -
						product.customers.reduce((acc, customer) => {
							if (customer.customer_id === customerId) return acc + quantity;
							return acc + customer.allocate;
						}, 0) >= 0
						? quantity
						: customer.allocate,
			};

			state.allocations[prod_index].total = {
				...product.total,
				available_remains:
					product.total.total_available -
					product.customers.reduce((acc, customer) => {
						return acc + customer.allocate;
					}, 0),
			};
		},
	},
	extraReducers: {
		[fetchProdsByDealer.pending]: (state) => {
			state.loading = true;
			state.dealer_prods = null;
		},
		[fetchProdsByDealer.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.dealer_prods = payload;
		},
		[fetchProdsByDealer.rejected]: (state, { payload }) => {
			state.loading = false;
			NotificationManager.error(payload, "", 2000);
		},

		[fetchAllocations.pending]: (state) => {
			state.loading = true;
			state.allocations = null;
		},
		[fetchAllocations.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.allocations = payload;
		},
		[fetchAllocations.rejected]: (state, { payload }) => {
			state.loading = false;
			NotificationManager.error(payload, "", 2000);
		},

		[fetchVendors.pending]: (state) => {
			state.loading = true;
			state.vendors = null;
		},
		[fetchVendors.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.vendors = payload;
		},
		[fetchVendors.rejected]: (state, { payload }) => {
			state.loading = false;
			NotificationManager.error(payload, "", 2000);
		},

		[updateStock.pending]: (state) => {
			state.loading = true;
		},
		[updateStock.fulfilled]: (state) => {
			state.loading = false;
			NotificationManager.success("Successfully Updated", "", 2000);
		},
		[updateStock.rejected]: (state, { payload }) => {
			state.loading = false;
			NotificationManager.error(payload, "", 2000);
		},
	},
});

export const {
	editAllocation,
	clearAllocation,
	clearDealerProds,
	editDealerProdisFull,
} = productSlice.actions;
const { reducer } = productSlice;
export default reducer;
