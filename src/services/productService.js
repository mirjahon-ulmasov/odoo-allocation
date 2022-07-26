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
  }),
});

export const { useFetchVendorsQuery, useFetchAllProductsQuery } = productApi;
