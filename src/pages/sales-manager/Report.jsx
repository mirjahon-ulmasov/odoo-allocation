import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchSmProds } from "middlewares/sales_manager";
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
	"Requested",
];

export default function Report({ dealers, sm_prods, loading, dealer, onSetDealer }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [dataFilter, setDataFilter] = useState(true);

	useEffect(() => {
		if (!dealers || dealers.length === 0) return;
		let dealerId = dealer ? dealer : dealers[0].id;
		dispatch(fetchSmProds({ dealer: dealerId, exclude: dataFilter }));
	}, [dispatch, dealers, dealer, dataFilter]);

	return (
		<Fragment>
			{loading && <Loader />}
			<header className="header">
				<h1>{t("headers.report")}</h1>
				<div className="actions">
					<div className="form__radio-group">
						<input type="checkbox" className="form__radio-input" id="large" name="size"
							checked={dataFilter}
							onChange={(e) => setDataFilter(e.target.checked)}
						/>
						<label htmlFor="large" className="form__radio-label">
							<span className="form__radio-button"></span>
							Products with allocation
						</label>
					</div>
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
						{t("buttons.request")}
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
									<td>{item.requested}</td>
								</tr>
							)})}
					</tbody>
				</T1>
			)}
			</Container>
		</Fragment>
	);
}