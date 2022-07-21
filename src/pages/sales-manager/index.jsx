import React from "react";
import { Route, Routes } from "react-router-dom";
import Notification from "./components/Notification";
import Report from "./components/Report";

export default function SalesManager() {
  return (
    <Routes>
      <Route index element={<Report />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
}
