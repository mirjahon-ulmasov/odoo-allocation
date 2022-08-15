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
	}),
});

export const { useFetchAllProductsQuery, useFetchDealersByFactQuery } = productApi;
