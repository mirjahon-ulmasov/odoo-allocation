import React, { Fragment } from "react";
import { NotificationContainer } from "react-notifications";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function MainLayout() {
	return (
		<Fragment>
			<NotificationContainer />
			<NavBar />
			<main className="main-layout">
				<Outlet />
			</main>
		</Fragment>
	);
}
