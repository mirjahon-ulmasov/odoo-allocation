import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "services/setting";
import { NotificationManager } from "react-notifications";

export const fetchProdsByDealer = createAsyncThunk(
	"product/fetchProdsByDealer",
	async ({ date_from }, { rejectWithValue }) => {
		try {
			const response = await instance.get("/customer/main_page_list/", 
                { params: { date_from }}
            );
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
			const response = await instance.get("/material/list_for_allocation/",
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


export const fetchAllProducts = createAsyncThunk(
	'product/fetchAllProducts',
	async({ date_from }, { rejectWithValue }) => {
		try {
			const response = await instance.get('/material/list/', { params: { date_from }});
			if(response.status !== 200) throw new Error("Bad Request");
			return response.data;
		} catch(err) {
			return rejectWithValue("Couldn't get products");
		}
	}
);


export const fetchDealersByFact = createAsyncThunk(
	'product/fetchDealersByFact',
	async({ date_from }, { rejectWithValue }) => {
		try {
			const response = await instance.get('/customer/stat_by_factory/', { params: { date_from }});
			if(response.status !== 200) throw new Error("Bad Request");
			return response.data;
		} catch(err) {
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