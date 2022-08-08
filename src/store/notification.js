import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { API, instance } from "services/setting";

export const fetchNotificationList = createAsyncThunk(
  "notification/fetchNotificationList",
  async () => {
    try {
      const response = await instance.get(API + "/notification/list/");
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const notifications = await response.data;
      return notifications.results;
    } catch (err) {
      NotificationManager.error("Couldn't get notifications", "", 2000);
    }
  }
);

export const fetchNotifDetails = createAsyncThunk(
  "notification/fetchNotifDetails",
  async (notifId) => {
    try {
      const response = await instance.get(API + `/notification/${notifId}/detail/`);
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const notifDetails = await response.data;
      return notifDetails.map((notif) => ({
        ...notif,
        dealers: notif.dealers.map((dealer) => ({
          ...dealer,
          given: 0,
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
      const response = await instance.post(API + "/order/confirm_reserve/ ", data);
      if (response.status !== 200) throw new Error("Bad Request")
    } catch (err) {
      NotificationManager.error("Couldn't confirm", "", 2000);
    }
  }
);

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
      state.notification_details = state.notification_details.map((item) => {
        if (item.material_id === materialId) {
          return {
            ...item,
            dealers: item.dealers.map((dealer) => {
              if (dealer.dealer_id === dealerId) {
                return {
                  ...dealer,
                  given:
                    dealer.dealer_allocation > quantity
                      ? quantity
                      : dealer.dealer_allocation,
                  remain:
                    dealer.dealer_allocation > quantity
                      ? dealer.dealer_allocation - quantity
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
