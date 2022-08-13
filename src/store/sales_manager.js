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
        reserve: item.allocated,
      }));
    } catch (err) {
      NotificationManager.error("Couldn't get products", "", 2000);
    }
  }
);

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
  loading: false,
  error: null,
};

export const smSlice = createSlice({
  name: "sales_manager",
  initialState,
  reducers: {
    clearDealers(state) {
      state.dealers = null;
    },
    clearSmProds(state) {
      state.sm_prods = null;
    },
    editSmProds(state, { payload }) {
      const { prodId, quantity } = payload;
      state.sm_prods = state.sm_prods.map((prod) => {
        if (prod.id === prodId) return { ...prod, reserve: quantity };
        return prod;
      });
    },
  },
  extraReducers: {
    [fetchDealers.pending]: (state) => {
      state.loading = true;
    },
    [fetchDealers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dealers = payload;
    },
    [fetchDealers.rejected]: (state) => {
      state.loading = false;
      state.dealers = null;
    },

    [fetchSmProds.pending]: (state) => {
      state.loading = true;
    },
    [fetchSmProds.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.sm_prods = payload;
    },
    [fetchSmProds.rejected]: (state) => {
      state.loading = false;
      state.sm_prods = null;
    },
  },
});

export const { clearDealers, clearSmProds, editSmProds } = smSlice.actions;
const { reducer } = smSlice;
export default reducer;
