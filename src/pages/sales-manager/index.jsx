import React from "react";
import { Route, Routes } from "react-router-dom";

export default function SalesManager() {
  return (
    <Routes>
      <Route index element={<h1>SM page</h1>} />
      <Route path="/notification" element={<h1>SM notification</h1>} />
    </Routes>
  );
}
