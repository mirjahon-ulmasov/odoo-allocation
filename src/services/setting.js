import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API } from "./api";

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");

    if (token) headers.set("Authorization", `Token ${token}`);
    return headers;
  },
});

export default baseQuery;
