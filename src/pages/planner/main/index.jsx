import React, { Fragment, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { changeDate } from "store/setting.js";
import SummaryByFact from "./SummaryFact.jsx";
import SummaryByProd from "./SummaryProd.jsx";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

import styles from "./style.module.scss";

export default function MainPage() {
	const { t } = useTranslation();
	const id = useId();
	const id2 = useId();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [active, setActive] = useState(id);
	const [date, setDate] = useState(new Date());

	const [byFactory, setByFactory] = useState('')
	const [dataFilter, setDataFilter] = useState(false);

	const activeClass = (id) => (active === id ? styles.active : "");
	const { vendors } = useSelector(state => state.product)

	return (
		<Fragment>
			<header className="header">
				<Typography variant="h1">{t("headers.summary")}</Typography>
				<div className="actions">
					<ReactHtmlTableToExcel
						id="summary_products-xls-button"
						className="excel-button"
						table="summary_products"
						filename="summary_products"
						sheet="tablexls"
						buttonText="Excel"
					/>
					<div className="form__radio-group">
						<input type="checkbox" className="form__radio-input" id="large" name="size"
							checked={dataFilter}
							onChange={(e) => setDataFilter(e.target.checked)}
						/>
						<label htmlFor="large" className="form__radio-label">
							<span className="form__radio-button"></span>
							Rows with data
						</label>
					</div>
					{vendors && (
						<Box sx={{ minWidth: 200 }}>
							<FormControl sx={{ borderRadius: "2px" }} size="small" fullWidth>
								<InputLabel>Select factory</InputLabel>
								<Select value={byFactory} label="Select factory" onChange={(e) => setByFactory(e.target.value)}>
									{vendors.map((vendor, index) => (
										<MenuItem key={index} value={vendor.id}>
											{vendor.vendor_name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					)}
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker label="Date" value={date} onChange={(value) => {
								dispatch(changeDate(value));
								setDate(value);
							}} renderInput={(params) => <TextField size="small" sx={{ width: '20ch' }} {...params} />} />
					</LocalizationProvider>
					<button
						type="button"
						className="btn dark"
						onClick={() => navigate("planning")}>
						{t("buttons.main")}
					</button>
				</div>
			</header>
			<section className={styles.container}>
				<div className={styles.tabs}>
					<div className={styles.actions}>
						<Button
							type="button"
							onClick={() => setActive(id)}
							className={activeClass(id)}>
							Summary by products
						</Button>
						<Button
							type="button"
							onClick={() => setActive(id2)}
							className={activeClass(id2)}>
							Summary by factories
						</Button>
					</div>
				</div>
				<Fragment>
					{active === id && <SummaryByProd />}
					{active === id2 && <SummaryByFact />}
				</Fragment>
			</section>
		</Fragment>
	);
}
