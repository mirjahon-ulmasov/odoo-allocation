import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./setting";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => ({
        url: "/material/list/",
        method: "GET",
      }),
    }),
    fetchVendors: builder.query({
      query: () => ({
        url: "/vendor/list/",
        method: "GET",
      }),
    }),
    fetchProdsByVendor: builder.query({
      query: ({ vendor, exclude }) => ({
        url: "/material/list/",
        method: "GET",
        params: {
          vendor,
          exclude,
        },
      }),
    }),
    fetchDealersByProd: builder.query({
      query: ({ material, exclude }) => ({
        url: "/customer/list/",
        method: "GET",
        params: {
          material,
          exclude,
        },
      }),
    }),
  }),
});

export const {
  useFetchVendorsQuery,
  useFetchAllProductsQuery,
  useFetchDealersByProdQuery,
  useFetchProdsByVendorQuery
} = productApi;
