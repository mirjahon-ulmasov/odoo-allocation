import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "services/config";
import { NotificationManager } from "react-notifications";

export const fetchDealers = createAsyncThunk("sm/fetchDealers", async () => {
	try {
		const response = await instance.get("/customer/list/");
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
			const response = await instance.get("/material/sm_list/", {
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
			const response = await instance.get("/order/list/", {
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
			const response = await instance.get(`/order/${orderId}/detail/`);
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
			const response = await instance.post("/order/create/", data);
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			cb();
		} catch (err) {
			NotificationManager.error("Couldn't reserve", "", 2000);
		}
	}
);
