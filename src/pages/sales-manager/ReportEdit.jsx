import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { postReservation, editSmProds, fetchSmProds } from "store/sales_manager";
import { T1, Container } from "components/Tables";
import Loader from "components/Loader";

import check from "assets/icons/check.svg";
import back from "assets/icons/back.svg";
import { NotificationManager } from "react-notifications";


const headers = [
	"ID",
	"Product",
	"Ordered",
	"Fulfilled",
	"Fulfilled (%)",
	"Reserved",
	"Allocated",
	"Requested",
	"Request",
];

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	width: 500,
	transform: 'translate(-50%, -50%)',
	bgcolor: '#fff',
	boxShadow: 4,
	p: 4,
};

export default function ReportEdit({ dealers, sm_prods, loading, dealer, onSetDealer }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inputRef = useRef();
	const { t } = useTranslation();
	const [invoice, setInvoice] = useState("");
	const [address, setAddress] = useState("");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!dealers || dealers.length === 0) return;
		let dealerId = dealer ? dealer : dealers[0].id;
		dispatch(fetchSmProds({ dealer: dealerId }));
	}, [dispatch, dealers, dealer]);

	const submitHandler = () => {
		if(invoice === "" || address === "") {
			NotificationManager.error("Please fill out the form");
			return;
		}

		let dealerId = dealer ? dealer : dealers[0].id;
		const data = {
			details: invoice.concat(`,${address}`),
			customer: dealerId,
			items: sm_prods
				.filter((prod) => prod.request !== '' && parseInt(prod.request) > 0)
				.map((prod) => ({ material: prod.id, quantity: parseInt(prod.request) })),
		};

		dispatch(postReservation({ data, cb: () => navigate("/sm") }));
	};

	return (
		<Fragment>
			{loading && <Loader />}
			<nav className="nav-links">
				<img onClick={() => navigate(-1)} src={back} alt="back icon" />
				<p onClick={() => navigate("/sm")} className="click">{t("main.mainPage")} -</p>
				<p className="unclick">{t("main.edit")}</p>
			</nav>
			<header className="header">
				<h1>{t("headers.report")}</h1>
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
			{sm_prods && sm_prods.length !== 0 && (
				<Fragment>
					<Container className="scroll">
						<T1 style={{ marginTop: "1.5em" }}>
							<thead>
								<tr>
									{headers.map((header, index) => (
										<th key={index}>{header}</th>
									))}
								</tr>
							</thead>
							<tbody className="scroll">
								{sm_prods.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.material}</td>
											<td>{item.material_name}</td>
											<td>{item.ordered}</td>
											<td>{item.fulfilled}</td>
											<td>{item.fulfilled_percentage}%</td>
											<td>{item.reserved}</td>
											<td>{item.allocated}</td>
											<td>{item.requested}</td>
											<td>
												<input ref={inputRef} onFocus={(e) => e.currentTarget.select()} 
													type="text" value={item.request} onChange={(event) => {
															if(isNaN(event.target.value) || event.target.value.includes('-')) return;
															dispatch(editSmProds({ prodId: item.id, quantity: event.target.value }));
														}}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</T1>
					</Container>
					<div style={{ marginTop: "2rem" }} className="actions">
						<button type="button" className="btn success" onClick={() => setOpen(true)}>
							<img src={check} alt="check" />
							{t("buttons.confirm")}
						</button>
					</div>
					<Modal open={open} onClose={() => setOpen(false)}>
							<Box className="modal" sx={style}>
								<h2>Please enter Invoice number and Delivery address</h2>
								<div className="inputs">
									<input required value={invoice} onChange={(e) => setInvoice(e.target.value)} 
										className={invoice === '' ? 'error' : ""} type="text" placeholder="Invoice number"/>
									<input value={address} onChange={(e) => setAddress(e.target.value)} 
										className={address === '' ? 'error' : ""} type="text" placeholder="Delivery address"/>
								</div>
								<div className="modal-action">
									<button onClick={() => setOpen(false)}>Cancel</button>
									<button onClick={submitHandler}>Submit</button>
								</div>
							</Box>
					</Modal>
				</Fragment>
			)}
		</Fragment>
	);
}