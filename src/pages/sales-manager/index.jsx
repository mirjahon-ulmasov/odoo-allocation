import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealers } from "store/sales_manager";
import NotificationList from "./NotificationList";
import ReportEdit from "./ReportEdit";
import Report from "./Report";

export default function SalesManager() {
	const [dealer, setDealer] = useState("");

	const dispatch = useDispatch();
	const { dealers, sm_prods, loading } = useSelector((state) => state.sales_manager);

	useEffect(() => {
		dispatch(fetchDealers());
	}, [dispatch]);

	useEffect(() => {
		if(dealer || !dealers) return;
		setDealer(dealers[0].id)
	}, [dispatch, dealers, dealer]);

	return (
		<Routes>
			<Route index element={
					<Report sm_prods={sm_prods} loading={loading} dealers={dealers}
						dealer={dealer} onSetDealer={(dealer) => setDealer(dealer)}/>} />
			<Route path="/edit" element={
					<ReportEdit sm_prods={sm_prods} loading={loading}  dealers={dealers} 
						dealer={dealer} onSetDealer={(dealer) => setDealer(dealer)}/>} />
			<Route path="/notifications" element={<NotificationList />} />
		</Routes>
	);
}
