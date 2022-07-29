import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, instance, regenerate_api } from "services/setting";
import { NotificationManager } from "react-notifications";

export const fetchDealers = createAsyncThunk("sm/fetchDealers", async () => {
  try {
    regenerate_api();
    const response = await instance.get(API + "/customer/default_list/");
    if (response.status !== 200) {
      throw new Error("Bad Request");
    }
    const data = await response.data;
    return data.results;
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
      return data.results.map((item) => ({
        ...item,
        reserve: item.allocated,
      }));
    } catch (err) {
      NotificationManager.error("Couldn't get products", "", 2000);
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

export const { clearDealers, clearSmProds } = smSlice.actions;
const { reducer } = smSlice;
export default reducer;
