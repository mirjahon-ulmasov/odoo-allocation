import React from "react";
import { Route, Routes } from "react-router-dom";
import PlanningDetail from "./components/PlanningDetail";
import PlanningList from "./components/PlanningList";

export default function Planning() {
  return (
    <Routes>
      <Route path="/" element={<PlanningList />} />
      <Route path="/:planId" element={<PlanningDetail />} />
    </Routes>
  );
}
