import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { API, instance } from "services/setting";

export const fetchNotificationList = createAsyncThunk(
  "notification/fetchNotificationList",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get(API + "/notification/list/");
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const notifications = await response.data;
      return notifications.results;
    } catch (err) {
      NotificationManager.error("Couldn't get notifications", "", 2000);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearData(state) {
      state.notifications = [];
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
    [fetchNotificationList.rejected]: (state, action) => {
      state.loading = false;
      state.notifications = [];
      state.error = action.payload;
    },
  },
});

export const { clearData } = notificationSlice.actions;
const { reducer } = notificationSlice;
export default reducer;
