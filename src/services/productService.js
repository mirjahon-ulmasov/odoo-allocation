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
      transformResponse: (response) => {
        return response.results;
      },
    }),
    fetchVendors: builder.query({
      query: () => ({
        url: "/vendor/list/",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.results;
      },
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
      transformResponse: (response) => {
        return response.results;
      },
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
      transformResponse: (response) => {
        return response.results;
      },
    }),
  }),
});

export const {
  useFetchVendorsQuery,
  useFetchAllProductsQuery,
  useFetchDealersByProdQuery,
  useFetchProdsByVendorQuery,
} = productApi;
