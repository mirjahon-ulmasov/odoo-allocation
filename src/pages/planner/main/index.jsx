import React, { Fragment, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Button, Typography, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SummaryByFact from "./SummaryFact.jsx";
import SummaryByProd from "./SummaryProd.jsx";

import styles from "./style.module.scss";

export default function MainPage() {
	const { t } = useTranslation();
	const id = useId();
	const id2 = useId();
	const navigate = useNavigate();
	const [active, setActive] = useState(id);
	const [date, setDate] = useState(new Date());
	const activeClass = (id) => (active === id ? styles.active : "");

	return (
		<Fragment>
			<header className="header">
				<Typography variant="h1">{t("headers.summary")}</Typography>
				<div className="actions">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker label="Date" value={date} onChange={(value) => {setDate(value)}}
									renderInput={(params) => <TextField {...params} />}
									/>
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
					{active === id && <SummaryByProd date={moment(date).format("YYYY-MM-DD")}/>}
					{active === id2 && <SummaryByFact date={moment(date).format("YYYY-MM-DD")}/>}
				</Fragment>
			</section>
		</Fragment>
	);
}
