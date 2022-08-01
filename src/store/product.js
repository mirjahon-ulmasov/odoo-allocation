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

export const fetchAllocations = createAsyncThunk(
  "product/fetchAllocations",
  async ({ vendor }) => {
    try {
      const response = await instance.get(
        API + "/material/list_for_allocation/",
        {
          params: { vendor },
        }
      );
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const data = await response.data;
      return data.map((item) => ({
        ...item,
        total: {
          ...item.total,
          available_remains: item.total.total_available,
        },
        customers: item.customers.map((customer) => ({
          ...customer,
          allocated: 0,
        })),
      }));
    } catch (err) {
      NotificationManager.error("Couldn't get data", "", 2000);
    }
  }
);

export const postAllocations = createAsyncThunk(
  "product/postAllocations",
  async ({ data, cb }) => {
    try {
      const response = await instance.post(API + "/allocation/create/", data);
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      cb();
    } catch (err) {
      NotificationManager.error("Couldn't allocate", "", 2000);
    }
  }
);

const initialState = {
  dealer_prods: null,
  allocations: null,
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
    clearAllocation(state) {
      state.allocations = null;
    },
    editAllocation(state, { payload }) {
      const { prodId, customerId, quantity } = payload;

      const prod_index = state.allocations.findIndex(
        (prod) => prod.id === prodId
      );
      const product = state.allocations[prod_index];

      const customer_index = product.customers.findIndex(
        (customer) => customer.customer_id === customerId
      );
      const customer = product.customers[customer_index];

      state.allocations[prod_index].customers[customer_index] = {
        ...customer,
        allocated: quantity,
      };

      state.allocations[prod_index].total = {
        ...product.total,
        available_remains:
          product.total.total_available -
          product.customers.reduce((acc, customer) => {
            return acc + customer.allocated;
          }, 0),
      };
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

    [fetchAllocations.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllocations.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allocations = payload;
    },
    [fetchAllocations.rejected]: (state) => {
      state.loading = false;
      state.allocations = null;
    },
  },
});

export const {
  clearDealerProds,
  editDealerProdisFull,
  editAllocation,
  clearAllocation,
} = productSlice.actions;
const { reducer } = productSlice;
export default reducer;
