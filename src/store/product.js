import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { 
	updateStock,
	fetchVendors,
	fetchPageCount,
	fetchAllocations,
	fetchProdsByDealer,
	fetchDealersByFact,
} from "middlewares/product"


const initialState = {
	loading: false,
	vendors: null,
	allocations: null,
	dealer_prods: [],
	dealer_factory: null,
	page_count: 0,
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		editDealerProdisFull(state, { payload }) {
			state.dealer_prods = state.dealer_prods.map((prod) => ({
				...prod,
				customers: prod.customers.map(customer => {
					if(customer.customer_id === payload) return {...customer, isFull: !customer.isFull}
					return customer
				})
			}))
		},
		editAllocation(state, { payload }) {
			const { prodId, customerId, quantity } = payload;
			const number = quantity !== '' ? parseInt(quantity) : 0;

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
							if (customer.customer_id === customerId) return acc + number;
							return acc + parseInt(customer.allocate !== '' ? customer.allocate : 0);
						}, 0) >= 0
						? quantity
						: parseInt(customer.allocate !== '' ? customer.allocate : 0) + state.allocations[prod_index].total.available_remains,
			};

			state.allocations[prod_index].total = {
				...product.total,
				available_remains:
					product.total.total_available -
					product.customers.reduce((acc, customer) => {
						return acc + parseInt(customer.allocate !== '' ? customer.allocate : 0);
					}, 0),
			};
		},
	},
	extraReducers: {
		[fetchProdsByDealer.pending]: (state) => {
			state.loading = true;
			state.dealer_prods = [];
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

		
		[fetchDealersByFact.pending]: (state) => {
			state.loading = true;
			state.dealer_factory = null;
		},
		[fetchDealersByFact.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.dealer_factory = payload;
		},
		[fetchDealersByFact.rejected]: (state, { payload }) => {
			state.loading = false;
			NotificationManager.error(payload, "", 2000);
		},


		[fetchPageCount.pending]: (state) => {
			state.loading = true;
			state.page_count = null;
		},
		[fetchPageCount.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.page_count = payload;
		},
		[fetchPageCount.rejected]: (state, { payload }) => {
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

export const { editAllocation, editDealerProdisFull } = productSlice.actions;
const { reducer } = productSlice;
export default reducer;
