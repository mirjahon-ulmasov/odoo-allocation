import React from "react";
import { NotificationContainer } from "react-notifications";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function MainLayout() {
  return (
    <>
      <NotificationContainer />
      <NavBar />
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  );
}
