import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, regenerate_api } from "../services/api";

export const fetchProductsByVendorID = createAsyncThunk(
  "vendor/fetchProducts",
  async ({ vendorID, exclude }, thunkAPI) => {
    try {
      regenerate_api();
      const response = await instance.get("/material/list/", {
        params: { vendor: vendorID, exclude: exclude },
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
  products: null,
  error: null,
};

export const vendorSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearProducts(state) {
      state.products = null;
    },
  },
  extraReducers: {
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
