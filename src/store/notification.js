import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationList, fetchNotifDetails } from "middlewares/notification"

const initialState = {
	notifications: [],
	notification_details: null,
	loading: false,
	error: null,
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		clearNotifications(state) {
			state.notifications = [];
		},
		clearNotificationDetail(state) {
			state.notification_details = null;
		},
		addNotification(state, { payload }) {
			const index = state.notifications.findIndex(
				(notif) => notif.id === payload.id
			);
			if (index >= 0) state.notifications[index] = payload;
			else state.notifications.unshift(payload);
		},
		editDealerCount(state, { payload }) {
			const { materialId, dealerId, quantity } = payload;
			const number = quantity !== "" ? parseInt(quantity) : 0;
			state.notification_details = state.notification_details.map((item) => {
				if (item.material_id === materialId) {
					return {
						...item,
						dealers: item.dealers.map((dealer) => {
							if (dealer.dealer_id === dealerId) {
								return {
									...dealer,
									given:
										dealer.dealer_allocation > number
											? quantity
											: dealer.dealer_allocation > 0 
												? dealer.dealer_allocation 
												: "" ,
									remain:
										dealer.dealer_allocation > number
											? dealer.dealer_allocation - number
											: 0,
								};
							}
							return dealer;
						}),
					};
				}
				return item;
			});
		},
	},
	extraReducers: {
		[fetchNotificationList.pending]: (state) => {
			state.loading = true;
		},
		[fetchNotificationList.fulfilled]: (state, action) => {
			state.loading = false;
			state.notifications = action.payload;
		},
		[fetchNotificationList.rejected]: (state) => {
			state.loading = false;
			state.notifications = [];
		},

		[fetchNotifDetails.pending]: (state) => {
			state.loading = true;
		},
		[fetchNotifDetails.fulfilled]: (state, action) => {
			state.loading = false;
			state.notification_details = action.payload;
		},
		[fetchNotifDetails.rejected]: (state) => {
			state.loading = false;
			state.notification_details = [];
		},
	},
});

export const {
	clearNotifications,
	clearNotificationDetail,
	addNotification,
	editDealerCount,
} = notificationSlice.actions;
const { reducer } = notificationSlice;
export default reducer;
