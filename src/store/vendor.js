import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, regenerate_api } from "../services/api";

export const fetchVendors = createAsyncThunk(
  "vendor/fetchVendors",
  async (thunkAPI) => {
    try {
      regenerate_api();
      const response = await instance.get("/vendor/list/");
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const list = await response.data;
      return list.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

export const fetchProductsByVendorID = createAsyncThunk(
  "vendor/fetchProducts",
  async (vendorID, thunkAPI) => {
    try {
      regenerate_api();
      const response = await instance.get("/product/list/?", {
        params: { vendor__vendor: vendorID },
      });
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const list = await response.data;
      return list.results;
    } catch (err) {
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

const initialState = {
  loading: false,
  vendors: null,
  products: null,
  error: null,
};

export const vendorSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearVendors(state) {
      state.vendors = null;
    },
    clearProducts(state) {
      state.products = null;
    },
  },
  extraReducers: {
    [fetchVendors.pending]: (state) => {
      state.loading = true;
    },
    [fetchVendors.fulfilled]: (state, action) => {
      state.error = null;
      state.loading = false;
      state.vendors = action.payload;
    },
    [fetchVendors.rejected]: (state, action) => {
      state.vendors = null;
      state.loading = false;
      state.error = action.payload;
    },
    [fetchProductsByVendorID.pending]: (state) => {
      state.loading = true;
    },
    [fetchProductsByVendorID.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    [fetchProductsByVendorID.rejected]: (state, action) => {
      state.products = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearProducts, clearVendors } = vendorSlice.actions;
const { reducer } = vendorSlice;
export default reducer;
