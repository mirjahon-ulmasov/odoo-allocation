import React from "react";
import { Route, Routes } from "react-router-dom";
import PlanningDetail from "./PlanningDetail.jsx";
import PlanningList from "./PlanningList.jsx";

export default function Planning() {
	return (
		<Routes>
			<Route index element={<PlanningList />} />
			<Route path="/:vendorID" element={<PlanningDetail />} />
		</Routes>
	);
}
