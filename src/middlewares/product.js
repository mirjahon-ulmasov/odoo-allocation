import { NotificationManager } from "react-notifications";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "services/config";

export const fetchProdsByDealer = createAsyncThunk(
	"product/fetchProdsByDealer",
	async ({ date_from, date_to, page }, { rejectWithValue, getState, dispatch }) => {
		try {
			const response = await instance.get("/customer/main_page_list/", 
                { params: { date_from, date_to, page }}
            );
			if (response.status !== 200) throw new Error("Bad Request");
			const data = await response.data;
			await dispatch(fetchPageCount());
			await dispatch(fetchVendors());
			return data.map((prod) => ({
				...prod, 
				customers: prod.customers.map(customer => ({
					...customer, 
					isFull: false
					}))
				}));
		} catch (err) {
			return rejectWithValue("Couldn't get products");
		}
	}
);


export const fetchDealersByFact = createAsyncThunk(
	'product/fetchDealersByFact',
	async({ date_from, date_to }, { rejectWithValue }) => {
		try {
			const response = await instance.get('/customer/stat_by_factory/', { params: { date_from, date_to }});
			if (response.status !== 200) throw new Error("Bad Request");
			return response.data;
		} catch (err) {
			return rejectWithValue("Couldn't get data");
		}
	}
);


export const fetchPageCount = createAsyncThunk("product/fetchPageCount", 
	async function( vendor = null , { rejectWithValue }) {
		try {
			const params = {};
			if(vendor) {
				params.vendor = vendor;
			}
			const response = await instance.get("/material/get_page_count/", { params });
			if (response.status !== 200) throw new Error("Bad Request");
			const data = await response.data;
			return data.page_count + 1
		} catch (err) {
			rejectWithValue("Couldn't get page count")
		}
})

export const fetchAllocations = createAsyncThunk(
	"product/fetchAllocations",
	async ({ vendor, page }, { rejectWithValue, dispatch }) => {
		try {
			const response = await instance.get("/material/list_for_allocation/",
				{ params: { vendor, page } }
			);
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			const data = await response.data;
			await dispatch(fetchPageCount(vendor));
			return data.map((item) => ({
				...item,
				total: {
					...item.total,
					available_remains: item.total.total_available,
				},
				customers: item.customers.map((customer) => ({
					...customer,
					allocate: "",
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
			const response = await instance.get("/vendor/list/");
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
			const response = await instance.post("/allocation/create/", data);
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
			const response = await instance.get("/stock/update_all_stock/");
			if (response.status !== 200) throw new Error("Bad Request");
			thunkAPI.dispatch(fetchVendors());
		} catch (err) {
			return thunkAPI.rejectWithValue("Unable to Update");
		}
	}
);