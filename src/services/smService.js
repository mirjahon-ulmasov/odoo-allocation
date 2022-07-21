import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./setting";

export const smApi = createApi({
  reducerPath: "smApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchSmProds: builder.query({
      query: () => ({
        url: "/material/sm_list/",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.results.map((item) => ({
          ...item,
          reserve: item.allocated,
        }));
      },
    }),
  }),
});

export const { useFetchSmProdsQuery } = smApi;
