import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./setting";

export const smApi = createApi({
  reducerPath: "smApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchSmProds: builder.query({
      query: ({ dealer }) => ({
        url: "/material/sm_list/",
        method: "GET",
        params: {
          dealer,
        },
      }),
      transformResponse: (response) => {
        return response.results.map((item) => ({
          ...item,
          reserve: item.allocated,
        }));
      },
    }),
    fetchDealers: builder.query({
      query: () => ({
        url: "/customer/default_list/",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.results;
      },
    }),
  }),
});

export const { useFetchSmProdsQuery, useFetchDealersQuery } = smApi;
