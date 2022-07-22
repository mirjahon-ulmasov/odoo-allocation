import React from "react";
import { Route, Routes } from "react-router-dom";
import NotificationList from "./components/NotificationList";
import Report from "./components/Report";

export default function SalesManager() {
  return (
    <Routes>
      <Route index element={<Report />} />
      <Route path="/notifications" element={<NotificationList />} />
    </Routes>
  );
}
