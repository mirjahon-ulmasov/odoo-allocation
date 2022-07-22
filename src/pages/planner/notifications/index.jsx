import React from "react";
import { Route, Routes } from "react-router-dom";
import NotificationList from "./components/NotificationList.jsx";

export default function Planning() {
  return (
    <Routes>
      <Route index element={<NotificationList />} />
    </Routes>
  );
}
