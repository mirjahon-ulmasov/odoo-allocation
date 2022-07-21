import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./main";
import Planning from "./planning";

export default function Planner() {
  return (
    <Routes>
       <Route index element={<MainPage />}/>
       <Route path="/planning/*" element={<Planning />}/>
    </Routes>
  );
}
