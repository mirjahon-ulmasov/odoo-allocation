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
  }),
});

export const { useFetchAllProductsQuery, useFetchVendorsQuery } = productApi;
