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
    fetchDealersByFact: builder.query({
      query: () => ({
        url: "/customer/stat_by_factory/",
        method: "GET",
      }),
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

export const {
  useFetchVendorsQuery,
  useFetchAllProductsQuery,
  useFetchDealersByFactQuery,
} = productApi;
