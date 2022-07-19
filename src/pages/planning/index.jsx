import React from "react";
import { Route, Routes } from "react-router-dom";
import PlanningDetail from "./PlanningDetail/index.jsx";
import PlanningList from "./PlanningList/index.jsx";

export default function Planning() {
  return (
    <Routes>
      <Route path="/" element={<PlanningList />} />
      <Route path="/:vendorID" element={<PlanningDetail />} />
    </Routes>
  );
}
