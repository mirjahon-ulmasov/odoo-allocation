import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { clearSmProds, fetchSmProds } from "store/sales_manager";
import { T1, Container } from "components/Tables";
import Loader from "components/Loader";

const headers = [
	"ID",
	"Product",
	"Ordered",
	"Fulfilled",
	"Fulfilled (%)",
	"Reserved",
	"Allocated",
];

export default function Report({ dealers, sm_prods, loading, dealer, onSetDealer }) {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	useEffect(() => {
		if (!dealers || dealers.length === 0) return;
		let dealerId = dealer ? dealer : dealers[0].id;
		dispatch(fetchSmProds({ dealer: dealerId }));
		return () => dispatch(clearSmProds())
	}, [dispatch, dealers, dealer]);

	return (
		<Fragment>
			{loading && <Loader />}
			<header className="header">
				<h1>Report</h1>
				<div className="actions">
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
					<button type="button" className="btn dark" onClick={() => navigate("edit")}>
						Start reservation
					</button>
				</div>
			</header>
			<Container className="scroll">
			{sm_prods && sm_prods.length !== 0 && (
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
								</tr>
							)})}
					</tbody>
				</T1>
			)}
			</Container>
		</Fragment>
	);
}