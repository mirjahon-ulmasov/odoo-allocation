import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "services/config";
import { NotificationManager } from "react-notifications";

export const fetchNotificationList = createAsyncThunk(
	"notification/fetchNotificationList",
	async () => {
		try {
			const response = await instance.get("/notification/list/");
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			const notifications = await response.data;
			return notifications;
		} catch (err) {
			NotificationManager.error("Couldn't get notifications", "", 2000);
		}
	}
);

export const fetchNotifDetails = createAsyncThunk(
	"notification/fetchNotifDetails",
	async (notifId) => {
		try {
			const response = await instance.get(`/notification/${notifId}/detail/`);
			if (response.status !== 200) {
				throw new Error("Bad Request");
			}
			const notifDetails = await response.data;
			return notifDetails.map((notif) => ({
				...notif,
				dealers: notif.dealers.map((dealer) => ({
					...dealer,
					given: "",
					remain: dealer.dealer_allocation,
				})),
			}));
		} catch (err) {
			NotificationManager.error("Couldn't get notification details", "", 2000);
		}
	}
);

export const postNotification = createAsyncThunk(
	"notification/postNotification",
	async (data) => {
		try {
			const response = await instance.post("/order/confirm_reserve/ ", data);
			if (response.status !== 200) throw new Error("Bad Request")
		} catch (err) {
			NotificationManager.error("Couldn't confirm", "", 2000);
		}
	}
);