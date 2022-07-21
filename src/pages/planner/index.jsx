import React from "react";
import { Route, Routes } from "react-router-dom";
import Notification from "./components/Notification";
import MainPage from "./main";
import Planning from "./planning";

export default function Planner() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/planning/*" element={<Planning />} />
    </Routes>
  );
}
