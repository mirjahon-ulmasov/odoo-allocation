import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import axios from "axios";

// API
export const API = process.env.REACT_APP_API || "http://odoo-api.artelelectronics.com/api/v1";

// RTK Query
const baseQuery = fetchBaseQuery({
	baseUrl: API,
	prepareHeaders: (headers, { getState }) => {
		const token = localStorage.getItem("token");

		if (token) headers.set("Authorization", `Token ${token}`);
		return headers;
	},
});

export default baseQuery;

// Axios
export const defaultOptions = () => {
	const token = localStorage.getItem("token");
	const config = {
		baseURL: API,
		headers: {
			"Content-Type": "application/json",
		},
	};
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}
	return config;
};

const generate_api = () => axios.create(defaultOptions());

export const regenerate_api = () => {
	instance = generate_api();
};
export let instance = generate_api();
