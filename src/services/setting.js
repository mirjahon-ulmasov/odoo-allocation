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

export const getPath = (user = null) => {
  if (!user) return "/login";
  else if (user.role === "sales_manager") return "/sm";
  return `/${user.role}`;
};

export const checkPath = (user = null, path) => {
  let role = path === "sm" ? "sales_manager" : path;
  if (!user) return false;
  else if (user.role === role) return true;
  return false;
};

export default baseQuery;
