import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchOrders, resendOrder } from "middlewares/sales_manager";
import { T1v1, Container } from "components/Tables";
import Loader from "components/Loader";
import { getStatusOrder } from "utils";

import back from "assets/icons/back.svg";

const headers = [
    "Order ID",
    "SAP Order ID",
    "Creation date&time",
    "Customer",
    "Creator",
    "Status",    
];

export default function Orders({ dealers, loading, dealer, onSetDealer }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { orders } = useSelector(state => state.sales_manager)

	useEffect(() => {
		if (!dealers || dealers.length === 0) return;
		let dealerId = dealer ? dealer : dealers[0].id;
		dispatch(fetchOrders(dealerId));
	}, [dispatch, dealers, dealer]);

	const resendHandler = (event, id) => {
		event.stopPropagation();
	    dispatch(resendOrder(id));
	}

    return (
		<Fragment>
			{loading && <Loader />}
			<nav className="nav-links">
				<img onClick={() => navigate(-1)} src={back} alt="back icon" />
				<p onClick={() => navigate("/sm")} className="click">{t("main.mainPage")} -</p>
				<p className="unclick">{t("headers.orders")}</p>
			</nav>
			<header className="header">
				<h1>{t("headers.orders")}</h1>
				{dealers && (
					<Box sx={{ minWidth: 200 }}>
						<FormControl sx={{ backgroundColor: "#f1f1f1", borderRadius: "2px" }} size="small" fullWidth>
							<InputLabel>Select dealer</InputLabel>
							<Select value={dealer} label="Select dealer" onChange={(e) => onSetDealer(e.target.value)}>
								{dealers.map((dealer, index) => (
									<MenuItem key={index} value={dealer.id}>
										{dealer.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				)}
			</header>
			{orders && orders.length !== 0 && (
				<Fragment>
					<Container className="scroll">
						<T1v1 style={{ marginTop: "1.5em" }}>
							<thead>
								<tr>
									{headers.map((header, index) => (
										<th key={index}>{header}</th>
									))}
								</tr>
							</thead>
							<tbody className="scroll">
								{orders.map((item, index) => {
									return (
										<tr key={index} onClick={() => navigate(`${item.id}`)}>
											<td>{item.id}</td>
											<td>{item.salesorder}</td>
											<td>{item.orderdate} {item.orderetime}</td>
											<td>{item.customer.name}</td>
											<td>{item.owner.email}</td>
											<td>
												{getStatusOrder(item.status)} 
												{item.status === '5' && (
													<button onClick={(event) => resendHandler(event, item.id)} 
														style={{ marginLeft: '1rem' }} className="btn danger">
														  	Resend
													</button>)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</T1v1>
					</Container>
				</Fragment>
			)}
		</Fragment>
	);
}
