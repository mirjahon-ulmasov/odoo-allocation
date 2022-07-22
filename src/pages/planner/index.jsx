import React from "react";
import { Route, Routes } from "react-router-dom";
import NotificationList from "./components/NotificationList";
import MainPage from "./main";
import Planning from "./planning";

export default function Planner() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/planning/*" element={<Planning />} />
      <Route path="/notifications" element={<NotificationList />} />
    </Routes>
  );
}
