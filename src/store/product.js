import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, instance, regenerate_api } from "services/setting";
import { NotificationManager } from "react-notifications";

export const fetchProdsByDealer = createAsyncThunk(
  "product/fetchProdsByDealer",
  async () => {
    try {
      regenerate_api();
      const response = await instance.get(API + "/customer/main_page_list/");
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const data = await response.data;
      return data.map((el) => ({ ...el, isFull: false }));
    } catch (err) {
      NotificationManager.error("Couldn't get products", "", 2000);
    }
  }
);

export const fetchDealersByProd = createAsyncThunk(
  "product/fetchDealersByProd",
  async ({ material, exclude }) => {
    try {
      const response = await instance.get(API + "/customer/list/", {
        params: { material, exclude },
      });
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const data = await response.data;
      return data.results;
    } catch (err) {
      NotificationManager.error("Couldn't get dealers", "", 2000);
    }
  }
);

export const fetchProdsByVendor = createAsyncThunk(
  "product/fetchProdsByVendor",
  async ({ vendor, exclude }) => {
    try {
      regenerate_api();
      const response = await instance.get(API + "/material/list/", {
        params: { vendor, exclude },
      });
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const data = await response.data;
      return data.results;
    } catch (err) {
      NotificationManager.error("Couldn't get dealers", "", 2000);
    }
  }
);

const initialState = {
  vendor_prods: null,
  dealer_prods: null,
  prods_dealer: [],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearDealerProds(state) {
      state.dealer_prods = null;
    },
    editDealerProdisFull(state, { payload }) {
      state.dealer_prods = state.dealer_prods.map((dealer) => {
        if (dealer.id === payload) return { ...dealer, isFull: !dealer.isFull };
        return dealer;
      });
    },
  },
  extraReducers: {
    [fetchProdsByDealer.pending]: (state) => {
      state.loading = true;
    },
    [fetchProdsByDealer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dealer_prods = payload;
    },
    [fetchProdsByDealer.rejected]: (state) => {
      state.loading = false;
      state.dealer_prods = null;
    },

    [fetchDealersByProd.pending]: (state) => {
      state.loading = true;
    },
    [fetchDealersByProd.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.prods_dealer.push(payload);
    },
    [fetchDealersByProd.rejected]: (state) => {
      state.loading = false;
      state.prods_dealer = null;
    },

    [fetchProdsByVendor.pending]: (state) => {
      state.loading = true;
    },
    [fetchProdsByVendor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.vendor_prods = payload;
    },
    [fetchProdsByVendor.rejected]: (state) => {
      state.loading = false;
      state.vendor_prods = null;
    },
  },
});

export const { clearDealerProds, editDealerProdisFull } = productSlice.actions;
const { reducer } = productSlice;
export default reducer;
